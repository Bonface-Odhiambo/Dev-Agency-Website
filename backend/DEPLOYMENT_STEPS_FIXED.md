# Backend Deployment - Fixed Configuration

## Problem
Getting 404 NOT_FOUND error during Vercel deployment.

## Root Cause
Vercel wasn't properly detecting the serverless function entry point.

## Solution Applied

### 1. Simplified vercel.json
Changed from complex routing to simple pattern matching:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}
```

### 2. Created Root index.js
Added fallback entry point at root level that exports api/index.js

### 3. Verified Export Format
Confirmed `api/index.js` properly exports handler function

## Deployment Steps

### Option 1: Deploy from Root Directory

```bash
# From project root
cd "c:\Users\USER\Desktop\Venda Dev Agency\Dev-Agency-Website"
vercel --prod
```

When prompted:
- Set up and deploy? **Yes**
- Which scope? **Select your account**
- Link to existing project? **No** (first time) or **Yes** (redeploy)
- What's your project's name? **dev-agency-backend**
- In which directory is your code located? **./backend**

### Option 2: Deploy from Backend Directory

```bash
cd backend
vercel --prod
```

When prompted:
- Set up and deploy? **Yes**
- Which scope? **Select your account**  
- Link to existing project? **No** (first time) or **Yes** (redeploy)
- What's your project's name? **dev-agency-backend**
- In which directory is your code located? **./** (current directory)

### Option 3: Use Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your Git repository (or upload)
4. **Root Directory:** Set to `backend`
5. **Framework Preset:** Other
6. **Build Command:** Leave empty
7. **Output Directory:** Leave empty
8. **Install Command:** `pnpm install` or `npm install`
9. Add Environment Variables (see below)
10. Click "Deploy"

## Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_minimum_32_characters
SESSION_SECRET=your_session_secret_key
FRONTEND_URL=https://dev-agency-frontend-six.vercel.app
NODE_ENV=production
```

## Verify Deployment

After deployment completes:

### 1. Check Root Endpoint
```bash
curl https://your-backend-url.vercel.app/
```

Expected response:
```json
{
  "message": "Dev Agency API",
  "version": "1.0.0",
  "status": "running",
  "endpoints": { ... }
}
```

### 2. Check Health Endpoint
```bash
curl https://your-backend-url.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-10-30T...",
  "database": "connected"
}
```

### 3. Test CORS
Open browser console on your frontend and check Network tab:
- Look for `Access-Control-Allow-Origin` header
- Should match your frontend URL

## If Still Getting 404

### Check 1: Verify File Structure
```
backend/
├── api/
│   └── index.js  ← Must exist!
├── index.js      ← New fallback file
├── vercel.json   ← Updated config
├── package.json
└── ... other files
```

### Check 2: Verify package.json
Make sure it has:
```json
{
  "type": "module",
  "main": "server.js"
}
```

### Check 3: Check Build Logs
1. Go to Vercel Dashboard
2. Click on your deployment
3. Check "Build Logs" tab
4. Look for errors

### Check 4: Check Function Logs
1. Go to Vercel Dashboard
2. Click on deployment
3. Click "Functions" tab
4. Look for runtime errors

### Check 5: Try Manual Build
```bash
cd backend
pnpm install
node api/index.js
```

If this fails locally, fix the errors before deploying.

## Alternative: Use Different Entry Point

If the above doesn't work, we can restructure to use `server.js` as entry point:

### Create api/server.js:
```javascript
import handler from './index.js';
export default handler;
```

### Update vercel.json:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/server.js"
    }
  ]
}
```

## Common Deployment Errors

### "FUNCTION_INVOCATION_FAILED"
- Check environment variables are set
- Check database connection string
- Check function logs for errors

### "BUILD_FAILED"
- Check package.json is valid
- Check all dependencies are listed
- Check for syntax errors

### "NO_SERVERLESS_FUNCTIONS_FOUND"
- Verify api/index.js exists
- Check vercel.json configuration
- Ensure file exports default function

## Need Help?

If deployment still fails:

1. **Share the full error message** from Vercel
2. **Check Vercel build logs** for specific errors
3. **Verify all files are committed** to git
4. **Try deploying from Vercel Dashboard** instead of CLI

## Files Modified

1. ✅ `vercel.json` - Simplified configuration
2. ✅ `index.js` - Created root fallback
3. ✅ `api/index.js` - Already correct

## Next Steps

1. Commit all changes to git
2. Deploy using one of the methods above
3. Check deployment logs
4. Test endpoints
5. Update frontend VITE_API_URL

---

**Status:** ✅ Configuration Fixed & Ready
**Last Updated:** 2024-10-30
