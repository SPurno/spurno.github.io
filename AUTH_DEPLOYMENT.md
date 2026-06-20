# 🔐 Auth System — Deployment Guide

This document explains how to deploy the user authentication system (Cloudflare Worker + Turso database).

---

## Architecture

```
┌──────────────┐     HTTP/API      ┌──────────────────┐     SQL     ┌──────────────┐
│  GitHub Pages │ ────────────────> │  Cloudflare      │ ─────────>  │   Turso      │
│  (static)     │                   │  Worker (auth)   │             │  (SQLite)    │
│  login.html   │ <──────────────── │  spurno-auth     │ <─────────  │  Edge DB     │
│  register.html│     JWT + JSON    └──────────────────┘             └──────────────┘
└──────────────┘
```

---

## 1. Database (already set up ✅)

The `users` table has been created in your Turso database.

- **Database URL:** `libsql://userreg-spurno.aws-us-east-1.turso.io`
- **Schema:** `workers/auth/scripts/setup-db.mjs`

To reset or re-migrate:
```bash
cd workers/auth
node scripts/setup-db.mjs <your-auth-token>
```

---

## 2. Deploy the Cloudflare Worker

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A [Cloudflare](https://cloudflare.com) account

### Steps

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Navigate to the worker directory
cd workers/auth

# Deploy the worker
npx wrangler deploy

# Set the Turso auth token as a secret
npx wrangler secret put TURSO_AUTH_TOKEN
# Paste: eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODE5ODE5MjUsImlkIjoiMDE5ZWU2NjQtNWEwMS03ZGZiLWE5NTktOGIwZTAyMmVhYjk1IiwicmlkIjoiYzUzN2E2ZTctZjM4YS00ZDY2LWJkZGYtZjMxMWVlZmRmYzljIn0.JdhMsr-7gCVl_if-2VL11TONiyiecie5rAanIRVhKTdMXlP6OPK697jviAi1MOIt6_wdw4N3kYOlxwggnZdeDg

# Set a JWT secret (generate a random string)
npx wrangler secret put JWT_SECRET
# Paste: a-random-secret-string-at-least-32-chars-long
```

### Retrieve the Worker URL

After deploying, you'll see a URL like:
```
https://spurno-auth.<your-subdomain>.workers.dev
```

---

## 3. Update the Frontend

### Update `js/auth-client.js`

Open `js/auth-client.js` and update the `AUTH_API_URL` constant with your deployed Worker URL:

```js
const AUTH_API_URL = 'https://spurno-auth.your-subdomain.workers.dev/api';
```

### (Optional) Restrict CORS Origin

In the Worker (`workers/auth/src/auth.js`), update the `corsHeaders` function to restrict the allowed origin to your actual domain:

```js
'Access-Control-Allow-Origin': 'https://spurno.github.io',
```

---

## 4. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Create a new user account |
| POST | `/api/login` | Authenticate and receive JWT |
| GET | `/api/me` | Get current user info (requires Bearer token) |

---

## Local Development

Run the Worker locally:
```bash
cd workers/auth
npx wrangler dev
```

For local frontend dev, update `js/auth-client.js` to use:
```js
const AUTH_API_URL = 'http://localhost:8787/api';
```
