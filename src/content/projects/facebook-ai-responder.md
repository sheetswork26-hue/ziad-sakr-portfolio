---
title: AI Facebook Comment & Messenger Responder
summary: Replies to every Facebook comment and Messenger message with natural Egyptian-Arabic AI responses — with signed-webhook verification, PostgreSQL de-duplication and WhatsApp error alerts.
industry: Social Media & Customer Service
order: 4
accent: '#60a5fa'
stack: [n8n, Meta Graph API, Meta Webhooks, Groq, PostgreSQL, Evolution API, JavaScript, Docker]
metrics:
  - { value: '2', label: 'channels: comments + Messenger' }
  - { value: '0', label: 'duplicate replies (DB unique key)' }
  - { value: 'HMAC', label: 'SHA-256 verified webhooks' }
  - { value: '24', label: 'workflow nodes' }
flow:
  - { label: 'Meta webhook', kind: trigger }
  - { label: 'Verify signature', kind: logic }
  - { label: 'Route event', kind: logic }
  - { label: 'Store & dedupe', kind: data }
  - { label: 'AI agent (Groq)', kind: ai }
  - { label: 'Reply + private DM', kind: action }
workflow: /workflows/facebook-ai-responder.json
repo: https://github.com/sheetswork26-hue/n8n-projects/tree/main/Project3%20-%20AI-Powered%20Facebook%20Comment%20%26%20Message%20Responder
---

## The problem

Busy Facebook pages get dozens of comments ("price?", "available?") and Messenger messages every day. Answering them manually is slow, replies come hours late, and the same comment sometimes gets answered twice — or not at all.

## The solution

An n8n system connected to **Meta Webhooks** that handles both channels:

### Messenger
Incoming messages are extracted and sent to an **AI agent running on Groq**, which writes a friendly, natural reply in **Egyptian Arabic** and sends it back through the **Graph API**.

### Post comments
New comments are parsed (comment, post, commenter, permalink), **stored in PostgreSQL**, and — only if they're new — the system **replies publicly** and sends the commenter a **private message**. Comments made by the page itself are ignored.

## Technical details

### Security first
- Handles Meta's **webhook verification** handshake.
- Validates every event's **HMAC-SHA256 signature** with the app secret and **rejects** anything invalid with the right HTTP status.

### Exactly-once replies
Comments are inserted with a **unique constraint on `(page_id, comment_id)`**. Meta can deliver the same event more than once; the database guarantees it's only answered once. Original payloads are kept as **JSONB** for analytics.

### Monitoring
An **Error Trigger** workflow catches any failed execution and sends a **WhatsApp alert** (via Evolution API) with the workflow name, failing node, error message and a link to the execution.

## The result

Every customer gets an **instant, human-sounding reply** on the channel they used, the page never double-replies, and any failure is reported on WhatsApp before customers notice.
