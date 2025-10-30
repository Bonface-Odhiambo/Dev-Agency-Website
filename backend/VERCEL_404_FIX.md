# Vercel 404 & CORS Issues - Complete Fix

## Issues Identified & Fixed

### 1. **Simplified vercel.json Configuration** ✅
- Removed `includeFiles` config (Vercel auto-includes dependencies)
- Added `functions` configuration for memory and timeout
- Simplified routing

### 2. **Enhanced CORS Configuration** ✅
- Added `optionsSuccessStatus: 200` for preflight requests
- Added explicit `methods` array
- Added `allowedHeaders` for Authorization
- Better error logging

### 3. **Created .vercelignore** ✅
- Excludes unnecessary files from deployment
- Reduces deployment size
- Faster builds

---

## Deployment Checklist

### Step 1: Verify Environment Variables

Make sure these are set in Vercel Dashboard:

```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
SESSION_SECRET=your-session-secret-key
FRONTEND_URL=https://dev-agency-frontend-six.vercel.app
NODE_ENV=production
```

### Step 2: Deploy Backend

```bash
cd backend
vercel --prod
```

If it asks to set up a new project, answer:
- Set up and deploy? **Yes**
- Which scope? **Select your account**
- Link to existing project? **No** (if first time)
- Project name? **dev-agency-backend**
- In which directory? **./** (already in backend folder)

### Step 3: Test Deployment

After deployment, test these endpoints:

**1. Root endpoint:**
```bash
curl https://your-backend.vercel.app/
```
Expected: JSON with API info

**2. Health check:**
```bash
curl https://your-backend.vercel.app/api/health
```
Expected: `{"status":"ok"}`

**3. CORS preflight:**
```bash
curl -X OPTIONS https://your-backend.vercel.app/api/auth/login \
  -H "Origin: https://dev-agency-frontend-six.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization"
```
Expected: 200 OK with CORS headers

---

## Common 404 Causes & Solutions

### Issue 1: Wrong Route Configuration
**Symptom:** All routes return 404

**Solution:** ✅ Fixed in `vercel.json`
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ]
}
```

### Issue 2: Missing Dependencies
**Symptom:** 500 error or module not found

**Solution:** Ensure `package.json` has all dependencies
```bash
cd backend
pnpm install
# Commit package.json and pnpm-lock.yaml
```

### Issue 3: ES Module Issues
**Symptom:** "Cannot use import statement outside a module"

**Solution:** ✅ Already configured
- `package.json` has `"type": "module"`
- `api/index.js` uses ES6 exports

### Issue 4: Database Connection Fails
**Symptom:** 500 error, "database connection failed"

**Solution:**
- Use connection pooling URL (for Supabase/Neon)
- Check DATABASE_URL is correct
- Ensure database allows Vercel IPs

### Issue 5: CORS Preflight Fails
**Symptom:** "No 'Access-Control-Allow-Origin' header"

**Solution:** ✅ Fixed in `api/index.js`
- Added `optionsSuccessStatus: 200`
- Added explicit methods and headers
- Added origin logging

---

## Debugging Deployed Backend

### View Logs:
1. Go to Vercel Dashboard
2. Select backend project
3. Click "Deployments"
4. Click latest deployment
5. Click "Functions" tab
6. View real-time logs

### Check Function Status:
```bash
vercel logs <deployment-url>
```

### Test Specific Routes:
```bash
# Test with curl
curl -v https://your-backend.vercel.app/api/health

# Test with browser DevTools
# Open Network tab and check:
# - Request URL
# - Request Method
# - Response Status
# - Response Headers (CORS)
```

---

## Vercel-Specific Considerations

### 1. **Serverless Function Limits:**
- Max execution time: 10 seconds (Hobby plan)
- Max payload: 4.5 MB
- Cold start: First request may be slow

### 2. **Environment Variables:**
- Must be set in Vercel Dashboard
- Changes require redeployment
- Don't commit `.env` to git

### 3. **File System:**
- Read-only except `/tmp`
- Don't write files to disk
- Use database or external storage

### 4. **Database Connections:**
- Use connection pooling
- Close connections properly
- Handle connection errors

---

## Post-Deployment Verification

### ✅ Checklist:

- [ ] Backend deployed successfully
- [ ] Root endpoint (`/`) returns API info
- [ ] Health endpoint (`/api/health`) returns OK
- [ ] CORS headers present in responses
- [ ] Login endpoint works from frontend
- [ ] No 404 errors in browser console
- [ ] No CORS errors in browser console
- [ ] Database queries work
- [ ] All API endpoints accessible

---

## If Still Getting 404s:

### 1. Check Vercel Build Logs:
- Look for build errors
- Check if `api/index.js` was built
- Verify no import errors

### 2. Verify File Structure:
```
backend/
├── api/
│   └── index.js  ← Must exist!
├── routes/
├── models/
├── config/
├── package.json
└── vercel.json
```

### 3. Test Locally First:
```bash
cd backend
pnpm install
pnpm start
# Test on http://localhost:3001
```

### 4. Check Vercel Function Logs:
- Look for runtime errors
- Check database connection
- Verify environment variables loaded

---

## Updated Files:

1. ✅ `vercel.json` - Simplified configuration
2. ✅ `api/index.js` - Enhanced CORS
3. ✅ `.vercelignore` - Exclude unnecessary files

---

## Need More Help?

### Vercel Support:
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

### Common Error Messages:

**"FUNCTION_INVOCATION_FAILED"**
- Check function logs for errors
- Verify environment variables
- Check database connection

**"DEPLOYMENT_ERROR"**
- Check build logs
- Verify package.json is valid
- Ensure all dependencies installed

**"NO_STATUS_CODE_FROM_FUNCTION"**
- Function crashed or timed out
- Check for infinite loops
- Verify async operations complete

---

**Status:** ✅ Configuration Updated & Ready for Deployment
**Next Step:** Deploy with `vercel --prod` from backend folder
