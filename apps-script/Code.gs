/**
 * Nissi Hatcheries – price & photo publishing (Google Form → GitHub → Cloudflare Pages)
 *
 * What it does:
 *   1. setup() creates the Google Form "Nissi – Update Prices & Photos", links it to this
 *      spreadsheet, creates a "Publish log" sheet and installs the on-submit trigger.
 *   2. Every form submission is checked. Valid ones are published automatically:
 *      src/data/published.json (+ any photos in public/uploads/) is committed to GitHub in ONE
 *      commit, and Cloudflare Pages rebuilds the website (about 1–2 minutes).
 *      Invalid ones are rejected, nothing on the website changes, and the admin gets an email.
 *   3. Blank fields keep the current value, so the website always shows the last valid prices.
 *
 * Script properties (Project Settings → Script properties):
 *   GITHUB_TOKEN    required  Fine-grained GitHub token for this repo only, "Contents: Read and write".
 *   ALLOWED_EMAILS  required  Comma-separated Google account emails allowed to update the website.
 *   GITHUB_REPO     optional  Default "Udhaykondeti004/Nissi-Hatcheries".
 *   GITHUB_BRANCH   optional  Default "main".
 *   NOTIFY_EMAILS   optional  Extra comma-separated emails that receive every publish/reject notice.
 *   SITE_URL        optional  Default "https://nissi-hatcheries.kondetiudhay.workers.dev".
 *
 * Free-tier usage: one submission ≈ 6–10 URL fetches and 1–2 emails
 * (consumer limits: 20,000 fetches/day, 100 emails/day).
 */

// ---- Settings ---------------------------------------------------------------------------------

var FORM_TITLE = 'Nissi – Update Prices & Photos';
var LOG_SHEET = 'Publish log';
var PUBLISHED_PATH = 'src/data/published.json';
var UPLOAD_DIR = 'public/uploads';
var MAX_GALLERY = 12;

/** Question titles. The script finds answers by these titles, so keep them unchanged in the form. */
var Q = {
  vPrice: 'Vannamei seed price (₹)',
  vUnit: 'Vannamei price unit',
  tPrice: 'Tiger seed price (₹)',
  tUnit: 'Tiger price unit',
  hide: 'Hide a price on the website',
  validFrom: 'Prices valid from',
  remarks: 'Remarks shown under the price table',
  photos: 'Photos',
  slot: 'Where should the photos appear?',
  caption: 'Photo description',
};

var UNITS = ['Per seed', 'Per 1,000 seeds'];
var SLOTS = {
  'Photo gallery (About page)': 'gallery',
  'Main banner (Home page)': 'home',
  'Vannamei section': 'vannamei',
  'Tiger section': 'tiger',
};

/** Accepted price ranges in ₹ – a safety net against typos, since valid entries publish immediately. */
var RANGES = {
  'Per seed': { min: 0.05, max: 5 },
  'Per 1,000 seeds': { min: 50, max: 5000 },
  other: { min: 0.01, max: 1000000 },
};

