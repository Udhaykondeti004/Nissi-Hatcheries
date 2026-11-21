/**
 * Nissi Hatcheries – creates the seed-price Google Form + Sheet in one run (optional shortcut for
 * docs/PRICE-FORM-SETUP.md steps 1–3). Needs only Forms + Sheets permission. No Drive, email,
 * GitHub or outside connections.
 *
 * How to use:
 *   1. Open https://script.new (signed in to the Nissi Google account only, e.g. in a private window).
 *   2. Paste this whole file, change ADMIN_CODE below, then Save.
 *   3. Select "createPriceForm" in the toolbar and press Run. Allow access when Google asks.
 *   4. Open the Execution log. It shows the form link (for the admin) and the sheet link.
 *   5. In the sheet: File → Share → Publish to web → choose the "Website" tab → CSV → Publish,
 *      and send that CSV link to the developer.
 */

var ADMIN_CODE = '1234'; // ← change this to your own 4–6 digit code before running

function createPriceForm() {
  if (!/^\d{4,6}$/.test(ADMIN_CODE) || ADMIN_CODE === '1234') {
    throw new Error('Set ADMIN_CODE at the top of the script to your own 4–6 digit code, then run again.');
  }

  // 1. Form
  var form = FormApp.create('Nissi – Seed Prices');
  form.setDescription('Update the seed prices shown on the Nissi Hatcheries website. The website updates within about 5 minutes.');
  form.setCollectEmail(false).setAllowResponseEdits(false).setLimitOneResponsePerUser(false).setProgressBar(false);
  form.setConfirmationMessage('Thank you. The website will show the new prices within about 5 minutes.');
  var help = 'Example: 5 paisa per seed. Leave blank to keep the current price. Type - to hide the price.';
  form.addTextItem().setTitle('Vannamei price').setHelpText(help);
  form.addTextItem().setTitle('Tiger price').setHelpText(help);
  form.addTextItem().setTitle('Admin code').setRequired(true);

  // 2. Sheet linked to the form
  var ss = SpreadsheetApp.create('Nissi – Seed Prices (responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  SpreadsheetApp.flush();
  ss = SpreadsheetApp.openById(ss.getId());
  var responses = null;
  ss.getSheets().forEach(function (sh) {
    if (sh.getFormUrl()) responses = sh;
  });
  if (!responses) throw new Error('Could not find the form responses tab. Open the sheet, rename "Form responses 1" to "Responses", and add the Website tab by hand.');
  responses.setName('Responses');
  ss.getSheets().forEach(function (sh) {
    if (sh.getName() === 'Sheet1' && sh.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(sh);
  });

  // 3. "Website" tab: the latest answers that used the correct admin code
  var web = ss.insertSheet('Website');
  var code = 'TO_TEXT(Responses!D2:D)="' + ADMIN_CODE + '"';
  web.getRange('A1:B4').setValues([
    ['field', 'value'],
    ['vannamei', '=IFERROR(CHOOSEROWS(FILTER(Responses!B2:B, Responses!B2:B<>"", ' + code + '), -1), "")'],
    ['tiger', '=IFERROR(CHOOSEROWS(FILTER(Responses!C2:C, Responses!C2:C<>"", ' + code + '), -1), "")'],
    ['updated', '=IFERROR(TEXT(CHOOSEROWS(FILTER(Responses!A2:A, (Responses!B2:B<>"")+(Responses!C2:C<>""), ' + code + '), -1), "d mmm yyyy, h:mm AM/PM"), "")'],
  ]);
  web.setColumnWidth(1, 120).setColumnWidth(2, 320);

  var msg =
    'Done.\n\n' +
    'ADMIN FORM LINK (give this to the admin):\n' + form.getPublishedUrl() + '\n\n' +
    'SHEET:\n' + ss.getUrl() + '\n\n' +
    'Last step: in the sheet, File → Share → Publish to web → "Website" tab → Comma-separated values (.csv) → Publish. Send that CSV link to the developer.';
  Logger.log(msg);
  return msg;
}
