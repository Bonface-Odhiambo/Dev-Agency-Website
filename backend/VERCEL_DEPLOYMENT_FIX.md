# 🔧 Vercel Deployment Fix - 404 NOT_FOUND Error

## Problem
Getting `404 NOT_FOUND` error when deploying backend to Vercel.

## Root Causes
1. **Missing DATABASE_URL environment variable** in Vercel
2. **Database connection failing** during serverless function initialization
3. **Environment variables not properly set** in Vercel dashboard

## ✅ Solution Steps

### Step 1: Set Environment Variables in Vercel

Go to your Vercel project dashboard and add these **REQUIRED** environment variables:

#### Critical Variables (Must Have):
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-change-this
```

#### Full Environment Variables List:
```env
# Server
NODE_ENV=production
PORT=3000

# Database (CRITICAL - Get from Neon Dashboard)
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# JWT Secret (Generate a strong one)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=Function Call <your-email@gmail.com>

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
FRONTEND_URL=https://dev-agency-website.vercel.app
```

### Step 2: Get Your Neon Database URL

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Click on "Connection Details"
4. Copy the **Connection String** (it looks like):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. Paste this as `DATABASE_URL` in Vercel

### Step 3: Redeploy

After adding all environment variables:

```bash
# Option 1: Redeploy via Vercel Dashboard
# Go to Deployments → Click "..." → Redeploy

# Option 2: Redeploy via CLI
cd backend
vercel --prod
```

### Step 4: Test the Deployment

After deployment completes:

1. **Test Health Endpoint**:
   ```bash
   curl https://your-backend-url.vercel.app/api/health
   ```
   
   Expected response:
   ```json
   {
     "status": "ok",
     "timestamp": "2025-01-29T16:11:58.000Z",
     "database": "connected"
   }
   ```

2. **Test Root Endpoint**:
   ```bash
   curl https://your-backend-url.vercel.app/
   ```
   
   Expected response:
   ```json
   {
     "message": "Dev Agency API",
     "version": "1.0.0",
     "status": "running"
   }
   ```

## 🐛 Troubleshooting

### Still Getting 404?

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Check "Function Logs" for errors

2. **Common Issues**:

   **Issue**: "Cannot find module"
   - **Fix**: Make sure all dependencies are in `package.json`
   - Run: `npm install` locally to verify

   **Issue**: "Database connection failed"
   - **Fix**: Verify DATABASE_URL is correct
   - Check Neon database is active and accessible

   **Issue**: "CORS error"
   - **Fix**: Add your frontend URL to FRONTEND_URL env variable
   - Format: `https://your-frontend.vercel.app` (no trailing slash)

3. **Check Environment Variables**:
   ```bash
   # In Vercel Dashboard
   Settings → Environment Variables → Production
   
   # Verify all required variables are set
   ```

4. **Verify File Structure**:
   ```
   backend/
   ├── api/
   │   └── index.js          ✅ Must exist
   ├── routes/
   ├── models/
   ├── config/
   ├── vercel.json           ✅ Must exist
   └── package.json          ✅ Must exist
   ```

### Check Build Logs

In Vercel Dashboard:
1. Go to your deployment
2. Click "Building" or "View Function Logs"
3. Look for specific error messages

Common errors:
- `MODULE_NOT_FOUND` → Missing dependency
- `ECONNREFUSED` → Database connection issue
- `UNAUTHORIZED` → Wrong credentials

## 📝 Quick Checklist

Before deploying, verify:

- [ ] `DATABASE_URL` is set in Vercel (from Neon)
- [ ] `JWT_SECRET` is set (minimum 32 characters)
- [ ] `EMAIL_USER` and `EMAIL_PASSWORD` are set
- [ ] `FRONTEND_URL` matches your frontend deployment
- [ ] `NODE_ENV=production` is set
- [ ] All dependencies are in `package.json`
- [ ] `api/index.js` exists and exports handler
- [ ] `vercel.json` points to `api/index.js`

## 🎯 Expected Result

After successful deployment:

1. **Backend URL**: `https://your-backend.vercel.app`
2. **Health Check**: `https://your-backend.vercel.app/api/health` → Returns `200 OK`
3. **API Endpoints**: All routes accessible at `/api/*`

## 🔗 Next Steps

After backend is deployed:

1. **Update Frontend**:
   - Go to frontend Vercel project
   - Settings → Environment Variables
   - Update `VITE_API_URL=https://your-backend.vercel.app`
   - Redeploy frontend

2. **Test Full Stack**:
   - Visit your frontend
   - Try registration/login
   - Test service requests
   - Verify emails are sent

## 📞 Still Having Issues?

If you're still getting 404 errors:

1. Share the **full error message** from Vercel logs
2. Share your **vercel.json** configuration
3. Verify your **DATABASE_URL** format is correct
4. Check if the deployment is in the correct region

## 🔐 Security Notes

- Never commit `.env` file to Git
- Use strong JWT_SECRET (32+ characters)
- Use Gmail App Password, not regular password
- Enable 2FA on your Neon account
- Regularly rotate secrets in production
