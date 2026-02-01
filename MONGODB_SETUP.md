# MongoDB Atlas Setup Guide

Complete step-by-step guide to set up MongoDB Atlas for your PerkSphere project.

## Overview
MongoDB Atlas is a cloud database service. You'll:
1. Create a free account
2. Create a M0 (free) cluster
3. Create a database user
4. Set up IP whitelist
5. Get connection string
6. Seed your database

**Time Required**: 15-20 minutes

---

## Step 1: Create MongoDB Atlas Account

### 1.1 Go to MongoDB Website
1. Open browser → Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign Up"** (green button)

### 1.2 Create Account
1. Enter **Email**: your-email@example.com
2. Create **Password**: strong password (12+ characters, mix of uppercase, lowercase, numbers, symbols)
3. Check: "I agree to the Terms of Service"
4. Click **"Sign Up"**
5. Check your email for verification link
6. Click the verification link to confirm email

### 1.3 Create Organization
After email verification, you'll see:
1. **Organization Name**: `My Organization` (or your name)
2. Click **"Continue"**

### 1.4 Create Project
1. **Project Name**: `PerkSphere` (or any name)
2. Click **"Create Project"**

✅ **You're now in MongoDB Atlas Dashboard**

---

## Step 2: Create Database Cluster

### 2.1 Start Cluster Creation
1. You should see a screen with "Build Your First Cluster"
2. If not, click **"Create Deployment"** button (top right area)
3. Choose **"MongoDB Atlas"** (default, should be selected)
4. Click **"Create"**

### 2.2 Select Free Tier
A modal appears asking you to choose a plan:

1. **M0 Sandbox** (Free) - Already selected by default ✅
   - Storage: 512 MB
   - Perfect for development/testing
   
2. Click **"Create"** (gray button at bottom)

### 2.3 Choose Cloud Provider & Region

You'll see options:

**Cloud Provider**: Pick one (all free)
- ✅ **AWS** (recommended - most regions available)
- Google Cloud
- Azure

**Region**: Pick closest to you
- **US East (Virginia)** if you're in USA
- **Europe (Frankfurt)** if you're in Europe
- **Asia Pacific (Singapore)** if you're in Asia

1. Select AWS
2. Select your closest region
3. Click **"Create Cluster"**

✅ **Cluster is being created** (takes 3-5 minutes)

### 2.4 Wait for Cluster
You'll see a loading screen with "Creating cluster..."

**Take a break - this takes a few minutes!** ☕

Once ready, you'll see:
- Green checkmark ✅
- Cluster name (usually `Cluster0`)
- A button that says "Go to Databases"

---

## Step 3: Create Database User

### 3.1 Access Database Access
1. Click **"Go to Databases"** or look for left sidebar
2. In left sidebar, look for **"Security"** section
3. Click **"Database Access"**

### 3.2 Add Database User
1. Click **"Add New Database User"** (green button, top right)

A form appears:

**Username**: 
```
perksphere_user
```

