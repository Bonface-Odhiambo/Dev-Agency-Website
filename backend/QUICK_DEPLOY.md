# Quick Deploy Guide - Backend to Vercel

## ⚡ Fast Track Deployment

### Method 1: Vercel Dashboard (Easiest - Recommended)

1. **Go to:** https://vercel.com/dashboard
2. **Click:** "Add New..." → "Project"
3. **Import:** Your Git repository
4. **Configure:**
   - Root Directory: `backend`
   - Framework: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. **Add Environment Variables:**
   ```
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_secret_min_32_chars
   SESSION_SECRET=your_session_secret
   FRONTEND_URL=https://dev-agency-frontend-six.vercel.app
   NODE_ENV=production
   ```
6. **Click:** Deploy
7. **Wait:** 2-3 minutes
8. **Copy:** Deployment URL
9. **Update Frontend:** Set `VITE_API_URL` to backend URL
10. **Redeploy Frontend**

---

### Method 2: Vercel CLI

```bash
cd backend
vercel --prod
```

Follow prompts:
- Project name: `dev-agency-backend`
- Directory: `./` (current)

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed successfully
- [ ] Copy deployment URL
- [ ] Test: `curl https://your-backend.vercel.app/api/health`
- [ ] Should return: `{"status":"ok"}`
- [ ] Update frontend `VITE_API_URL` in Vercel settings
- [ ] Redeploy frontend
- [ ] Test login from frontend
- [ ] No CORS errors ✅

---

## 🔧 If Deployment Fails

1. **Check Build Logs** in Vercel Dashboard
2. **Verify Environment Variables** are set
3. **Check Database URL** is correct
4. **Read:** `DEPLOYMENT_STEPS_FIXED.md` for detailed troubleshooting

---

## 📝 Files Updated

- ✅ `vercel.json` - Simplified config
- ✅ `api/index.js` - Enhanced CORS
- ✅ `index.js` - Root fallback
- ✅ `.vercelignore` - Exclude unnecessary files

---

**Ready to deploy!** 🚀
