# DrimBank Email Server — Setup Guide

## What this is
A tiny backend server that receives email requests from your DrimBank app
and sends them via Resend (fast, reliable, free up to 3,000 emails/month).

---

## Step 1 — Get a free Resend API key

1. Go to https://resend.com and click **Sign Up** (free)
2. After login, go to **API Keys** → click **Create API Key**
3. Name it "DrimBank" → click **Add**
4. **Copy the key** — it looks like: `re_xxxxxxxxxxxxxxxxxx`

---

## Step 2 — Set up your sender email

In Resend, go to **Domains** and either:
- Add your own domain (e.g. `noreply@yourdomain.com`) — recommended
- OR use Resend's free test address: `onboarding@resend.dev` (for testing only)

---

## Step 3 — Deploy to GitHub

1. Go to https://github.com and create a **new repository** called `drimbank-email-server`
2. Upload these 3 files to it:
   - `server.js`
   - `package.json`
   - `.gitignore`

---

## Step 4 — Deploy to Render.com

1. Go to https://render.com → Sign Up free (use GitHub login)
2. Click **New** → **Web Service**
3. Connect your GitHub repo `drimbank-email-server`
4. Fill in these settings:
   - **Name:** drimbank-email-server
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
5. Scroll down to **Environment Variables** and add:
   - Key: `RESEND_API_KEY`  → Value: `re_xxxxxxxxxx` (your key from Step 1)
   - Key: `FROM_EMAIL`      → Value: `DrimBank <noreply@yourdomain.com>` (or your Resend address)
6. Click **Deploy Web Service**
7. Wait ~2 minutes → Render will give you a URL like:
   `https://drimbank-email-server.onrender.com`

---

## Step 5 — Paste the URL into DrimBank

1. Open your DrimBank HTML app
2. Go to **Register** screen → tap **"Set Up →"** on the yellow banner
3. Paste your Render URL + `/send-email`:
   `https://drimbank-email-server.onrender.com/send-email`
4. Tap **Save & Enable Real Emails** ✅

That's it — your app will now send real emails instantly!

---

## Testing
Visit your Render URL in a browser:
`https://drimbank-email-server.onrender.com`

You should see: `{"status":"DrimBank Email Server is running ✅"}`
