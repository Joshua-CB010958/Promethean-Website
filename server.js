import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory (built frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email API is running' });
});

// Send consultation request email
app.post('/api/send-consultation', async (req, res) => {
  try {
    const { name, email, company, phone, message, selectedServices } = req.body;

    // Validate required fields
    if (!name || !email || !message || !selectedServices || selectedServices.length === 0) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'message', 'selectedServices']
      });
    }

    // Format services list
    const servicesList = selectedServices.map(service => `• ${service}`).join('\n');

    // Email to you (notification)
    const adminEmail = {
      to: process.env.SENDGRID_TO_EMAIL || 'contact@prometheanai.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@prometheanai.com',
      subject: `New Consultation Request from ${name}`,
      text: `
New Consultation Request

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}

Selected Services:
${servicesList}

Project Description:
${message}

---
This is an automated message from your website booking form.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Consultation Request</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>

          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Selected Services</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${selectedServices.map(service => `<li>${service}</li>`).join('')}
            </ul>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Project Description</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="color: #64748b; font-size: 12px;">This is an automated message from your website booking form.</p>
        </div>
      `
    };

    // Confirmation email to customer
    const customerEmail = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@prometheanai.com',
      subject: 'Thank You for Your Consultation Request - Promethean AI',
      text: `
Hi ${name},

Thank you for reaching out to Promethean AI! We've received your consultation request and are excited to learn more about your project.

Your Selected Services:
${servicesList}

What happens next?
One of our team members will review your request and get back to you within 1-2 business days to schedule a consultation call.

In the meantime, feel free to reply to this email if you have any questions or additional information to share.

Best regards,
The Promethean AI Team

---
This is an automated confirmation email.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Promethean AI</h1>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #1e293b;">Thank You for Your Consultation Request!</h2>
            
            <p>Hi ${name},</p>
            
            <p>Thank you for reaching out to Promethean AI! We've received your consultation request and are excited to learn more about your project.</p>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #6366f1;">Your Selected Services</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${selectedServices.map(service => `<li>${service}</li>`).join('')}
              </ul>
            </div>

            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1;">
              <h3 style="margin-top: 0;">What happens next?</h3>
              <p style="margin-bottom: 0;">One of our team members will review your request and get back to you within 1-2 business days to schedule a consultation call.</p>
            </div>

            <p>In the meantime, feel free to reply to this email if you have any questions or additional information to share.</p>

            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>The Promethean AI Team</strong>
            </p>
          </div>

          <div style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">This is an automated confirmation email.</p>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      sgMail.send(adminEmail),
      sgMail.send(customerEmail)
    ]);

    res.json({ 
      success: true, 
      message: 'Consultation request sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    if (error.response) {
      console.error('SendGrid error:', error.response.body);
    }
    
    res.status(500).json({ 
      error: 'Failed to send consultation request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Serve index.html for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Serving frontend from /dist`);
  console.log(`✓ API endpoints: /api/health, /api/send-consultation`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);;
});
