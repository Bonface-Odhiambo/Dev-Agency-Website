# Backend Deployment Steps

## 🚨 IMPORTANT: Fix for 404 NOT_FOUND Error

If you're getting a **404 NOT_FOUND** error, the issue is likely **missing DATABASE_URL** environment variable.

**Quick Fix**:
1. Get your DATABASE_URL from Neon (see `GET_DATABASE_URL.md`)
2. Add it to Vercel environment variables
3. Redeploy

See `VERCEL_DEPLOYMENT_FIX.md` for detailed troubleshooting.

---

## 🚀 Deployment Steps

### Step 0: Pre-Deployment Check

Run the deployment checker:
```bash
cd backend
check-deployment.bat
```

This will verify all required files exist before deploying.

### Step 1: Get Your DATABASE_URL

**CRITICAL**: You need your Neon database connection string.

1. Go to [Neon Console](https://console.neon.tech)
2. Select your project
3. Copy the "Connection String" (looks like):
   ```
   postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

📖 **Detailed guide**: See `GET_DATABASE_URL.md`

### Step 2: Set Environment Variables in Vercel

**BEFORE deploying**, go to Vercel Dashboard and add these environment variables:

#### ⚠️ CRITICAL Variables (Required):

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
```

#### 📧 Email Configuration:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=Function Call <your-email@gmail.com>
```

#### 🔧 Optional Configuration:

```env
PORT=3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
FRONTEND_URL=https://dev-agency-website.vercel.app
```

**How to add in Vercel**:
1. Vercel Dashboard → Your Backend Project
2. Settings → Environment Variables
3. Add each variable above
4. Select "Production" environment
5. Click "Save"

### Step 3: Deploy Backend

```bash
cd backend
vercel --prod
```

Or use the deployment script:
```bash
deploy-backend.bat
```

### 3. Update Frontend Environment Variable

After backend deployment, update your frontend's environment variable:

1. Go to your frontend project in Vercel Dashboard
2. Settings → Environment Variables
3. Update or add:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```
4. Redeploy frontend

### 4. Test the Connection

After both deployments:
- Visit: https://dev-agency-website.vercel.app
- Try to register/login
- Test service request creation
- Check if emails are being sent

## 🔧 Important Notes:

1. **Database**: Since you're using Neon, make sure your connection string is correct
2. **CORS**: The backend is already configured to use FRONTEND_URL environment variable
3. **Email**: Make sure to use Gmail app password, not regular password
4. **JWT Secret**: Use a strong, unique secret for production

## 🐛 If You Get CORS Errors:

1. Double-check FRONTEND_URL in backend environment variables
2. Make sure it matches exactly: `https://dev-agency-website.vercel.app`
3. Redeploy backend after changing environment variables

## ✅ Deployment Checklist:

- [ ] Backend deployed to Vercel
- [ ] All environment variables set in Vercel
- [ ] Frontend VITE_API_URL updated
- [ ] Frontend redeployed
- [ ] Database connection working
- [ ] CORS configured correctly
- [ ] Email service working
- [ ] User registration/login tested