// ---- One-time setup ---------------------------------------------------------------------------

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Open this script from the Google Sheet (Extensions → Apps Script) and run setup again.');
  var props = PropertiesService.getScriptProperties();

  var form;
  var existingId = props.getProperty('FORM_ID');
  if (existingId) {
    form = FormApp.openById(existingId);
  } else {
    form = FormApp.create(FORM_TITLE);
    form.setDescription(
      'Use this form to update seed prices (and, if needed, photos) on the Nissi Hatcheries website.\n' +
        'Leave a price blank to keep the current one. The website updates about 2 minutes after you submit, ' +
        'and you will get an email saying whether it was published.'
    );
    try {
      form.setEmailCollectionType(FormApp.EmailCollectionType.VERIFIED);
    } catch (err) {
      form.setCollectEmail(true);
    }
    form.setAllowResponseEdits(false).setLimitOneResponsePerUser(false).setProgressBar(false);
    form.setConfirmationMessage('Thank you. The website will update in about 2 minutes. Check your email for confirmation.');

    var priceValidation = FormApp.createTextValidation()
      .setHelpText('Enter a number only, for example 0.32 or 320')
      .requireNumberGreaterThan(0)
      .build();

    form.addSectionHeaderItem().setTitle('Vannamei shrimp seed');
    form.addTextItem().setTitle(Q.vPrice).setHelpText('Number only. Leave blank to keep the current price.').setValidation(priceValidation);
    form.addMultipleChoiceItem().setTitle(Q.vUnit).setChoiceValues(UNITS).showOtherOption(true);

    form.addSectionHeaderItem().setTitle('Tiger shrimp seed');
    form.addTextItem().setTitle(Q.tPrice).setHelpText('Number only. Leave blank to keep the current price.').setValidation(priceValidation);
    form.addMultipleChoiceItem().setTitle(Q.tUnit).setChoiceValues(UNITS).showOtherOption(true);

    form.addSectionHeaderItem().setTitle('Optional');
    form.addCheckboxItem().setTitle(Q.hide).setHelpText('Tick to show "Contact us for the latest rates" instead of a price.').setChoiceValues(['Vannamei', 'Tiger']);
    form.addDateItem().setTitle(Q.validFrom);
    form.addParagraphTextItem().setTitle(Q.remarks).setHelpText('Shown publicly on the website. Leave blank to keep the current remark; type "-" to remove it.');

    form.addSectionHeaderItem()
      .setTitle('Photos (only when needed)')
      .setHelpText('Add photos only when you want to change pictures on the website.');
    form.addMultipleChoiceItem().setTitle(Q.slot).setChoiceValues(Object.keys(SLOTS));
    form.addTextItem().setTitle(Q.caption).setHelpText('One short line describing the photo, e.g. "Post-larvae ready for packing".');

    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    props.setProperty('FORM_ID', form.getId());
  }

  // Publish log sheet
  var log = ss.getSheetByName(LOG_SHEET) || ss.insertSheet(LOG_SHEET);
  if (log.getLastRow() === 0) {
    log.appendRow(['Submitted at', 'Submitted by', 'Status', 'Details', 'GitHub commit']);
    log.setFrozenRows(1);
    log.getRange('A1:E1').setFontWeight('bold');
  }

  // Trigger (idempotent)
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'onFormSubmit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onFormSubmit').forForm(form).onFormSubmit().create();

  var hasPhotoQuestion = form.getItems(FormApp.ItemType.FILE_UPLOAD).length > 0;
  var msg =
    'Setup complete.\n\nAdmin form link (share this with the admin):\n' + form.getPublishedUrl() +
    '\n\nEdit form:\n' + form.getEditUrl() +
    (hasPhotoQuestion
      ? ''
      : '\n\nOne manual step left: open the edit link, add a "File upload" question titled exactly "' + Q.photos +
        '" (Allow only: Image, Max files: 5, Max size: 10 MB) and move it above "' + Q.slot + '".');
  Logger.log(msg);
  return msg;
}

/** Checks that the token, repo and allowed emails are configured. Run it any time from the editor. */
function testConnection() {
  var cfg = config_();
  var repo = gh_('get', '/repos/' + cfg.repo);
  var file = getPublished_(cfg);
  var msg = 'OK – connected to ' + repo.full_name + ' (branch ' + cfg.branch + '). Current published.json last published: ' + (file.json.publishedAt || 'never') +
    '\nAllowed emails: ' + cfg.allowed.join(', ');
  Logger.log(msg);
  return msg;
}

// ---- Submission handler -----------------------------------------------------------------------

