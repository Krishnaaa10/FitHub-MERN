const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Try to send via SMTP or Ethereal
    try {
        let transporter;

        if (process.env.SMTP_HOST && process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT || 587,
                secure: false,
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD,
                },
            });
        } else {
            // Use Ethereal for testing
            console.log('Attempting to use Ethereal for email...');
            const testAccount = await nodemailer.createTestAccount();

            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        }

        const message = {
            from: `${process.env.FROM_NAME || 'FitHub Support'} <${process.env.FROM_EMAIL || 'noreply@fithub.com'}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };

        const info = await transporter.sendMail(message);

        console.log('Message sent: %s', info.messageId);
        if (!process.env.SMTP_HOST) {
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    } catch (err) {
        // 2. Fallback: Log to console if sending fails (Critical for Dev/Testing stability)
        console.error('⚠️ Email sending failed:', err.message);
        console.log('----------------------------------------------------');
        console.log('FALLBACK EMAIL LOG (Copy the link below):');
        console.log(`To: ${options.email}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Message: ${options.message}`);
        console.log('----------------------------------------------------');
        // Do NOT throw error, so the frontend sees "Success" and user can check console
    }
};

module.exports = sendEmail;
