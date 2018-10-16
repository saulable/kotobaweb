const routes = require('express').Router();
const config = require('./../config.js').mail;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.senderGmailUsername,
    pass: config.senderGmailPassword,
  },
});

routes.post('/', async (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: email,
    to: config.recipientAddress,
    subject: 'Message via kotobaweb.com',
    html: `From ${email}: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    res.json({
      success: false,
      email: config.recipientAddress,
    });
  }
});

module.exports = routes;
