# Function Call - Vercel Deployment Guide

This guide will help you deploy both the frontend and backend of the Function Call Development Agency website to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally
   ```bash
   npm install -g vercel
   ```
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
4. **Database**: Set up a MySQL database (recommended: PlanetScale, Railway, or AWS RDS)

---

## 🎨 Frontend Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"

2. **Import Git Repository**
   - Connect your GitHub/GitLab/Bitbucket account
   - Select the `Dev-Agency-Website` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   Add the following environment variables:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be live at `https://your-project.vercel.app`

### Option 2: Deploy via CLI

```bash
# Navigate to project root
cd "c:\Users\USER\Desktop\Venda Dev Agency\Dev-Agency-Website"

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? function-call-agency
# - Directory? ./ (press Enter)
```

---

## 🔧 Backend Deployment

### Option 1: Deploy Backend to Vercel

1. **Create New Project for Backend**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import the same repository
   - Click "Import"

2. **Configure Backend Project**
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

3. **Environment Variables**
   Add all backend environment variables:
   ```
   NODE_ENV=production
   PORT=3000
   
   # Database Configuration
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=function_call_db
   DB_PORT=3306
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Email Configuration (Gmail SMTP)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=Function Call <your-email@gmail.com>
   
   # Frontend URL
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy Backend**
   - Click "Deploy"
   - Your API will be live at `https://your-backend.vercel.app`

### Option 2: Deploy Backend via CLI

```bash
# Navigate to backend directory
cd "c:\Users\USER\Desktop\Venda Dev Agency\Dev-Agency-Website\backend"

# Deploy
vercel --prod

# Follow the prompts
```

---

## 🗄️ Database Setup

### Option 1: PlanetScale (Recommended - Free Tier)

1. **Sign up**: [planetscale.com](https://planetscale.com)
2. **Create Database**:
   - Name: `function-call-db`
   - Region: Choose closest to your users
3. **Get Connection String**:
   - Go to "Connect" → "Node.js"
   - Copy the connection details
4. **Import Schema**:
   ```bash
   # Connect to PlanetScale
   pscale shell function-call-db main
   
   # Copy and paste the contents of backend/database/schema.sql
   ```

### Option 2: Railway (Easy Setup)

1. **Sign up**: [railway.app](https://railway.app)
2. **Create MySQL Database**:
   - Click "New Project" → "Provision MySQL"
3. **Get Connection Details**:
   - Click on MySQL service
   - Copy connection details from "Connect" tab
4. **Import Schema**:
   - Use MySQL Workbench or command line to import `backend/database/schema.sql`

### Option 3: AWS RDS (Production Grade)

1. Create RDS MySQL instance
2. Configure security groups
3. Import schema using MySQL client
4. Use connection details in environment variables

---

## 📧 Email Configuration (Gmail)

1. **Enable 2-Factor Authentication**:
   - Go to Google Account settings
   - Enable 2FA

2. **Generate App Password**:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other"
   - Name it "Function Call"
   - Copy the 16-character password

3. **Add to Environment Variables**:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

---

## 🔗 Connecting Frontend to Backend

After both deployments:

1. **Update Frontend Environment Variable**:
   - Go to your frontend project in Vercel
   - Settings → Environment Variables
   - Update `VITE_API_URL` to your backend URL:
     ```
     VITE_API_URL=https://your-backend.vercel.app
     ```

2. **Update Backend CORS**:
   - Go to your backend project in Vercel
   - Settings → Environment Variables
   - Update `FRONTEND_URL`:
     ```
     FRONTEND_URL=https://your-frontend.vercel.app
     ```

3. **Redeploy Both Projects**:
   - Frontend: Deployments → Click "..." → Redeploy
   - Backend: Deployments → Click "..." → Redeploy

---

## 🎯 Custom Domain (Optional)

### Add Custom Domain to Frontend

1. **Go to Project Settings**:
   - Select your frontend project
   - Go to "Domains"

2. **Add Domain**:
   - Enter your domain (e.g., `functioncall.com`)
   - Follow DNS configuration instructions

3. **Configure DNS**:
   - Add CNAME record:
     ```
     Type: CNAME
     Name: www (or @)
     Value: cname.vercel-dns.com
     ```

4. **SSL Certificate**:
   - Vercel automatically provisions SSL
   - Wait a few minutes for activation

### Add Custom Domain to Backend

1. **Add Subdomain for API**:
   - Go to backend project → Domains
   - Add `api.functioncall.com`
   - Configure DNS with CNAME record

---

## ✅ Post-Deployment Checklist

- [ ] Frontend is live and accessible
- [ ] Backend API is responding
- [ ] Database connection is working
- [ ] Email notifications are sending
- [ ] User registration works
- [ ] User login works
- [ ] Service requests can be created
- [ ] Admin panel is accessible
- [ ] All environment variables are set
- [ ] CORS is properly configured
- [ ] SSL certificates are active

---

## 🧪 Testing Your Deployment

### Test Frontend
```bash
# Visit your frontend URL
https://your-project.vercel.app

# Test pages:
- Homepage
- About
- Services
- Projects
- Contact
- Login/Signup
```

### Test Backend API
```bash
# Health check
curl https://your-backend.vercel.app/health

# Test API endpoint
curl https://your-backend.vercel.app/api/health
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Build Fails**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

**Blank Page**:
- Check browser console for errors
- Verify `VITE_API_URL` environment variable
- Check if assets are loading

**404 Errors**:
- Ensure `vercel.json` has proper rewrites
- Check that routes are configured correctly

### Backend Issues

**API Not Responding**:
- Check function logs in Vercel dashboard
- Verify all environment variables are set
- Check database connection

**Database Connection Failed**:
- Verify database credentials
- Check if database allows external connections
- Ensure IP whitelist includes Vercel IPs

**CORS Errors**:
- Verify `FRONTEND_URL` environment variable
- Check CORS configuration in `server.js`
- Ensure credentials are properly set

---

## 📊 Monitoring

### Vercel Analytics
- Go to Project → Analytics
- Monitor page views, performance, and errors

### Function Logs
- Go to Project → Deployments → Select deployment
- Click "View Function Logs"
- Monitor API requests and errors

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your Git repository:

1. **Production Branch**: `main` or `master`
   - Automatic deployment to production URL

2. **Preview Branches**: Any other branch
   - Automatic preview deployments
   - Unique URL for each branch

3. **Pull Requests**:
   - Automatic preview deployments
   - Comment with preview URL

---

## 💰 Pricing

### Vercel Free Tier Includes:
- Unlimited deployments
- 100GB bandwidth/month
- Serverless function execution
- Automatic SSL
- Custom domains

### Upgrade if needed:
- More bandwidth
- More function execution time
- Team collaboration features
- Advanced analytics

---

## 📞 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## 🚀 Quick Deploy Commands

```bash
# Frontend
cd "c:\Users\USER\Desktop\Venda Dev Agency\Dev-Agency-Website"
vercel --prod

# Backend
cd "c:\Users\USER\Desktop\Venda Dev Agency\Dev-Agency-Website\backend"
vercel --prod
```

---

**Your Function Call Development Agency website is now ready for deployment! 🎉**