**Password**: Click **"Auto-generate Secure Password"**
- MongoDB generates a strong password
- Copy it and **save somewhere safe** (you'll need it!)
- Or manually enter a strong password (12+ characters)

**User Privileges**: 
- Select: **"Built-in Role"** (should be default)
- Choose: **"Atlas Admin"** (allows all database operations)

Click **"Add User"**

✅ **User created successfully!**

Save your credentials:
```
Username: perksphere_user
Password: [your-password-here]
```

---

## Step 4: Set Up IP Whitelist (Network Access)

### 4.1 Go to Network Access
1. In left sidebar → **"Security"** section
2. Click **"Network Access"**

### 4.2 Add IP Address
1. Click **"Add IP Address"** (green button, top right)

A popup appears asking:

**Which address would you like to whitelist?**

For **development** (testing):
- Click **"Allow Access from Anywhere"** ✅
- This adds: `0.0.0.0/0` (all IPs can connect)
- **Note**: Not secure for production, but fine for testing

For **production** (later):
- You'd add your server's specific IP

**Confirm**: Click **"Confirm"**

✅ **Network whitelist added!**

---

## Step 5: Get Connection String

### 5.1 Go to Clusters
1. In left sidebar → **"Deployment"** section
2. Click **"Clusters"**
3. You should see your cluster (usually `Cluster0`)

### 5.2 Connect to Cluster
1. Click your cluster name or the **"Connect"** button
2. A modal appears with connection options

### 5.3 Connect Your Application
1. Select **"Drivers"** or **"Connect Your Application"**
2. Choose your driver:
   - **Language**: Node.js
   - **Version**: 4.x or higher (leave default)

### 5.4 Copy Connection String
You'll see a connection string like:
```
mongodb+srv://perksphere_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Important**: Replace `<password>` with your actual password!

Full example:
```
mongodb+srv://perksphere_user:mySecurePassword123!@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Copy this entire string** - you'll need it for:
- Backend `.env` file
- Local development
- Render deployment

---

## Step 6: Create Database & Collections

### 6.1 Create Database (Optional - MongoDB creates it automatically)
Usually, MongoDB creates the database and collections automatically when you insert data.

But if you want to create manually:

1. Go to **"Deployment"** → **"Databases"**
2. Click **"Create Database"**
3. Database Name: `perksphere`
4. Collection Name: `deals` (or leave blank)
5. Click **"Create"**

### 6.2 Verify Database Creation
After deployment, click **"Browse Collections"** to see:
- Collections will be created when you insert data
- Don't worry if empty now - they'll be created by your app

---

## Step 7: Test Connection Locally

Before deploying, verify everything works!

### 7.1 Update Backend `.env` File

Open: `backend/.env`

```javascript
PORT=5000
MONGODB_URI=mongodb+srv://perksphere_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=perksphere-jwt-secret-change-in-production
```

### 7.2 Start Backend Locally

In terminal:
```bash
cd backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected: cluster0.xxxxx.mongodb.net
```

✅ **Connection successful!**

If you see errors, check:
- Password is correct (no special characters issues)
- Connection string has no spaces
- IP whitelist is set to `0.0.0.0/0`
- Username is correct: `perksphere_user`

### 7.3 Seed Database

In another terminal:
```bash
cd backend
npm run seed
```

Output should be:
```
Seeded 17 deals
```

### 7.4 Verify Data in MongoDB

1. Go back to MongoDB Atlas
2. Click **"Databases"** → **"Browse Collections"**
3. You should see:
   - Database: `perksphere`
   - Collections: `users`, `deals`, `claims`
   - Documents in each collection

✅ **Everything is set up!**

---

## Troubleshooting

### "MongoDB connection error"
**Problem**: `MongoNetworkError` or connection timeout

**Solutions**:
1. Check password in connection string
   - Look for special characters that might need escaping
   - If password has `@`, `#`, `:` use `%40`, `%23`, `%3A`
2. Verify IP whitelist is `0.0.0.0/0`
3. Check internet connection
4. Verify cluster is running (green status in MongoDB Atlas)

Example with special characters:
```
If password is: Pass@word#123
Connection string becomes: Pass%40word%23123
```

### "User not found" or "Authentication failed"
**Problem**: Wrong username or password

**Solutions**:
1. Go to **Security** → **Database Access**
2. Verify username matches (should be `perksphere_user`)
3. Click the user → Edit → Reset Password (if needed)
4. Copy new password and update `.env`

### "Cluster not found"
**Problem**: Connection string cluster name is wrong

**Solutions**:
1. Go to **Clusters** page in MongoDB Atlas
2. Click **Connect**
3. Copy the connection string again (it has the correct cluster name)

### Can't see collections after seeding
**Problem**: Data not appearing in MongoDB Atlas

**Solutions**:
1. Refresh the page (F5)
2. Click **"Browse Collections"** again
3. Check terminal output - did it say "Seeded 17 deals"?
4. Verify no errors in backend console

### Connection times out
**Problem**: Network connection issues

**Solutions**:
1. Check IP whitelist is set to `0.0.0.0/0`
2. Try from different network (mobile hotspot)
3. Check MongoDB Atlas status (top right corner)
4. Wait a few minutes and retry

---

## Summary

You now have:
- ✅ MongoDB Atlas account
- ✅ Free M0 cluster
- ✅ Database user: `perksphere_user`
- ✅ IP whitelist configured
- ✅ Connection string saved
- ✅ Database seeded with deals

**Your connection string** (save this):
```
mongodb+srv://perksphere_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## Next Steps

1. ✅ Use this connection string in backend `.env`
2. ✅ When deploying to Render, paste this in env vars
3. ✅ When deploying frontend to Vercel, use `NEXT_PUBLIC_API_URL`

**Ready to deploy!** 🚀

---

## Security Notes

- ✅ **Development**: IP whitelist `0.0.0.0/0` is fine
- ⚠️ **Production**: Restrict to specific IPs (your Render server IP)
- ✅ **Change JWT_SECRET** before production
- ✅ **Use strong passwords** for database users
- ✅ **Enable 2FA** on your MongoDB Atlas account (optional but recommended)

