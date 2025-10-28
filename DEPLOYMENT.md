# 🚀 Deployment Guide - Dev Agency Website

Complete guide for deploying your Dev Agency website to production.

## 📋 Pre-Deployment Checklist

- [ ] Backend tested locally
- [ ] Frontend tested locally
- [ ] Database schema finalized
- [ ] Environment variables documented
- [ ] Email service configured
- [ ] API endpoints tested
- [ ] Security settings reviewed

## 🗄️ Database Deployment

### Option 1: Railway (Recommended)

**Pros**: Free PostgreSQL, automatic backups, easy setup

1. Sign up at [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL service
4. Copy connection string from Variables tab
5. Use this in your backend `.env`

### Option 2: Supabase

**Pros**: Free tier, built-in auth, real-time features

1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy connection string (use "Connection pooling" for production)
5. Run your schema: `psql -h <host> -U postgres -d postgres -f backend/database/schema.sql`

### Option 3: Neon

**Pros**: Serverless PostgreSQL, generous free tier

1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Enable connection pooling for better performance

### Option 4: DigitalOcean Managed Database

**Pros**: Reliable, good performance, managed backups

1. Create Managed PostgreSQL database
2. Configure firewall rules
3. Copy connection string
4. Add to your backend environment

## 🖥️ Backend Deployment

### Option 1: Railway (Recommended)

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
cd backend
railway init

# 4. Add environment variables
railway variables set DATABASE_URL="your_connection_string"
railway variables set NODE_ENV="production"
railway variables set JWT_SECRET="your_secure_secret"
railway variables set EMAIL_USER="your_email@gmail.com"
railway variables set EMAIL_PASSWORD="your_app_password"
railway variables set FRONTEND_URL="https://your-frontend-url.com"

# 5. Deploy
railway up
```

### Option 2: Heroku

```bash
# 1. Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Create app
cd backend
heroku create your-app-name

# 4. Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# 5. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secure_secret
heroku config:set EMAIL_USER=your_email@gmail.com
heroku config:set EMAIL_PASSWORD=your_app_password
heroku config:set FRONTEND_URL=https://your-frontend-url.com

# 6. Deploy
git push heroku main
```

### Option 3: DigitalOcean App Platform

1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect your GitHub repository
4. Select `backend` as source directory
5. Configure build settings:
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`
6. Add environment variables in Settings
7. Deploy

### Option 4: Render

1. Go to [render.com](https://render.com)
2. Click "New +" > "Web Service"
3. Connect your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables
6. Deploy

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended for Vite/React)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Add environment variable
vercel env add VITE_API_URL production
# Enter your backend URL: https://your-backend-url.com

# 4. Deploy to production
vercel --prod
```

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Framework: Vite
4. Add environment variable: `VITE_API_URL`
5. Deploy

### Option 2: Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Initialize
netlify init

# 4. Deploy
netlify deploy --prod
```

**Configure environment:**
1. Go to Site settings > Environment variables
2. Add `VITE_API_URL` with your backend URL

### Option 3: Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect your repository
3. Build settings:
   - **Build command**: `npm run build`
   - **Build output**: `dist`
4. Add environment variable: `VITE_API_URL`
5. Deploy

## 🔐 Production Environment Variables

### Backend (`.env`)

```env
# Server
PORT=3001
NODE_ENV=production

# Database (from your provider)
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# Security (generate strong random strings)
JWT_SECRET=your_very_long_random_secret_key_here_at_least_32_chars

# Email (Gmail App Password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
EMAIL_FROM=noreply@devagency.com
CONTACT_EMAIL=contact@devagency.com

# Frontend URL (your deployed frontend)
FRONTEND_URL=https://your-frontend-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (`.env`)

```env
VITE_API_URL=https://your-backend-domain.com
```

## 🔒 Security Checklist

### Backend Security

- [ ] Use HTTPS only (no HTTP)
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (32+ characters)
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Use environment variables (never hardcode secrets)
- [ ] Enable database SSL
- [ ] Keep dependencies updated
- [ ] Use security headers (Helmet)
- [ ] Validate all inputs
- [ ] Sanitize database queries

### Frontend Security

- [ ] Use HTTPS
- [ ] Set proper CSP headers
- [ ] Validate user inputs
- [ ] Use environment variables for API URLs
- [ ] Enable CORS only for your domain
- [ ] Keep dependencies updated

## 🔍 Post-Deployment Testing

### 1. Test Backend Health

```bash
curl https://your-backend-url.com/api/health
```

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "database": "connected"
}
```

### 2. Test Contact Form

```bash
curl -X POST https://your-backend-url.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing production deployment"
  }'
```

### 3. Test Frontend

1. Visit your frontend URL
2. Navigate through all pages
3. Submit contact form
4. Check email notifications
5. Test on mobile devices
6. Check browser console for errors

## 📊 Monitoring & Maintenance

### Set Up Monitoring

1. **Backend Monitoring**:
   - Railway: Built-in metrics
   - Heroku: Heroku Metrics
   - DigitalOcean: App Platform Insights
   - External: [UptimeRobot](https://uptimerobot.com), [Pingdom](https://pingdom.com)

2. **Error Tracking**:
   - [Sentry](https://sentry.io) - Error tracking
   - [LogRocket](https://logrocket.com) - Session replay

3. **Analytics**:
   - Google Analytics
   - Plausible Analytics
   - Umami

### Database Backups

- **Railway**: Automatic daily backups
- **Supabase**: Automatic backups (paid plans)
- **Heroku**: `heroku pg:backups:schedule`
- **DigitalOcean**: Configure in database settings

### Regular Maintenance

- [ ] Monitor error logs weekly
- [ ] Check database performance monthly
- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Test backups quarterly
- [ ] Review and archive old contacts

## 🚨 Troubleshooting

### Backend Issues

**Database Connection Errors:**
```
Error: connect ECONNREFUSED
```
- Check DATABASE_URL is correct
- Verify database is running
- Check firewall rules
- Ensure SSL is configured

**CORS Errors:**
```
Access-Control-Allow-Origin error
```
- Update `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `server.js`

**Email Not Sending:**
- Verify Gmail App Password
- Check email credentials
- Review email service logs

### Frontend Issues

**API Connection Failed:**
- Check `VITE_API_URL` is correct
- Verify backend is running
- Check CORS settings
- Review browser console

**Build Failures:**
- Clear cache: `rm -rf node_modules dist`
- Reinstall: `npm install`
- Check Node.js version

## 📈 Scaling Considerations

### When to Scale

- Response time > 500ms
- Database CPU > 80%
- Memory usage > 80%
- Error rate > 1%

### Scaling Options

1. **Vertical Scaling**: Upgrade server resources
2. **Horizontal Scaling**: Add more servers
3. **Database Scaling**: Connection pooling, read replicas
4. **CDN**: Cloudflare, AWS CloudFront
5. **Caching**: Redis for API responses

## 🎯 Performance Optimization

### Backend

- Enable compression
- Use connection pooling
- Add database indexes
- Implement caching (Redis)
- Optimize database queries
- Use CDN for static assets

### Frontend

- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization
- Enable service workers
- Use CDN

## 📞 Support Resources

- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Heroku**: [devcenter.heroku.com](https://devcenter.heroku.com)
- **PostgreSQL**: [postgresql.org/docs](https://www.postgresql.org/docs/)

---

## 🎉 Deployment Complete!

Your Dev Agency website is now live! 🚀

**Next Steps:**
1. Set up monitoring
2. Configure backups
3. Add custom domain
4. Set up SSL certificate
5. Configure email DNS records (SPF, DKIM)
6. Submit to search engines

**Remember:**
- Keep dependencies updated
- Monitor error logs
- Test regularly
- Backup frequently

---

**Need help?** Check our other documentation:
- [README.md](./README.md)
- [QUICK_START.md](./QUICK_START.md)
- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
