---
title: Cake Order Management System
summary: A full order platform for a bakery — customer web app, PostgreSQL backend, image storage on Cloudflare R2, and n8n workflows that sync sheets, build daily delivery lists and dispatch orders to Telegram and WhatsApp.
industry: Food & Bakery
order: 3
accent: '#34d399'
stack: [n8n, PostgreSQL, Cloudflare R2, Google Sheets, Telegram Bot API, Evolution API, JavaScript, Python]
metrics:
  - { value: '5', label: 'production n8n workflows' }
  - { value: '106', label: 'nodes across the system' }
  - { value: '6', label: 'integrated services' }
  - { value: 'Full-stack', label: 'web app + API + database' }
flow:
  - { label: 'Order web app', kind: trigger }
  - { label: 'Validate & normalize', kind: logic }
  - { label: 'PostgreSQL + R2 images', kind: data }
  - { label: 'Sync Google Sheets', kind: data }
  - { label: 'Telegram + WhatsApp', kind: action }
workflow: /workflows/cake-order-management.json
repo: https://github.com/sheetswork26-hue/n8n-projects/tree/main/Project4%20-%20Cake%20Order%20Management%20Automation
---

## The problem

A growing bakery was running orders across chats, notebooks and spreadsheets. Moderators typed every order by hand, cake reference photos and deposit screenshots got lost in conversations, and each morning someone had to assemble the day's delivery list and forward every order to the kitchen and drivers.

## The solution

A complete system with a **customer-facing web app** and an **n8n backend**:

### Web application
- **Create Order** — product, size, tiers, filling and covering, add-ons, delivery details, live pricing with discounts, and multiple image uploads.
- **Search & Edit** — find an order by code + phone, see its details and images, and submit changes.
- Images are **resized and converted to WebP in the browser** before upload; data goes to n8n as `multipart/form-data` against a documented **API contract**.

### Automation (5 workflows)
- **Create order** — normalize and validate the payload, store the order and add-ons in **PostgreSQL**, upload images to **Cloudflare R2**, sync Google Sheets and send a **WhatsApp** confirmation.
- **Search order** — fetch an order with its add-ons and signed image links.
- **Update order** — verify the original, apply changes to details, add-ons and images, re-sync sheets and update the related Telegram messages.
- **Telegram groups** — create date-specific *Cake* and *Delivery* groups through a companion Python service (FastAPI + Telethon).
- **Delivery dispatch** — build the daily delivery sheet and send each order's details and photos to the right Telegram group.

## Technical details

- **PostgreSQL schema** for orders, add-ons, image metadata and Telegram message references — so an edited order updates the exact messages already sent.
- **Object storage on R2** keeps the database light; only metadata lives in Postgres.
- **Backend validation** of contact details, fulfillment info, add-ons and payment constraints, independent of the frontend.
- Frontend **unit and responsive tests**, ES modules, and localization.

## The result

Orders go from customer to kitchen to driver **without anyone re-typing them**: one source of truth in the database, images attached to the right order, and daily delivery lists and Telegram groups created automatically.
