const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'DrimBank <onboarding@resend.dev>';

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
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: subject,
      html: html || `<p>${text}</p>`,
      text: text || '',
    });

    console.log(`✅ Email sent to ${to} | Subject: ${subject} | ID: ${result.data?.id}`);
    res.json({ ok: true, id: result.data?.id });

  } catch (err) {
    console.error('❌ Email send error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`DrimBank Email Server running on port ${PORT}`);
});
