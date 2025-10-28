# ⚡ Quick Start Guide - Dev Agency Website

Get your Dev Agency website up and running in 5 minutes!

## 🎯 Prerequisites Checklist

- [ ] Node.js installed (v16+)
- [ ] PostgreSQL database ready
- [ ] Database connection string available
- [ ] Gmail account (for email notifications)

## 🚀 Quick Setup (5 Steps)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

Create `backend/.env` file:

```bash
# Copy the example file
cp .env.example .env
```

**Edit `backend/.env` and add your database connection string:**

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dev_agency
```

**Minimum required variables:**
- `DATABASE_URL` - Your PostgreSQL connection string
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASSWORD` - Gmail App Password (see below)

### Step 3: Setup Database

```bash
npm run setup-db
```

This will automatically create all tables, indexes, and sample data.

### Step 4: Start Backend Server

```bash
npm run dev
```

You should see:
```
✅ Database connection established successfully.
🚀 Server is running on port 3001
```

### Step 5: Start Frontend

Open a new terminal:

```bash
cd ..  # Go back to project root
npm install  # or pnpm install
npm run dev  # or pnpm dev
```

Visit: `http://localhost:8080`

## 🎉 That's It!

Your Dev Agency website is now running!

### Test the Contact Form:

1. Navigate to the contact section
2. Fill out the form
3. Click "Send Message"
4. Check your database: `SELECT * FROM contacts;`

## 📧 Gmail Setup (2 Minutes)

To enable email notifications:

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and your device
3. Copy the 16-character password
4. Add to `backend/.env`:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   EMAIL_FROM=noreply@devagency.com
   CONTACT_EMAIL=your_email@gmail.com
   ```

## 🔧 Common Issues

### "Database connection failed"
- Check if PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Ensure database exists

### "Port 3001 already in use"
```bash
# Kill the process
npx kill-port 3001
```

### "Email not sending"
- Use Gmail App Password (not regular password)
- Enable 2FA on Google account first

## 📁 Project Structure

```
Dev-Agency-Website/
├── backend/              # API Server
│   ├── .env             # ← Add your config here
│   ├── server.js        # Main server
│   ├── routes/          # API endpoints
│   ├── models/          # Database models
│   └── services/        # Business logic
├── src/                 # Frontend
│   └── components/
│       └── ContactForm.tsx  # Updated with API
└── .env                 # Frontend config (optional)
```

## 🌐 API Endpoints

Once running, test with:

```bash
# Health check
curl http://localhost:3001/api/health

# Submit contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello World!"}'
```

## 📚 Next Steps

- [ ] Customize the contact form
- [ ] Add your projects to the database
- [ ] Configure email settings
- [ ] Deploy to production

## 🆘 Need Help?

See the full documentation:
- `SETUP_GUIDE.md` - Detailed setup instructions
- `backend/README.md` - Backend API documentation
- `backend/database/schema.sql` - Database schema

## 🚀 Deployment

When ready to deploy:

1. **Backend**: Railway, Heroku, or DigitalOcean
2. **Frontend**: Vercel, Netlify, or Cloudflare Pages

Update environment variables for production!

---

**Happy Coding! 🎨**
