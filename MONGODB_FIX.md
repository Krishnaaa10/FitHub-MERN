# 🔐 Fix MongoDB Authentication Error

## The Problem
You're seeing: `❌ Failed to connect to MongoDB: bad auth : authentication failed`

This means your `MONGO_URI` in Render has **incorrect credentials**.

## Quick Fix (5 minutes)

### Step 1: Get Your MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account
3. Click on your **Cluster** (or create one if you don't have one)
4. Click the **"Connect"** button
5. Choose **"Connect your application"**
6. Select **"Node.js"** and version **"5.5 or later"**
7. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```

### Step 2: Get Your Database Credentials

1. In MongoDB Atlas, go to **Database Access** (left sidebar)
2. Find your database user (or create a new one)
3. If you forgot the password:
   - Click **"Edit"** on the user
   - Click **"Edit Password"**
   - Set a new password (save it somewhere safe!)
   - Click **"Update User"**

### Step 3: Update MONGO_URI in Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click on your **Backend Service**
3. Go to **Environment** tab
4. Find `MONGO_URI` and click **Edit**
5. Replace it with your connection string:
   ```
   mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fithub?retryWrites=true&w=majority
   ```
   
   **Important:**
   - Replace `YOUR_USERNAME` with your MongoDB username
   - Replace `YOUR_PASSWORD` with your MongoDB password
   - Replace `cluster0.xxxxx` with your actual cluster address
   - Add `/fithub` (or your database name) before the `?`
   - Keep `?retryWrites=true&w=majority` at the end

### Step 4: Check Network Access

1. In MongoDB Atlas, go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Click **"Confirm"**

   ⚠️ **Important:** For Render, you MUST allow `0.0.0.0/0` (all IPs)

### Step 5: Redeploy

1. After updating `MONGO_URI` in Render
2. Go to **Manual Deploy** tab
3. Click **"Deploy latest commit"**
4. Wait for deployment
5. Check logs - you should see: `✅ MongoDB Connected Successfully...`

## Example MONGO_URI Format

**Before (WRONG):**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
```

**After (CORRECT):**
```
mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/fithub?retryWrites=true&w=majority
```

## Common Mistakes

❌ **Wrong:** Using placeholder text `<username>` or `<password>`  
✅ **Right:** Use actual username and password

❌ **Wrong:** Missing database name  
✅ **Right:** Add `/fithub` (or your database name) before `?`

❌ **Wrong:** Password has special characters not URL-encoded  
✅ **Right:** URL-encode special characters (e.g., `@` becomes `%40`)

❌ **Wrong:** Network Access doesn't allow Render IPs  
✅ **Right:** Allow `0.0.0.0/0` in Network Access

## Verify It's Working

After redeploying, check the logs. You should see:
```
✅ MongoDB Connected Successfully...
📊 Database: fithub
🌐 Host: cluster0.xxxxx.mongodb.net
```

If you still see errors, double-check:
1. Username and password are correct
2. Database user has read/write permissions
3. Network Access allows `0.0.0.0/0`
4. Connection string format is correct

## Need Help?

Check the Render logs for the exact error message. The improved error handler will now show:
- Which username was detected (if any)
- Step-by-step instructions
- Example connection string format

