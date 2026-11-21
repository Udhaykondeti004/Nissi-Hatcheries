# Seed prices from a Google Form: one-time setup (about 10 minutes, ₹0)

When this is done, the admin opens one Google Form link, types the Vannamei and Tiger prices as
plain text (for example `5 paisa per seed` or `₹320 per 1,000 seeds`), enters the admin code and
submits. The website shows the new prices within about 5 minutes.

- No script, no permissions screen, no GitHub token.
- If the admin code is wrong, that submission is ignored, so strangers who find the link can't change prices.
- If Google can't be reached, visitors see the last prices they loaded, or "Contact us for the latest rates".

Use a normal Google account, ideally the Nissi Gmail.

---

## Step 1 – Make the form (3 minutes)

1. Open <https://forms.new>. Title it **Nissi – Seed Prices**.
2. Question 1: type **Short answer**, title **Vannamei price**.
   Description: `Example: 5 paisa per seed. Leave blank to keep the current price. Type - to hide the price.`
3. Question 2: type **Short answer**, title **Tiger price**, with the same description.
4. Question 3: type **Short answer**, title **Admin code**, **Required** on.
5. Keep this order: Vannamei, Tiger, Admin code. The formulas below depend on it.
6. **Settings → Responses:** set *Collect email addresses* to **Do not collect**.

## Step 2 – Link it to a Google Sheet (1 minute)

1. In the form, open the **Responses** tab → **Link to Sheets** → **Create a new spreadsheet** → **Create**.
2. In the new sheet, right-click the tab **Form responses 1** → **Rename**, and change it to **Responses**.

## Step 3 – Add the "Website" tab (3 minutes)

1. Click **+** at the bottom left to add a tab, and rename it **Website**.
2. Choose a 4–6 digit admin code. Below, replace `1234` with your code in **all three formulas**.
3. Type or paste these cells exactly:

| Cell | Paste this |
|---|---|
| A1 | `field` |
| B1 | `value` |
| A2 | `vannamei` |
| B2 | `=IFERROR(CHOOSEROWS(FILTER(Responses!B2:B, Responses!B2:B<>"", TO_TEXT(Responses!D2:D)="1234"), -1), "")` |
| A3 | `tiger` |
| B3 | `=IFERROR(CHOOSEROWS(FILTER(Responses!C2:C, Responses!C2:C<>"", TO_TEXT(Responses!D2:D)="1234"), -1), "")` |
| A4 | `updated` |
| B4 | `=IFERROR(TEXT(CHOOSEROWS(FILTER(Responses!A2:A, (Responses!B2:B<>"")+(Responses!C2:C<>""), TO_TEXT(Responses!D2:D)="1234"), -1), "d mmm yyyy, h:mm AM/PM"), "")` |

Each formula picks the **latest** non-blank answer that used the correct code. A blank answer keeps the previous price.

## Step 4 – Publish only the "Website" tab (2 minutes)

1. Menu **File → Share → Publish to web**.
2. **Link** tab: in the first drop-down choose **Website** (not "Entire document"). In the second, choose **Comma-separated values (.csv)**.
3. Open **Published content and settings** and make sure *Automatically republish when changes are made* is ticked.
4. Click **Publish → OK**, then copy the link. It looks like `https://docs.google.com/spreadsheets/d/e/2PACX-…/pub?gid=…&single=true&output=csv`.
5. Send that link to the developer. It goes into `src/content/prices.ts` (`csvUrl`).

Only the Website tab becomes public: four rows with the field names and prices. The Responses tab, your admin code and the answer history stay private. Don't share the spreadsheet itself with "Anyone with the link".

## Step 5 – Test

1. Open the form, enter `TEST 1 paisa per seed` for Vannamei and your code, and submit.
2. Within about 5 minutes, refresh the website's **Seed Prices** page. The test text should appear.
3. Submit again with the real prices.

## For the admin (keep this)

- **Change a price:** open the form → type the new price text → admin code → Submit.
- **Change only one price:** leave the other one blank.
- **Hide a price** (show "Contact us for the latest rates"): type `-`.
- **Fix a mistake:** just submit again. The newest submission wins.
- **Wrong code:** nothing changes on the website.