function onFormSubmit(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(120000);
  var email = '';
  try {
    var cfg = config_();
    var response = e.response;
    email = (response.getRespondentEmail() || '').toLowerCase();
    var a = answers_(response);

    if (cfg.allowed.indexOf(email) === -1) {
      return reject_(cfg, email, 'This Google account (' + (email || 'unknown') + ') is not allowed to update the website. Ask the site owner to add it to ALLOWED_EMAILS.');
    }

    var current = getPublished_(cfg);
    var next = JSON.parse(JSON.stringify(current.json));
    var changes = [];
    var problems = [];
    var hide = a[Q.hide] || [];

    [['vannamei', 'Vannamei', Q.vPrice, Q.vUnit], ['tiger', 'Tiger', Q.tPrice, Q.tUnit]].forEach(function (s) {
      var id = s[0], label = s[1];
      if (hide.indexOf(label) !== -1) {
        next.prices[id].rate = null;
        changes.push(label + ': price hidden ("Contact us for the latest rates")');
        return;
      }
      var raw = (a[s[2]] || '').toString().trim();
      var unit = (a[s[3]] || '').toString().trim();
      if (!raw) {
        if (unit) problems.push(label + ': a unit was chosen but no price was entered.');
        return;
      }
      var rate = Number(raw.replace(/[₹,\s]/g, ''));
      if (!isFinite(rate) || rate <= 0) return problems.push(label + ': "' + raw + '" is not a valid price.');
      if (!unit) unit = next.prices[id].unit || 'Per 1,000 seeds';
      var range = rangeFor_(unit);
      if (rate < range.min || rate > range.max) {
        return problems.push(label + ': ₹' + raw + ' ' + unit.toLowerCase() + ' looks wrong (expected ₹' + range.min + '–₹' + range.max + '). Check the price and unit.');
      }
      next.prices[id] = { rate: Math.round(rate * 100) / 100, unit: unit.charAt(0).toLowerCase() + unit.slice(1) };
      changes.push(label + ': ₹' + next.prices[id].rate + ' ' + next.prices[id].unit);
    });

    if (a[Q.validFrom]) { next.validFrom = a[Q.validFrom]; changes.push('Valid from ' + a[Q.validFrom]); }
    var remarks = (a[Q.remarks] || '').toString().trim();
    if (remarks === '-') { next.remarks = ''; changes.push('Remark removed'); }
    else if (remarks) { next.remarks = remarks.slice(0, 300); changes.push('Remark updated'); }

    // Photos
    var fileIds = a[Q.photos] || [];
    var treeEntries = [];
    if (fileIds.length) {
      var slotLabel = a[Q.slot];
      var slot = SLOTS[slotLabel];
      if (!slot) {
        problems.push('Photos were uploaded but "' + Q.slot + '" was not answered.');
      } else {
        var stamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd-HHmmss');
        var caption = (a[Q.caption] || '').toString().trim().slice(0, 140) || defaultAlt_(slot);
        var added = [];
        fileIds.forEach(function (id, i) {
          var img = imageBlob_(id);
          if (!img) return problems.push('Photo ' + (i + 1) + ' is not a JPG, PNG or WebP image.');
          var name = stamp + '-' + slot + '-' + (i + 1);
          treeEntries.push({ path: UPLOAD_DIR + '/' + name + '.' + img.ext, blobBase64: Utilities.base64Encode(img.blob.getBytes()) });
          added.push({ key: 'uploads/' + name, slot: slot, alt: caption, file: UPLOAD_DIR + '/' + name + '.' + img.ext });
        });
        if (added.length) {
          var removed = [];
          var keep = (next.images || []).filter(function (im) {
            var replace = slot !== 'gallery' && im.slot === slot;
            if (replace) removed.push(im);
            return !replace;
          });
          next.images = keep.concat(added);
          var gallery = next.images.filter(function (im) { return im.slot === 'gallery'; });
          if (gallery.length > MAX_GALLERY) {
            var drop = gallery.slice(0, gallery.length - MAX_GALLERY);
            removed = removed.concat(drop);
            next.images = next.images.filter(function (im) { return drop.indexOf(im) === -1; });
          }
          var addedPaths = added.map(function (im) { return im.file; });
          removed.forEach(function (im) {
            if (im.file && addedPaths.indexOf(im.file) === -1) treeEntries.push({ path: im.file, remove: true });
          });
          changes.push(added.length + ' photo(s) added to ' + slotLabel);
        }
      }
    }

    if (problems.length) return reject_(cfg, email, problems.join('\n'));
    if (!changes.length) return reject_(cfg, email, 'Nothing to publish: no price, remark or photo was entered.');

    next.publishedAt = new Date().toISOString();
    var commitUrl = commit_(cfg, current, next, treeEntries, 'Website update from Google Form: ' + changes.join('; '));
    log_(email, 'Published', changes.join('\n'), commitUrl);
    notify_(cfg, email, 'Nissi website updated',
      'Your update was published. The website will show it in about 2 minutes:\n' + cfg.siteUrl + '/pricing\n\n' + changes.join('\n'));
  } catch (err) {
    log_(email, 'Error', String(err && err.stack || err), '');
    try { notify_(config_(), email, 'Nissi website update FAILED', 'The update could not be published. Nothing on the website changed.\n\nError: ' + err); } catch (ignored) {}
    throw err;
  } finally {
    lock.releaseLock();
  }
}

// ---- Helpers ----------------------------------------------------------------------------------

function config_() {
  var p = PropertiesService.getScriptProperties();
  var token = p.getProperty('GITHUB_TOKEN');
  if (!token) throw new Error('GITHUB_TOKEN script property is missing.');
  var allowed = (p.getProperty('ALLOWED_EMAILS') || '').split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(String);
  if (!allowed.length) throw new Error('ALLOWED_EMAILS script property is missing.');
  return {
    token: token,
    allowed: allowed,
    repo: p.getProperty('GITHUB_REPO') || 'Udhaykondeti004/Nissi-Hatcheries',
    branch: p.getProperty('GITHUB_BRANCH') || 'main',
    notify: (p.getProperty('NOTIFY_EMAILS') || '').split(',').map(function (s) { return s.trim(); }).filter(String),
    siteUrl: (p.getProperty('SITE_URL') || 'https://nissi-hatcheries.kondetiudhay.workers.dev').replace(/\/$/, ''),
  };
}

