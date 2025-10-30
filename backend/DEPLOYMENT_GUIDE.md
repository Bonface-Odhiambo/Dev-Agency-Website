# Backend Deployment Guide - Vercel

## 📋 Overview
This guide will help you deploy the Dev Agency Backend API to Vercel as a serverless function.

---

## 🚀 Quick Deployment Steps

### **1. Prerequisites**
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Vercel CLI installed: `npm install -g vercel`
- ✅ PostgreSQL database (Supabase, Neon, or other)
- ✅ All environment variables ready

---

### **2. Environment Variables Setup**

Before deploying, you need to set up these environment variables in Vercel:

#### **Required Variables:**
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Frontend URL
FRONTEND_URL=https://dev-agency-website.vercel.app

# Session Secret
SESSION_SECRET=your-session-secret-key

# Node Environment
NODE_ENV=production
```

#### **Optional Variables:**
```env
# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Email (if using email features)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@devagency.com
```

---

### **3. Deploy to Vercel**

#### **Option A: Using Vercel CLI (Recommended)**

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? **Select your account**
   - Link to existing project? **No** (first time) or **Yes** (re-deploy)
   - What's your project's name? **dev-agency-backend**
   - In which directory is your code located? **./backend** or **./** (if already in backend folder)

5. **Add Environment Variables:**
   ```bash
   vercel env add DATABASE_URL production
   vercel env add JWT_SECRET production
   vercel env add FRONTEND_URL production
   vercel env add SESSION_SECRET production
   ```

   Or add them via Vercel Dashboard:
   - Go to your project settings
   - Click "Environment Variables"
   - Add each variable

6. **Redeploy after adding variables:**
   ```bash
   vercel --prod
   ```

#### **Option B: Using Vercel Dashboard**

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"

2. **Import Git Repository:**
   - Connect your GitHub/GitLab/Bitbucket
   - Select your repository
   - Select the `backend` directory as the root

3. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** Leave empty (serverless)
   - **Output Directory:** Leave empty

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add all required variables from above
   - Make sure to select "Production" environment

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

---

### **4. Database Setup**

Your PostgreSQL database needs to have all tables created. Run these SQL files in order:

```bash
# 1. Create users and authentication tables
psql $DATABASE_URL -f database/create_users.sql

# 2. Create service requests table
psql $DATABASE_URL -f database/create_service_requests.sql

# 3. Create notifications table
psql $DATABASE_URL -f database/create_notifications.sql

# 4. Create contact messages table
psql $DATABASE_URL -f database/create_contact_messages.sql

# 5. Create projects table (if exists)
psql $DATABASE_URL -f database/create_projects.sql
```

**Or use a database GUI:**
- Supabase SQL Editor
- pgAdmin
- TablePlus
- DBeaver

---

### **5. Verify Deployment**

After deployment, test your API:

1. **Check Health Endpoint:**
   ```bash
   curl https://your-backend.vercel.app/api/health
   ```

   Expected response:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-10-30T10:00:00.000Z",
     "database": "connected"
   }
   ```

2. **Check Root Endpoint:**
   ```bash
   curl https://your-backend.vercel.app/
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

3. **Test CORS:**
   ```bash
   curl -H "Origin: https://dev-agency-website.vercel.app" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS \
        https://your-backend.vercel.app/api/auth/login
   ```

---

### **6. Update Frontend Configuration**

After deploying the backend, update your frontend environment variables:

**File:** `.env` or `.env.production`
```env
VITE_API_URL=https://your-backend.vercel.app
```

Or in Vercel Dashboard (Frontend Project):
- Go to Settings → Environment Variables
- Update `VITE_API_URL` to your backend URL
- Redeploy frontend

---

## 🔧 Configuration Files

### **vercel.json**
```json
{
  "version": 2,
  "name": "dev-agency-backend",
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "regions": ["iad1"]
}
```

### **api/index.js**
This is the serverless entry point that:
- Initializes Express app
- Sets up CORS for allowed origins
- Configures all routes
- Handles database connection
- Exports handler for Vercel

---

## 🌐 CORS Configuration

The backend allows requests from:
- `http://localhost:8080` (local development)
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (React default)
- `https://dev-agency-website.vercel.app` (production frontend)
- Any URL set in `FRONTEND_URL` environment variable

To add more origins, edit `api/index.js`:
```javascript
const allowedOrigins = [
  'http://localhost:8080',
  'https://your-custom-domain.com',
  // ... add more
];
```

---

## 📊 API Endpoints

