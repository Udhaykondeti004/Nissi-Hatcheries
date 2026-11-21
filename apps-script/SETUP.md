# Google Form → website: one-time setup (about 15 minutes, ₹0)

After this setup, the admin updates seed prices and photos with **one Google Form link**.
Valid submissions appear on the website about 2 minutes later. Invalid ones are rejected,
the website keeps the last published prices, and the admin gets an email explaining what to fix.

Do this once, signed in to **Nissi Hatcheries' Google account** (ideally a business Gmail).
Everything below is free on a normal Google account.

## 1. Create the Google Sheet and paste the script

1. Go to <https://sheets.new>. Name the sheet **Nissi Website – Prices**.
2. Menu **Extensions → Apps Script**.
3. Delete the sample code, paste the whole of [`Code.gs`](./Code.gs), and press **Save**.

## 2. Create the GitHub token (lets the script update the website)

Signed in to GitHub as **Udhaykondeti004**:

1. Open <https://github.com/settings/personal-access-tokens/new>.
2. **Token name:** `nissi-google-form`. **Expiration:** the longest option offered. Add a calendar reminder to renew it before it expires.
3. **Repository access:** *Only select repositories* → `Udhaykondeti004/Nissi-Hatcheries`.
4. **Permissions → Repository permissions → Contents:** *Read and write*. Leave everything else at *No access*.
5. **Generate token**, then copy it. GitHub shows it only once.

## 3. Add the script settings

In Apps Script: **Project Settings** (gear icon) → **Script properties** → **Add script property**:

| Property | Value |
|---|---|
| `GITHUB_TOKEN` | the token from step 2 |
| `ALLOWED_EMAILS` | Google account email(s) allowed to update the site, comma-separated |
| `NOTIFY_EMAILS` | *(optional)* extra email(s) that get every publish/reject notice |

The token lives only in these script settings. Never put it in the form, the sheet, the website code or a chat.

## 4. Run setup

1. In the editor, pick the function **`setup`** in the toolbar and press **Run**.
2. Google asks for permission (Forms, Sheets, Drive, email, external requests). Choose the Nissi account, then **Advanced → Go to project (unsafe) → Allow**. The "unsafe" warning appears for every private script that hasn't been through Google review.
3. Open **Execution log**. It shows the **admin form link** and the **edit link**.
4. Run **`testConnection`**. It should say `OK – connected to Udhaykondeti004/Nissi-Hatcheries`.

## 5. Add the photo question (manual, because Google doesn't allow scripts to create it)

1. Open the **edit link** from the log.
2. Click **+ (Add question)**, change the type to **File upload**, then **Continue**.
3. **Title:** `Photos`, spelled exactly like this. Turn on **Allow only specific file types → Image**. **Maximum number of files:** 5. **Maximum file size:** 10 MB.
4. Drag it just above **"Where should the photos appear?"**.
5. Run **`setup`** once more. The log should no longer mention the manual step.

## 6. Hand over

- Send the **admin form link** to the admin. Bookmark it on their phone.
- The admin signs in with an allowed Google account. A file upload question needs a signed-in respondent, which also stops strangers from changing prices.
- Every submission is recorded in the **Publish log** sheet as Published, Rejected or Error, with the GitHub commit link.

## Price checks (safety net)

| Unit | Accepted range |
|---|---|
| Per seed | ₹0.05 – ₹5 |
| Per 1,000 seeds | ₹50 – ₹5,000 |
| Other (typed) | any amount above ₹0 |

Change `RANGES` at the top of `Code.gs` if real prices fall outside these.

## If something goes wrong

- **Email says "GitHub rejected the token":** the token expired. Repeat step 2, then replace `GITHUB_TOKEN`.
- **Wrong price published:** submit the form again with the correct price. The newest valid submission always wins.
- **Hide a price:** tick it under "Hide a price on the website".
- **Remove the remark:** type `-` in the remarks box.