function answers_(response) {
  var out = {};
  response.getItemResponses().forEach(function (ir) {
    var title = ir.getItem().getTitle();
    var v = ir.getResponse();
    if (ir.getItem().getType() === FormApp.ItemType.DATE && v) v = String(v).slice(0, 10);
    out[title] = v;
  });
  return out;
}

function imageBlob_(fileId) {
  var file = DriveApp.getFileById(fileId);
  var blob = file.getBlob();
  var type = blob.getContentType();
  var ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[type];
  if (ext) return { blob: blob, ext: ext };
  try {
    return { blob: blob.getAs('image/jpeg'), ext: 'jpg' };
  } catch (err) {
    return null;
  }
}

function rangeFor_(unit) {
  var u = String(unit).toLowerCase();
  for (var k in RANGES) if (k.toLowerCase() === u) return RANGES[k];
  return RANGES.other;
}

function defaultAlt_(slot) {
  return { gallery: 'Photo from Nissi Hatcheries', home: 'Nissi Hatcheries', vannamei: 'Vannamei shrimp seed at Nissi Hatcheries', tiger: 'Tiger shrimp seed at Nissi Hatcheries' }[slot];
}

function gh_(method, path, body, token) {
  var res = UrlFetchApp.fetch('https://api.github.com' + path, {
    method: method,
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + (token || config_().token),
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    payload: body ? JSON.stringify(body) : undefined,
    muteHttpExceptions: true,
  });
  var code = res.getResponseCode();
  if (code === 401) throw new Error('GitHub rejected the token (expired or revoked). Create a new token and update GITHUB_TOKEN.');
  if (code >= 300) throw new Error('GitHub ' + method.toUpperCase() + ' ' + path + ' failed (' + code + '): ' + res.getContentText().slice(0, 300));
  return JSON.parse(res.getContentText() || '{}');
}

function getPublished_(cfg) {
  var f = gh_('get', '/repos/' + cfg.repo + '/contents/' + PUBLISHED_PATH + '?ref=' + encodeURIComponent(cfg.branch), null, cfg.token);
  var text = Utilities.newBlob(Utilities.base64Decode(f.content.replace(/\n/g, ''))).getDataAsString('UTF-8');
  return { json: JSON.parse(text), sha: f.sha };
}

/** One atomic commit: published.json + new photos, minus replaced photos. */
function commit_(cfg, current, next, entries, message) {
  var r = '/repos/' + cfg.repo;
  var ref = gh_('get', r + '/git/ref/heads/' + cfg.branch, null, cfg.token);
  var head = gh_('get', r + '/git/commits/' + ref.object.sha, null, cfg.token);
  var tree = [];
  entries.forEach(function (en) {
    if (en.remove) return tree.push({ path: en.path, mode: '100644', type: 'blob', sha: null });
    var blob = gh_('post', r + '/git/blobs', { content: en.blobBase64, encoding: 'base64' }, cfg.token);
    tree.push({ path: en.path, mode: '100644', type: 'blob', sha: blob.sha });
  });
  tree.push({ path: PUBLISHED_PATH, mode: '100644', type: 'blob', content: JSON.stringify(next, null, 2) + '\n' });
  var newTree = gh_('post', r + '/git/trees', { base_tree: head.tree.sha, tree: tree }, cfg.token);
  var commit = gh_('post', r + '/git/commits', { message: message.slice(0, 900), tree: newTree.sha, parents: [ref.object.sha] }, cfg.token);
  gh_('patch', r + '/git/refs/heads/' + cfg.branch, { sha: commit.sha }, cfg.token);
  return commit.html_url;
}

function reject_(cfg, email, reason) {
  log_(email, 'Rejected', reason, '');
  notify_(cfg, email, 'Nissi website update NOT published',
    'Your form submission was not published, so the website still shows the previous prices and photos.\n\nWhat to fix:\n' + reason +
    '\n\nPlease submit the form again with the corrected details.');
}

function log_(email, status, details, commitUrl) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss && ss.getSheetByName(LOG_SHEET);
  if (sheet) sheet.appendRow([new Date(), email, status, details, commitUrl]);
}

function notify_(cfg, email, subject, body) {
  var to = [email].concat(cfg.notify).filter(String).filter(function (v, i, arr) { return arr.indexOf(v) === i; });
  if (to.length) MailApp.sendEmail(to.join(','), subject, body);
}