After deployment, your API will have these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API info and status |
| `/api/health` | GET | Health check |
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/auth/logout` | POST | User logout |
| `/api/auth/me` | GET | Get current user |
| `/api/users` | GET | Get all users (admin) |
| `/api/users/:id` | GET | Get user by ID |
| `/api/users/export/excel` | GET | Export users to Excel |
| `/api/contact` | POST | Submit contact form |
| `/api/contact` | GET | Get all messages (admin) |
| `/api/contact/:id` | GET | Get message details |
| `/api/contact/:id/status` | PATCH | Update message status |
| `/api/service-requests` | POST | Create service request |
| `/api/service-requests` | GET | Get all requests |
| `/api/service-requests/:id` | GET | Get request details |
| `/api/service-requests/:id` | PATCH | Update request |
| `/api/notifications` | GET | Get user notifications |
| `/api/notifications/:id/read` | PATCH | Mark as read |

---

## 🔒 Security Checklist

Before going to production:

- [ ] Set strong `JWT_SECRET` (min 32 characters)
- [ ] Set strong `SESSION_SECRET`
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS only (Vercel does this automatically)
- [ ] Configure proper CORS origins
- [ ] Set up rate limiting (already configured)
- [ ] Use secure database connection (SSL)
- [ ] Review and test all API endpoints
- [ ] Set up monitoring and logging
- [ ] Configure proper error handling

---

## 🐛 Troubleshooting

### **Issue: Database Connection Failed**
**Solution:**
- Check `DATABASE_URL` is correct
- Ensure database allows connections from Vercel IPs
- For Supabase: Use "Connection Pooling" URL
- For Neon: Enable "Pooled connection"

### **Issue: CORS Errors**
**Solution:**
- Add your frontend URL to `allowedOrigins` in `api/index.js`
- Redeploy backend
- Clear browser cache

### **Issue: 404 on API Routes**
**Solution:**
- Check `vercel.json` routes configuration
- Ensure all routes start with `/api/`
- Verify deployment logs in Vercel dashboard

### **Issue: Environment Variables Not Working**
**Solution:**
- Add variables in Vercel Dashboard → Settings → Environment Variables
- Select "Production" environment
- Redeploy after adding variables

### **Issue: Function Timeout**
**Solution:**
- Optimize database queries
- Add indexes to frequently queried columns
- Use connection pooling
- Consider upgrading Vercel plan for longer timeouts

---

## 📈 Monitoring & Logs

### **View Logs:**
1. Go to Vercel Dashboard
2. Select your backend project
3. Click "Deployments"
4. Click on a deployment
5. Click "Functions" tab
6. View real-time logs

### **Set Up Monitoring:**
- Use Vercel Analytics (built-in)
- Set up error tracking (Sentry, LogRocket)
- Monitor database performance
- Set up uptime monitoring (UptimeRobot, Pingdom)

---

## 🔄 Continuous Deployment

### **Automatic Deployments:**
When you push to your Git repository:
- **Main/Master branch** → Production deployment
- **Other branches** → Preview deployments

### **Manual Deployments:**
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] All environment variables set
- [ ] Database tables created
- [ ] Health check endpoint working
- [ ] CORS configured correctly
- [ ] Frontend updated with backend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test contact form submission
- [ ] Test admin panel access
- [ ] Test all API endpoints
- [ ] Monitor logs for errors
- [ ] Set up error alerts

---

## 🎯 Production URLs

After deployment, you'll have:

**Backend API:**
```
https://dev-agency-backend.vercel.app
https://dev-agency-backend-[username].vercel.app
```

**Frontend:**
```
https://dev-agency-website.vercel.app
```

**Custom Domain (Optional):**
```
https://api.yourdomain.com → Backend
https://yourdomain.com → Frontend
```

To add custom domain:
1. Go to Vercel Dashboard
2. Select project
3. Settings → Domains
4. Add your domain
5. Configure DNS records

---

## 💡 Tips & Best Practices

1. **Use Environment Variables:**
   - Never hardcode secrets
   - Use different values for dev/prod

2. **Database Connection:**
   - Use connection pooling
   - Close connections properly
   - Handle connection errors

3. **Error Handling:**
   - Log all errors
   - Return user-friendly messages
   - Don't expose sensitive info

4. **Performance:**
   - Enable compression (already configured)
   - Use caching where appropriate
   - Optimize database queries

5. **Security:**
   - Keep dependencies updated
   - Use helmet for security headers
   - Implement rate limiting
   - Validate all inputs

---

## 🆘 Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Node.js on Vercel:** https://vercel.com/docs/runtimes/node-js
- **Serverless Functions:** https://vercel.com/docs/functions/serverless-functions

---

## ✅ Summary

Your backend is now ready for deployment! Follow these steps:

1. ✅ Set up environment variables in Vercel
2. ✅ Run database migrations
3. ✅ Deploy using `vercel --prod`
4. ✅ Test all endpoints
5. ✅ Update frontend with backend URL
6. ✅ Monitor logs and errors

**Your API will be live at:** `https://your-backend.vercel.app` 🚀

---

**Created:** October 2024  
**Last Updated:** October 2024  
**Status:** ✅ Ready for Production
