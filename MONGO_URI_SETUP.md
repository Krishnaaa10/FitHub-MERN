# 🔧 Your MongoDB Connection String

## Your Correct MONGO_URI

Use this exact string in Render's environment variables:

```
mongodb+srv://shrikrishna:TNIF4XSldlgLnowF@cluster0.35xusde.mongodb.net/fithub?retryWrites=true&w=majority
```

## How to Set It in Render

### Step 1: Go to Render Dashboard
1. Visit https://dashboard.render.com/
2. Click on your **Backend Service** (the one that's failing)

### Step 2: Update Environment Variable
1. Click on **Environment** tab (left sidebar)
2. Find `MONGO_URI` in the list
3. Click **Edit** (or **Add** if it doesn't exist)
4. Paste this exact value:
   ```
   mongodb+srv://shrikrishna:TNIF4XSldlgLnowF@cluster0.35xusde.mongodb.net/fithub?retryWrites=true&w=majority
   ```
5. Click **Save Changes**

### Step 3: Verify Network Access in MongoDB Atlas
1. Go to https://cloud.mongodb.com/
2. Click **Network Access** (left sidebar)
3. Make sure you have `0.0.0.0/0` allowed (for Render)
4. If not, click **"Add IP Address"** → **"Allow Access from Anywhere"**

### Step 4: Redeploy
1. After saving the environment variable
2. Go to **Manual Deploy** tab
3. Click **"Deploy latest commit"**
4. Wait for deployment (2-3 minutes)

### Step 5: Check Logs
After deployment, check the logs. You should see:
```
✅ MongoDB Connected Successfully...
📊 Database: fithub
🌐 Host: cluster0.35xusde.mongodb.net
```

## Important Notes

⚠️ **Security:** This file contains your password. After setting it in Render, you can delete this file from your local machine.

✅ **Database Name:** I've set it to `fithub`. If you want a different database name, change `/fithub` in the connection string.

✅ **Password Encoding:** If your password has special characters, they might need URL encoding. Your current password should work fine.

## Troubleshooting

If you still get authentication errors:
1. Double-check the password is correct: `TNIF4XSldlgLnowF`
2. Verify username: `shrikrishna`
3. Check Network Access allows `0.0.0.0/0`
4. Make sure the user exists in MongoDB Atlas → Database Access

