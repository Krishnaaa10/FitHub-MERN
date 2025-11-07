// Test email configuration
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing email configuration...\n');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Found' : 'NOT FOUND');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Found (hidden)' : 'NOT FOUND\n');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Email credentials are missing from .env file!');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'krishnaspattel@gmail.com',
  subject: 'Test Email from FitHub',
  text: 'This is a test email to verify the email configuration is working correctly.'
};

console.log('Attempting to send test email...\n');

transporter.sendMail(mailOptions)
  .then((info) => {
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Email sending failed!');
    console.error('Error:', error.message);
    console.error('\nCommon issues:');
    console.error('1. Make sure you\'re using an App Password, not your regular Gmail password');
    console.error('2. Verify 2-Step Verification is enabled');
    console.error('3. Check that the App Password was generated correctly');
    console.error('4. Ensure there are no extra spaces in the .env file');
    process.exit(1);
  });

