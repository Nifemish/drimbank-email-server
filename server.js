const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'nifemish@gmail.com',
    pass: process.env.GMAIL_PASS || 'wiwibstfmkpqoynr'
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'DrimBank Email Server is running ✅' });
});

// Send email endpoint
app.post('/send-email', async (req, res) => {
  const { to, subject, html, text, otp_code, bank_name } = req.body;

  if (!to || !subject) {
    return res.status(400).json({ error: 'Missing required fields: to, subject' });
  }

  try {
    const result = await transporter.sendMail({
      from: '"DrimBank" <nifemish@gmail.com>',
      to: to,
      subject: subject,
      html: html || `<p>${text}</p>`,
      text: text || ''
    });

    console.log(`✅ Email sent to ${to} | Subject: ${subject} | ID: ${result.messageId}`);
    res.json({ ok: true, id: result.messageId });

  } catch (err) {
    console.error('❌ Email send error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`DrimBank Email Server running on port ${PORT}`);
});
