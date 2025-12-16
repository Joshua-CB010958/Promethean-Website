# SendGrid Sender Verification - Quick Fix

## The Problem
SendGrid requires you to verify the email address you're sending FROM before it will send any emails.

## How to Fix (5 minutes)

### Step 1: Go to SendGrid Sender Authentication
Visit: https://app.sendgrid.com/settings/sender_auth/senders

### Step 2: Create a Single Sender
1. Click "Create New Sender"
2. Fill in the form with YOUR email address (can be Gmail, etc.)
   - From Name: Promethean AI
   - From Email Address: **your-email@gmail.com** (use your real email)
   - Reply To: Same as above
   - Company: Promethean AI
   - Address: Your address
   - City, State, Zip, Country: Your location
3. Click "Create"

### Step 3: Verify Your Email
1. Check your inbox for verification email from SendGrid
2. Click the verification link
3. Done! ✓

### Step 4: Update .env File
Edit the `.env` file and replace:
```
SENDGRID_FROM_EMAIL=your-verified-email@gmail.com
SENDGRID_TO_EMAIL=your-email@gmail.com
```

With your actual verified email addresses.

### Step 5: Restart the Server
```bash
# Stop the current server (Ctrl+C)
# Then restart it:
npm run server
```

## Testing
1. Go to http://localhost:3001/#booking
2. Select services and fill the form
3. Submit
4. You should receive:
   - Confirmation email at the customer's email
   - Notification email at YOUR email

## Common Issues

**Still getting 403 error?**
- Make sure you clicked the verification link in your email
- Wait a few minutes after verifying
- Check that the email in `.env` EXACTLY matches the verified sender

**Using a custom domain?**
- You need to set up domain authentication (more complex)
- For now, just use a Gmail or other email address

## Alternative: Skip Email for Now
If you want to test without email, you can temporarily:
1. Comment out the email sending code
2. Just show a success message
3. Log the form data to console

Let me know if you need help!
