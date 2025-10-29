# Pre-Deployment Checklist ✅

Complete this checklist before deploying to Vercel.

## 📦 Code Preparation

### Frontend
- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings fixed
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview works locally (`npm run preview`)
- [ ] All routes tested and working
- [ ] All images and assets loading correctly
- [ ] No console errors in browser
- [ ] Mobile responsive design verified

### Backend
- [ ] All API endpoints tested
- [ ] Database schema is up to date
- [ ] All environment variables documented
- [ ] Error handling implemented
- [ ] CORS configured correctly
- [ ] Authentication working properly
- [ ] Email service tested

## 🗄️ Database Setup

- [ ] Database created (PlanetScale/Railway/AWS RDS)
- [ ] Schema imported successfully
- [ ] Test data added (optional)
- [ ] Connection string obtained
- [ ] Database accessible from external IPs
- [ ] Backup strategy in place

## 📧 Email Configuration

- [ ] Gmail account ready
- [ ] 2-Factor Authentication enabled
- [ ] App password generated
- [ ] Test email sent successfully
- [ ] Email templates reviewed
- [ ] Sender email verified

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.vercel.app
```

### Backend (.env)
```env
NODE_ENV=production
PORT=3000

# Database
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=function_call_db
DB_PORT=3306

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=Function Call <your-email@gmail.com>

# Frontend
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## 🔧 Configuration Files

- [ ] `vercel.json` exists in root directory
- [ ] `.vercelignore` exists in root directory
- [ ] `backend/vercel.json` exists
- [ ] `.env.example` updated with all variables
- [ ] `backend/.env.example` updated

## 🧪 Testing

### Frontend Tests
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Login/Signup functional
- [ ] Dashboard accessible after login
- [ ] Service request form works
- [ ] Admin panel accessible (for admins)
- [ ] Contact form sends emails
- [ ] All project detail pages load
- [ ] Terms & Privacy pages accessible

### Backend Tests
- [ ] Health endpoint responds (`/health`)
- [ ] User registration works
- [ ] User login works
- [ ] JWT tokens generated correctly
- [ ] Service requests can be created
- [ ] Admin endpoints secured
- [ ] Email notifications sent
- [ ] Database queries working

## 🔒 Security

- [ ] JWT secret is strong and unique
- [ ] Database password is strong
- [ ] No sensitive data in Git repository
- [ ] `.env` files in `.gitignore`
- [ ] CORS properly configured
- [ ] SQL injection prevention in place
- [ ] XSS protection enabled
- [ ] Rate limiting configured

## 📱 Performance

- [ ] Images optimized
- [ ] Lazy loading implemented where needed
- [ ] Bundle size acceptable
- [ ] No memory leaks
- [ ] Database queries optimized
- [ ] API response times acceptable

## 🌐 Domain & DNS (Optional)

- [ ] Domain purchased
- [ ] DNS records ready to configure
- [ ] SSL certificate will auto-provision
- [ ] Subdomain for API planned (api.yourdomain.com)

## 📊 Monitoring Setup

- [ ] Vercel Analytics enabled
- [ ] Error tracking configured
- [ ] Function logs accessible
- [ ] Database monitoring enabled

## 🚀 Deployment Accounts

- [ ] Vercel account created
- [ ] Git repository ready (GitHub/GitLab/Bitbucket)
- [ ] Database hosting account created
- [ ] Email account configured

## 📝 Documentation

- [ ] README.md updated
- [ ] API documentation complete
- [ ] Deployment guide reviewed
- [ ] Environment variables documented
- [ ] Admin credentials documented (securely)

## 🔄 Post-Deployment Plan

- [ ] Frontend URL noted
- [ ] Backend URL noted
- [ ] Database connection verified
- [ ] Test user account created
- [ ] Admin account created
- [ ] Email notifications tested
- [ ] All features tested in production
- [ ] Performance monitored
- [ ] Errors checked in logs

## ⚠️ Common Issues to Avoid

1. **Environment Variables**: Make sure ALL environment variables are set in Vercel
2. **CORS**: Ensure FRONTEND_URL matches your actual frontend URL
3. **Database**: Verify database allows external connections
4. **Build Errors**: Test build locally before deploying
5. **API URL**: Update VITE_API_URL after backend deployment
6. **Email**: Use app password, not regular Gmail password
7. **JWT Secret**: Use a strong, unique secret in production

## 📞 Support Resources

- Vercel Documentation: https://vercel.com/docs
- PlanetScale Docs: https://planetscale.com/docs
- Railway Docs: https://docs.railway.app
- Node.js Docs: https://nodejs.org/docs

---

## Quick Deployment Commands

```bash
# Frontend Deployment
cd "c:\Users\USER\Desktop\Venda Dev Agency\Dev-Agency-Website"
vercel --prod

# Backend Deployment
cd "c:\Users\USER\Desktop\Venda Dev Agency\Dev-Agency-Website\backend"
vercel --prod
```

---

**Once all items are checked, you're ready to deploy! 🚀**
