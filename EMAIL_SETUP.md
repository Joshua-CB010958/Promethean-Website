# Email Integration Setup

This project uses SendGrid for sending consultation request emails.

## Setup

1. **Environment Variables**: The `.env` file contains your SendGrid API key and email configuration.

2. **Running the Application**:
   
   ```bash
   # Terminal 1: Start the frontend (Vite dev server)
   npm run dev
   # Runs on http://localhost:3001
   
   # Terminal 2: Start the backend (Email API server)
   npm run server
   # Runs on http://localhost:3002
   ```

   Or run both together:
   ```bash
   npm run dev:all
   ```

## How It Works

1. **User submits booking form** → Frontend sends POST request to `http://localhost:3002/api/send-consultation`

2. **Backend API** → Sends two emails via SendGrid:
   - **Admin notification** to `contact@prometheanai.com` with all booking details
   - **Customer confirmation** to the user's email with next steps

3. **Email Templates** include:
   - Selected services
   - Contact information
   - Project description
   - Professional HTML formatting

## Configuration

Update these in `.env`:
- `SENDGRID_API_KEY`: Your SendGrid API key
- `SENDGRID_FROM_EMAIL`: The sender email (must be verified in SendGrid)
- `SENDGRID_TO_EMAIL`: Where admin notifications are sent

## Important Notes

- The `.env` file is git-ignored for security
- SendGrid API key is for UK region (not EU)
- Backend server must be running for email functionality to work
- Frontend runs on port 3001, Backend on port 3002
