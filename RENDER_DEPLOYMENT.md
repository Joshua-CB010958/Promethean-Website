# Render Deployment Guide

This guide will help you deploy the Promethean AI website to Render with both the frontend and email API running on a single server.

## Prerequisites

1. A [Render account](https://render.com)
2. Your GitHub repository connected to Render
3. SendGrid API key and verified sender email

## Deployment Steps

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create a New Web Service on Render

1. Go to your [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:

   **Basic Settings:**
   - **Name:** `promethean-website` (or your preferred name)
   - **Region:** Choose the closest to your target audience
   - **Branch:** `main` (or your default branch)
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

   **Instance Type:**
   - Select **Free** (or paid plan for better performance)

### 3. Set Environment Variables

In your Render service settings, add these environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Sets production mode |
| `SENDGRID_API_KEY` | `your_api_key` | From SendGrid dashboard |
| `SENDGRID_FROM_EMAIL` | `noreply@yourdomain.com` | Must be verified in SendGrid |
| `SENDGRID_TO_EMAIL` | `your@email.com` | Where you receive consultation requests |

**Important:** Make sure your `SENDGRID_FROM_EMAIL` is verified in SendGrid:
- Go to [SendGrid Sender Authentication](https://app.sendgrid.com/settings/sender_auth/senders)
- Follow the verification process for your sender email

### 4. Deploy

Click **Create Web Service** and Render will:
1. Clone your repository
2. Install dependencies (`npm install`)
3. Build the React frontend (`npm run build`)
4. Start the Express server (`npm start`)

The server will:
- Serve your React app from the `/dist` folder
- Handle API requests at `/api/send-consultation`
- All on one server instance

### 5. Custom Domain (Optional)

1. In your Render service settings, go to **Custom Domain**
2. Add your domain (e.g., `prometheanai.com`)
3. Update your DNS records as instructed by Render
4. Render provides free SSL certificates automatically

### 6. Update SendGrid Sender Domain (Optional but Recommended)

For better email deliverability:

1. Go to [SendGrid Domain Authentication](https://app.sendgrid.com/settings/sender_auth/domain/create)
2. Add and verify your domain
3. Update your DNS records with the provided CNAME records
4. This allows you to send emails from `@yourdomain.com` instead of `@render.com`

## Architecture

```
┌─────────────────────────────────────────┐
│         Render Web Service              │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │     Express Server (Node.js)      │ │
│  │                                   │ │
│  │  • Serves Static Files (/dist)   │ │
│  │  • Email API (/api/*)            │ │
│  │  • Handles All Routes            │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │   Built React App (dist/)         │ │
│  │   • HTML, CSS, JS                 │ │
│  │   • All Frontend Assets           │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
              │
              │ API Requests
              ↓
        ┌──────────┐
        │ SendGrid │
        └──────────┘
```

## How It Works

1. **Single Server:** Both frontend and backend run on one Express server
2. **Static Files:** Built React app is served from `/dist` directory
3. **API Routes:** `/api/*` routes are handled by Express middleware
4. **SPA Routing:** All other routes serve `index.html` for client-side routing
5. **Email:** Consultation requests are sent via SendGrid API

## Environment Variables Explained

- **NODE_ENV:** Tells the app it's running in production
- **SENDGRID_API_KEY:** Your SendGrid API key for sending emails
- **SENDGRID_FROM_EMAIL:** The email address emails will be sent from (must be verified)
- **SENDGRID_TO_EMAIL:** The email address that receives consultation requests

## Testing Your Deployment

1. Visit your Render URL (e.g., `https://promethean-website.onrender.com`)
2. Navigate to the booking page
3. Select services and fill out the form
4. Submit and check that:
   - Success message appears
   - You receive the consultation email
   - Customer receives confirmation email

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify `npm run build` works locally
- Check Render build logs for specific errors

### Emails Not Sending

- Verify SendGrid API key is correct
- Check that sender email is verified in SendGrid
- Look at Render logs for SendGrid error messages
- Test the API endpoint: `https://your-app.onrender.com/api/health`

### Page Not Loading

- Ensure build command created the `dist` folder
- Check that start command is `npm start`
- Verify server.js has the static file serving middleware

### 404 on Page Refresh

- Make sure the catch-all route (`app.get('*', ...)`) is in server.js
- It should be **after** all API routes but **before** `app.listen()`

## Monitoring

- **Logs:** View real-time logs in the Render dashboard
- **Metrics:** Monitor CPU, memory usage, and response times
- **Alerts:** Set up email notifications for service disruptions

## Cost

- **Free Plan:** 750 hours/month, sleeps after 15 min of inactivity
- **Paid Plans:** Starting at $7/month for always-on service with more resources

## Support

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [SendGrid Documentation](https://docs.sendgrid.com)
