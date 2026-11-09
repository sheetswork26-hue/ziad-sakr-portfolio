---
title: WhatsApp AI Meeting Assistant
summary: An AI agent on WhatsApp that understands text, voice notes and images, checks your schedule for conflicts, books the meeting in Google Calendar and emails the invitation — all from one chat message.
industry: Productivity & Scheduling
order: 2
accent: '#a78bfa'
stack: [n8n, WhatsApp Cloud API, OpenAI, Whisper, GPT Vision, Google Calendar, Google Sheets, Gmail, SerpApi]
metrics:
  - { value: '3', label: 'input types: text, voice & image' }
  - { value: '5', label: 'tools the AI agent chooses from' }
  - { value: '24/7', label: 'available on WhatsApp' }
  - { value: '18', label: 'workflow nodes' }
flow:
  - { label: 'WhatsApp message', kind: trigger }
  - { label: 'Text / voice / image?', kind: logic }
  - { label: 'Transcribe or analyze', kind: ai }
  - { label: 'AI agent + memory', kind: ai }
  - { label: 'Check conflicts', kind: data }
  - { label: 'Calendar + Gmail invite', kind: action }
  - { label: 'Reply on WhatsApp', kind: action }
workflow: /workflows/whatsapp-meeting-assistant.json
repo: https://github.com/sheetswork26-hue/n8n-projects/tree/main/Project1%20-%20Whatsapp%20Assistant
---

## The problem

Scheduling a meeting usually means a long back-and-forth: "Are you free Tuesday?", "What about 3pm?", then someone has to check the calendar, create the event and send the invite. People also send requests the way they actually talk — a **voice note**, a **screenshot** of an email, or a quick text.

## The solution

A WhatsApp assistant powered by an n8n **AI agent** that handles the whole thing in the chat:

- **WhatsApp Trigger** receives every message; a **Switch** routes it by type.
- **Voice notes** are downloaded through the WhatsApp media API and **transcribed** with OpenAI.
- **Images** are downloaded and **analyzed** by a vision model, so a screenshot of an invitation becomes structured text.
- Everything is normalized into one text field and passed to the **AI agent**, which keeps **conversation memory** so follow-ups like "make it 30 minutes later" just work.
- The agent decides which **tools** it needs:
  - **Google Sheets** — read existing meetings and check for **scheduling conflicts**, then log the new one
  - **Google Calendar** — create the event
  - **Gmail** — send the notification and calendar invitation
  - **Google Search (SerpApi)** — only when the request needs current, external information
- The final answer goes back to the user on **WhatsApp**.

## Technical details

### One agent, many inputs
Instead of three separate bots, the media branches (audio → transcription, image → vision) converge into the same text field. The agent never needs to know how the request arrived — which keeps the prompt and the tool logic simple.

### Tool-calling instead of hard-coded paths
The agent chooses tools per request. "What do I have tomorrow?" only reads Sheets; "Book a call with Ahmed Thursday at 2" checks conflicts, creates the event and emails the invite.

## The result

Scheduling becomes **one message** — typed, spoken or photographed — instead of a thread of back-and-forth, with conflicts caught before anything is booked.
