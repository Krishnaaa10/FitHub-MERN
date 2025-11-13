# 🔧 Fixing Network Error on Login - Deployment Guide

## Problem
You're seeing "Connection issue: Network Error" on login because the frontend doesn't know where your backend is located.

## Solution: Set Environment Variable in Render

### Step 1: Get Your Backend URL
1. Go to your Render dashboard
2. Find your **backend service**
3. Copy the URL (e.g., `https://fithub-backend.onrender.com`)

### Step 2: Set Frontend Environment Variable
1. Go to your **frontend service** in Render
2. Click on **Environment** tab
3. Click **Add Environment Variable**
4. Add:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://your-backend-url.onrender.com/api`
   - ⚠️ **IMPORTANT:** Make sure to include `/api` at the end!

### Step 3: Redeploy Frontend
1. After adding the environment variable, go to **Manual Deploy**
2. Click **Deploy latest commit**
3. Wait for the build to complete

### Step 4: Verify
1. Open your frontend URL
2. Open browser console (F12)
3. You should see: `🔗 API Base URL: https://your-backend-url.onrender.com/api`
4. Try logging in again

## Example Configuration

**Backend URL:** `https://fithub-backend.onrender.com`  
**Frontend Environment Variable:**
```
REACT_APP_API_URL=https://fithub-backend.onrender.com/api
```

## Troubleshooting

### Still seeing Network Error?
1. **Check the console** - What API URL is it showing?
2. **Verify backend is running** - Visit `https://your-backend-url.onrender.com/health`
3. **Check CORS** - Make sure `FRONTEND_URL` is set in backend environment variables
4. **Wait for cold start** - Render free tier has cold starts (30-60 seconds)

### Backend Health Check
Visit: `https://your-backend-url.onrender.com/health`

Should return:
```json
{
  "status": "ok",
  "message": "FitHub API is up and running!",
  "database": {
    "connected": true
  }
}
```

## Additional Backend Environment Variables

Make sure these are set in your **backend** service:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend-url.onrender.com
NODE_ENV=production
```

## Need Help?

Check the browser console for detailed error messages. The updated code now shows exactly which URL it's trying to connect to.

