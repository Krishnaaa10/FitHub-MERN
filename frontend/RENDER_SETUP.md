# 🚨 URGENT: Fix Network Error - Set Environment Variable in Render

## The Problem
You're seeing: `⚠️ Connection issue: Network Error`  
Trying to connect to: `http://localhost:5000/health`

This means your frontend doesn't know where your backend is!

## The Solution (2 minutes)

### Step 1: Get Your Backend URL
1. Go to https://dashboard.render.com
2. Click on your **Backend Service**
3. Copy the URL (looks like: `https://fithub-backend-xxxx.onrender.com`)

### Step 2: Set Environment Variable
1. Go to your **Frontend Service** in Render
2. Click **Environment** tab (left sidebar)
3. Click **Add Environment Variable** button
4. Add this:
   ```
   Key: REACT_APP_API_URL
   Value: https://your-backend-url.onrender.com/api
   ```
   ⚠️ **IMPORTANT:** Replace `your-backend-url.onrender.com` with YOUR actual backend URL!
   ⚠️ **IMPORTANT:** Make sure to include `/api` at the end!

### Step 3: Redeploy
1. After adding the variable, go to **Manual Deploy** tab
2. Click **Deploy latest commit**
3. Wait 3-5 minutes for build to complete

### Step 4: Test
1. Open your frontend URL
2. Open browser console (F12)
3. You should see: `🔗 API Base URL: https://your-backend-url.onrender.com/api`
4. Try logging in - it should work now!

## Example

**Your Backend URL:** `https://fithub-backend-abc123.onrender.com`  
**Set this in Frontend Environment:**
```
REACT_APP_API_URL=https://fithub-backend-abc123.onrender.com/api
```

## Still Not Working?

1. **Check console** - What URL does it show?
2. **Verify backend** - Visit `https://your-backend-url.onrender.com/health` in browser
3. **Check spelling** - Make sure the environment variable name is exactly: `REACT_APP_API_URL`
4. **Redeploy** - After setting the variable, you MUST redeploy for it to take effect!

## Quick Checklist

- [ ] Got backend URL from Render dashboard
- [ ] Added `REACT_APP_API_URL` environment variable in frontend service
- [ ] Value includes `/api` at the end
- [ ] Redeployed frontend service
- [ ] Checked browser console for correct API URL
- [ ] Tested login

---

**This is the #1 cause of network errors!** Once you set this variable and redeploy, it will work! 🚀

