---
title: AI Lead Management Automation
summary: Every lead from the website is validated, de-duplicated, scored 0–100, classified Hot / Warm / Cold and stored — then AI writes a sales brief for the qualified ones and pushes it to the sales team instantly.
industry: Sales & CRM
order: 1
featured: true
accent: '#ea4b71'
stack: [n8n, OpenAI, JavaScript, Google Sheets, Pushover, Webhooks, HTML/CSS/JS]
metrics:
  - { value: '0–100', label: 'lead score on 7 weighted factors' }
  - { value: '3', label: 'tiers: Hot · Warm · Cold' }
  - { value: '9', label: 'edge cases handled' }
  - { value: '20', label: 'workflow nodes' }
flow:
  - { label: 'Lead form webhook', kind: trigger }
  - { label: 'Validate & normalize', kind: logic }
  - { label: 'Duplicate check', kind: data }
  - { label: 'Score & classify', kind: logic }
  - { label: 'Store in Sheets', kind: data }
  - { label: 'AI sales insight', kind: ai }
  - { label: 'Notify sales', kind: action }
workflow: /workflows/lead-management-automation.json
repo: https://github.com/sheetswork26-hue/n8n-projects/tree/main/Project2%20-%20Lead%20Management%20Automation
---

## The problem

Leads arrive from forms and landing pages, and without automation the sales team has to do everything by hand: check the data is valid, spot duplicates, judge the lead's quality, decide who deserves a call first, save it somewhere, read the message to understand the intent — and only then reply.

Slow, inconsistent, and the best leads wait in the same queue as the junk.

## The solution

A single n8n system that takes a lead from the form to the salesperson's phone:

- **Custom lead form** served by n8n itself, posting to a webhook.
- **Backend validation** of name, email and Egyptian phone numbers — even though the form validates too, because client-side checks can be bypassed. Phones are normalized from every common format (`010…`, `+2010…`, `20…`).
- **Duplicate detection** by email *and* phone. Duplicates get their own response and a page telling the user exactly what matched: email, phone or both.
- **Rule-based scoring (0–100)** and classification: **80+ Hot**, **60+ Warm**, below that **Cold**.
- Every lead is **stored in Google Sheets** with an ID, score, tier and timestamp.
- **AI analyses only Hot and Warm leads** and produces a short brief — *intent, need, potential, recommended action* — instructed to use only what the lead provided and never invent details.
- The brief is pushed to sales via **Pushover**, and the customer gets a confirmation page.

## How the score works

| Factor | Max points |
|---|---:|
| Budget | 50 |
| Number of branches | 20 |
| Business type | 15 |
| Message / intent | 15 |
| Email | 10 |
| Phone | 10 |
| Company | 10 |

## Technical decisions

### Deterministic rules first, AI second
Validation and scoring must give the **same answer every time**, so they're plain JavaScript in Code nodes. AI is used only where interpretation adds value — reading the message in the context of budget, branches and score. This keeps the system predictable and keeps AI cost low (Cold leads never reach the model).

### Edge cases covered
Invalid email · invalid Egyptian phone · invalid name · duplicate email · duplicate phone · duplicate email + phone · cold leads · invalid submissions · missing fields.

### What I'd add for scale
PostgreSQL with unique constraints instead of Sheets, structured AI output, retries and a dedicated error workflow, rate limiting, and queue-based processing for traffic spikes.

## The result

The sales team stops processing leads and starts **talking to the right ones**: duplicates never reach them, Cold leads are filed automatically, and every Hot lead arrives on their phone with a ready-to-read brief and a recommended next step.
