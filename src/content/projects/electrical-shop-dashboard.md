---
title: Electrical Shop Invoices & Sales Dashboard
summary: An electrical supplies shop snaps photos of handwritten Arabic invoices. AI reads them, code checks every line against the shop's own catalog, the owner approves with one tap, and a live mobile dashboard plus a daily WhatsApp report show sales, profit and stock.
industry: Retail
order: 6
accent: '#f97316'
stack: [Google Apps Script, Google Sheets, OpenAI, Google Gemini, Cloudflare Pages, n8n, Evolution API, HTML/CSS/JS]
metrics:
  - { value: '100', label: 'catalog items matched' }
  - { value: '2', label: 'AI providers to choose from' }
  - { value: '~0.3s', label: 'to close the screen after approving (tested)' }
  - { value: '102', label: 'automated backend checks' }
flow:
  - { label: 'Invoice photo', kind: trigger }
  - { label: 'AI reads the invoice', kind: ai }
  - { label: 'Check vs shop catalog', kind: logic }
  - { label: 'Owner approves', kind: action }
  - { label: 'Google Sheet + dashboard', kind: data }
---

## The problem

The shop writes every sale on a handwritten Arabic invoice. To know daily sales, profit and what's running out of stock, someone had to re-type all of them into a spreadsheet: slow, and easy to get a price or a quantity wrong.

## The solution

A small system the owner runs from his phone. **No server to maintain:** Google Sheets is the database, Google Apps Script is the backend, and the dashboard is a static site on Cloudflare Pages.

### Snap & read
Take a photo or pick several from the gallery. Each one becomes its own job with a live timer, so a slow reading never blocks the others. The owner can choose the model and how hard it thinks: OpenAI for speed and cost, or Gemini for hard Arabic handwriting.

### The model only reads, code decides
The prompt asks the model to copy every line exactly as written, with no corrections and no math. Then code:
- converts Arabic-Indic digits, decimal commas and fractions (`١،٥` → 1.5);
- matches item names to the shop's catalog with **Arabic-aware fuzzy matching** (misread dots, missing letters, shop slang);
- compares each price with the catalog price and catches a missing or extra zero;
- re-checks quantity × price against the written total.

Nothing is changed automatically. Every doubt is shown as a note with clickable suggestions.

### One-tap review
The owner sees the invoice photo above the lines. **"Approve all OK lines"** takes care of the clean ones, so he only looks at the flagged lines. Approving closes the screen right away and saves in the background, and nothing counts toward the totals until the server confirms it.

### Dashboard & reports
- Sales, profit (calculated from buy/sell margins), top customers and low-stock alerts, in Arabic and right-to-left, built mobile-first.
- An items page to edit prices and stock without opening the sheet.
- A report button with period and filters, plus a daily WhatsApp summary to the owner (n8n + Evolution API).

## Technical details

- **Fast without a database:** a tiny version counter tells the dashboard whether anything changed, and unchanged data is served from cache with no sheet read. Approving an invoice reads the sheet once and writes the whole invoice in one batch.
- **Safe by default:** deleted invoices can be restored, there's an Undo after deleting, retries never record the same invoice twice, and cells that start like a formula are stored as text.
- **Sheet stays the source of truth:** invoices added by hand in the sheet wait for the owner's approval before they count.
- API keys live only in the Apps Script settings and never reach the public site. Each dashboard link is protected by its own key.
- Covered by automated tests for reading, cancelling, approving, retries, sync, images and item edits.

## The result

Invoices go from a photo to checked, structured sales data **without re-typing**. The owner's time goes only to the few lines the system isn't sure about, and the numbers he needs are on his phone at the end of the day.
