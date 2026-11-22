---
title: AI Handwritten Invoice Reader
summary: Sales reps upload photos of handwritten Arabic invoices in batches — Gemini reads them in the background, code checks every line against the price list, and a person only reviews the lines that look wrong.
industry: Wholesale & Distribution
order: 5
accent: '#fbbf24'
stack: [n8n, Google Gemini, JavaScript, n8n Data Tables, Webhooks, HTML/CSS/JS]
metrics:
  - { value: '250+', label: 'price-list items matched' }
  - { value: '2,500+', label: 'customers matched by name' }
  - { value: '5', label: 'webhook endpoints' }
  - { value: '24', label: 'workflow nodes' }
flow:
  - { label: 'Batch photo upload', kind: trigger }
  - { label: 'Gemini reads invoice', kind: ai }
  - { label: 'Validate vs price list', kind: logic }
  - { label: 'Job result table', kind: data }
  - { label: 'Review & confirm', kind: action }
workflow: /workflows/ai-invoice-reader.json
repo: https://github.com/sheetswork26-hue/n8n-projects/tree/main/Project5%20-%20AI%20Handwritten%20Invoice%20Reader
---

## The problem

A wholesale distributor's sales reps write every invoice by hand, in Arabic, on printed pads. Someone in the office then re-types each one — item names, prices, quantities, totals, discounts — into the system. It is slow, and mistakes in a price or a missing zero go unnoticed.

## The solution

An n8n workflow that serves its own **mobile-friendly Arabic page**:

### Batch upload, background reading
The reviewer picks a batch of invoice photos. Each one is sent to n8n, which **acknowledges instantly** and reads it in the background; the page polls for results, so a slow model never blocks the screen.

### The model only reads
**Google Gemini** transcribes the invoice exactly as written — rows, margin notes, customer, sales rep and date. The prompt forbids correcting or calculating anything, so all judgment happens in code.

### Code checks everything
- Converts Arabic-Indic digits and handwritten fractions (`٢٥¼` → 25.25).
- Matches written item names to the price list with **Arabic-aware fuzzy matching**.
- Checks each price against the list price within an allowed discount range, recomputes line totals, subtotal and invoice discount.
- Flags old dates, unknown customers and anything doubtful. **Nothing is changed automatically.**

### Review only what's wrong
The reviewer sees the photo next to the reading, fixes the flagged lines and confirms.

## Technical details

- **Background jobs** stored in an n8n Data Table and deleted once delivered.
- **Learning memory** — every confirmed line teaches the workflow "this handwriting = this item / customer", so matching improves with use; a dedicated endpoint shows or forgets what it learned.
- **Cost tracking** — token usage of every reading is converted to USD and EGP per invoice.
- Customer list is used only in code and **never sent to the model**.

## The result

Invoices go from a photo to checked, structured data **without re-typing**, and the office's time goes only to the few lines the system isn't sure about.
