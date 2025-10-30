# Backend Deployment Steps

## 🚀 Quick Deployment to Vercel

Since your database is already deployed with Neon, follow these steps:

### 1. Deploy Backend

```bash
cd backend
vercel --prod
```

### 2. Set Environment Variables in Vercel

After deployment, go to your backend project in Vercel Dashboard and add these environment variables:

#### Required Environment Variables:

```env
NODE_ENV=production
PORT=3000

# Database (Your Neon Connection)
DB_HOST=your-neon-host
DB_USER=your-neon-user
DB_PASSWORD=your-neon-password
DB_NAME=your-neon-database
DB_PORT=5432

# JWT Secret (Generate a strong one)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

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
