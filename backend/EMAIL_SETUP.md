# Email Setup Instructions for FitHub Contact Form

## Step 1: Enable Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
3. Go to **Security** → **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "FitHub Contact Form" as the name
6. Click **Generate**
7. Copy the 16-character app password (you'll need this)

## Step 2: Update .env File

Add these lines to your `backend/.env` file:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Important:**
- Use the email address you want to send FROM (can be your Gmail)
- Use the 16-character app password (NOT your regular Gmail password)
- Keep these credentials secure and never commit them to git

## Step 3: Restart Backend Server

After updating .env, restart your backend server:
```bash
cd backend
npm run dev
```

## How It Works

When someone submits the contact form:
1. The message is saved to the database (if Message model exists)
2. An email is sent to: **krishnaspattel@gmail.com**
3. The email includes:
   - Sender's name
   - Sender's email (clickable to reply)
   - Subject
   - Message content
   - Professional HTML formatting

## Troubleshooting

- **Email not sending?** Check that EMAIL_USER and EMAIL_PASS are set correctly in .env
- **Authentication error?** Make sure you're using an App Password, not your regular password
- **Check server logs** for detailed error messages

