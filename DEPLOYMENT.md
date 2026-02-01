# PerkSphere Deployment Guide

## Architecture
- **Frontend**: Vercel (Next.js)
- **Backend**: Render.com (Express.js)  
- **Database**: MongoDB Atlas (Cloud)

This is the **recommended approach** - simple, proven, and no code changes needed!

## Prerequisites
- GitHub account with repository pushed
- MongoDB Atlas account (free tier available)
- Vercel account
- Render.com account

## Step 1: MongoDB Atlas Setup ⚙️

1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Click "Sign Up" (or "Start Free")
3. Create organization → Create project
4. Create a **M0 (Free) cluster**:
   - Select "AWS" provider
   - Region: Choose closest to you
   - Cluster name: `perksphere-cluster`
5. Wait for cluster to be ready (5-10 minutes)
6. **Create Database User**:
   - Database Access → Add Database User
   - Username: `perksphere_user`
   - Password: Generate strong password (save it!)
7. **Add IP Whitelist**:
   - Network Access → Add IP Address
   - Allow from anywhere: `0.0.0.0/0` (for testing)
8. **Get Connection String**:
   - Cluster → Connect → Connect Your Application
   - Copy MongoDB URI: `mongodb+srv://perksphere_user:PASSWORD@cluster.mongodb.net/perksphere`
   - Replace `PASSWORD` with your password

Save the connection string - you'll need it for both Render and local development!

## Step 2: Deploy Backend to Render 🚀

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Grant access to your GitHub repository

### 2.2 Deploy Backend Service
1. Click **"New +"** button → **"Web Service"**
2. Select your GitHub repository (`PerkSphere`)
3. Configure:
   - **Name**: `perksphere-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: (leave empty)

### 2.3 Add Environment Variables
1. Click **"Environment"**
2. Add the following:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://perksphere_user:YOUR_PASSWORD@cluster.mongodb.net/perksphere
   JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-chars
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   NODE_ENV=production
   ```
3. Click **"Deploy"**

### 2.4 Wait for Deployment
- Takes 2-5 minutes
- Check logs for errors
- Once done, note your URL: `https://perksphere-backend-xxxx.onrender.com`

### 2.5 Test Backend is Running
```bash
curl https://perksphere-backend-xxxx.onrender.com/api/health
# Should return: {"status":"ok"}
```

## Step 3: Deploy Frontend to Vercel 🎨

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Grant access to your repository

### 3.2 Import Project
1. Click **"Add New"** → **"Project"**
2. Select your GitHub repository
3. Configure:
   - **Project Name**: `perksphere` (or any name)
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./frontend`
   - **Build Command**: `next build` (auto-detected, leave as is)
   - **Output Directory**: `.next`

### 3.3 Add Environment Variables
1. Before deploying, click **"Environment Variables"**
2. Add:
   ```
   NEXT_PUBLIC_API_URL=https://perksphere-backend-xxxx.onrender.com/api
   ```
   (Replace with your actual Render backend URL from Step 2.4)
3. Click **"Deploy"**

### 3.4 Wait for Deployment
- Takes 1-3 minutes
- Your Vercel URL: `https://perksphere-xxxxx.vercel.app`

## Step 4: Test Your Deployment ✅

### 4.1 Frontend
1. Visit your Vercel URL
2. Test **Register**: Create new account
3. Test **Login**: Sign in with created account
4. Test **Deals Page**: Browse deals
5. Test **Dashboard**: View claimed deals

### 4.2 Verify API Calls
Open browser DevTools (F12) → Network tab → Try actions above
- Should see requests to your Render backend URL
- All requests should succeed (200/201 status)

### 4.3 Verify Database
1. Go to MongoDB Atlas
2. Click **"Collections"** → `perksphere` database
3. Should see:
   - `users` collection with your test account
   - `deals` collection with all deals
   - `claims` collection with your claimed deals

## Troubleshooting 🔧

### "Cannot connect to backend"
**Problem**: Network errors, 403, or 404 on API calls

**Fix**:
1. Check `NEXT_PUBLIC_API_URL` in Vercel is correct
2. Verify Render backend is running:
   ```bash
   curl https://your-backend.onrender.com/api/health
   ```
3. Check Render logs for errors
4. Verify `FRONTEND_URL` in Render includes your Vercel domain

### "ECONNREFUSED" or "Connection failed"
**Problem**: Backend not accepting requests

**Fix**:
1. Verify Render deployment completed successfully
2. Check all environment variables are set
3. Check MongoDB connection string is correct
4. Render free tier: if unused for 15 minutes, it goes to sleep. First request takes 30 seconds to wake up.

### "Invalid token" or "Authentication failed"
**Problem**: JWT token issues

**Fix**:
1. Ensure same `JWT_SECRET` is used in all Render instances
2. Clear browser localStorage: `localStorage.clear()`
3. Try registering again

### "MongoDB connection error"
**Problem**: Cannot connect to database

**Fix**:
1. Verify connection string in Render env var
2. Check IP whitelist on MongoDB Atlas (should be 0.0.0.0/0)
3. Confirm username/password in connection string
4. Test connection locally first with same string

### Vercel showing 500 error
**Problem**: Frontend build or runtime error

**Fix**:
1. Check Vercel deployment logs
2. Verify `NEXT_PUBLIC_API_URL` is set
3. Make sure `frontend/.env.local` is in `.gitignore`
4. Try redeploying: Vercel Dashboard → Deployments → Click Redeploy

## Production Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] MongoDB user created with strong password
- [ ] Connection string saved and verified
- [ ] Render backend deployed with all env vars
- [ ] Render health check returns `{"status":"ok"}`
- [ ] Vercel frontend deployed with API URL set
- [ ] Can register on production
- [ ] Can login on production
- [ ] Can view deals on production
- [ ] Can claim deals on production
- [ ] Dashboard shows claimed deals

## Environment Variables Quick Reference

**Render (Backend)**
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/perksphere
JWT_SECRET=your-secure-secret
FRONTEND_URL=https://yourapp.vercel.app
NODE_ENV=production
```

**Vercel (Frontend)**
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

## Performance Notes

**Vercel Frontend**:
- Cold starts: ~0-1s
- Optimal performance (global CDN)

**Render Backend**:
- Cold starts: ~30s (free tier sleeps after 15 min inactivity)
- First request after sleep takes ~30s
- Upgrade to paid for instant startup

**MongoDB Atlas**:
- Cold starts: instant
- Network latency: ~50-200ms depending on region

## Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel Frontend | Unlimited | $0/month |
| Render Backend | 750 compute hours/month | $0/month (upgradeable) |
| MongoDB Atlas | 512MB storage | $0/month (upgradeable) |
| **Total** | | **$0/month** ✅ |

---

**Your project is now live and free! 🎉**

For questions: Check the troubleshooting section or review deployment logs in Render/Vercel dashboards.

