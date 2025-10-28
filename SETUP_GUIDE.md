# 🚀 Dev Agency Website - Complete Setup Guide

This guide will help you set up both the frontend and backend of the Dev Agency Website.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **pnpm** package manager
- A code editor (VS Code recommended)

## 🗄️ Database Setup

### 1. Create PostgreSQL Database

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE dev_agency;

-- Create user (optional)
CREATE USER dev_agency_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE dev_agency TO dev_agency_user;
```

### 2. Get Your Connection String

Your connection string should look like:
```
postgresql://username:password@localhost:5432/dev_agency
```

Or if using a cloud provider (Supabase, Neon, Railway, etc.), they will provide the connection string.

## 🔧 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual values:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration (IMPORTANT: Add your connection string here)
DATABASE_URL=postgresql://username:password@localhost:5432/dev_agency

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Email Configuration (for contact form notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=noreply@devagency.com
CONTACT_EMAIL=contact@devagency.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Email Setup (Gmail Example)

To use Gmail for sending emails:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the generated password
4. Use this App Password in your `.env` file as `EMAIL_PASSWORD`

### 5. Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ Database connection established successfully.
✅ Database models synchronized.
🚀 Server is running on port 3001
```

### 6. Test the API

Open your browser or use curl:
```bash
curl http://localhost:3001/api/health
```

You should get a response like:
```json
{
  "success": true,
  "status": "healthy",
  "database": "connected"
}
```

## 🎨 Frontend Setup

### 1. Navigate to Project Root

```bash
cd ..  # Go back to project root
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
# Backend API URL
VITE_API_URL=http://localhost:3001
```

### 4. Start the Frontend

```bash
npm run dev
# or
pnpm dev
```

The frontend will start on `http://localhost:8080` (or another port if 8080 is busy).

## 🧪 Testing the Complete Setup

### 1. Open the Website

Navigate to `http://localhost:8080` in your browser.

### 2. Test Contact Form

1. Scroll to the "Get In Touch" section
2. Fill out the contact form:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
3. Click "Send Message"
4. You should see a success toast notification
5. Check your email (configured as `CONTACT_EMAIL`) for the notification

### 3. Check Database

```sql
-- Connect to your database
psql -U postgres -d dev_agency

-- View contacts
SELECT * FROM contacts;
```

## 📁 Project Structure

```
Dev-Agency-Website/
├── backend/                    # Backend API
│   ├── config/
│   │   └── database.js        # Database configuration
│   ├── models/
│   │   ├── Contact.js         # Contact model
│   │   └── Project.js         # Project model
│   ├── routes/
│   │   ├── health.js          # Health check
│   │   ├── contact.js         # Contact routes
│   │   └── projects.js        # Project routes
│   ├── services/
│   │   └── emailService.js    # Email service
│   ├── .env                   # Environment variables (create this)
│   ├── .env.example           # Environment template
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Main server file
│   └── README.md              # Backend documentation
├── src/                       # Frontend source
│   ├── components/
│   │   └── ContactForm.tsx    # Contact form (updated)
│   └── ...
├── .env                       # Frontend env (create this)
├── .env.example               # Frontend env template
├── package.json               # Frontend dependencies
└── SETUP_GUIDE.md            # This file
```

## 🔍 Troubleshooting

### Backend Issues

**Database Connection Error:**
```
❌ Unable to connect to the database
```
- Check if PostgreSQL is running
- Verify your `DATABASE_URL` in `.env`
- Ensure the database exists
- Check username/password

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::3001
```
- Change `PORT` in backend `.env`
- Or kill the process: `npx kill-port 3001`

**Email Not Sending:**
- Verify email credentials in `.env`
- For Gmail, use App Password (not regular password)
- Check if 2FA is enabled on your Google account

### Frontend Issues

**API Connection Error:**
- Ensure backend is running on port 3001
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

**Form Not Submitting:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab to see API requests

## 🚀 Deployment

### Backend Deployment Options

1. **Railway** (Recommended)
   - Automatic PostgreSQL provisioning
   - Easy deployment from GitHub
   - Free tier available

2. **Heroku**
   - Add Heroku Postgres add-on
   - Deploy via Git

3. **DigitalOcean App Platform**
   - Managed PostgreSQL
   - Simple deployment

4. **Render**
   - Free PostgreSQL
   - Auto-deploy from Git

### Frontend Deployment Options

1. **Vercel** (Recommended for Vite/React)
2. **Netlify**
3. **Cloudflare Pages**
4. **GitHub Pages**

### Environment Variables for Production

**Backend:**
- Set `NODE_ENV=production`
- Use production database URL
- Update `FRONTEND_URL` to your production domain
- Use secure `JWT_SECRET`

**Frontend:**
- Update `VITE_API_URL` to your backend production URL

## 📚 API Documentation

### Contact Form Endpoint

**POST** `/api/contact`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to discuss a project",
  "phone": "+1234567890",  // optional
  "company": "Acme Inc"     // optional
}
```

Response:
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon.",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

For complete API documentation, see `backend/README.md`.

## 🔐 Security Notes

- Never commit `.env` files to Git
- Use strong passwords for database
- Generate secure random strings for `JWT_SECRET`
- Enable rate limiting in production
- Use HTTPS in production
- Keep dependencies updated

## 📞 Support

If you encounter any issues:
1. Check this guide thoroughly
2. Review the error messages
3. Check backend logs
4. Inspect browser console
5. Verify all environment variables

## 🎉 Next Steps

Once everything is working:

1. **Customize the contact form** - Add more fields if needed
2. **Add authentication** - Implement admin login
3. **Create admin panel** - Manage contacts and projects
4. **Add more features** - Newsletter, blog, etc.
5. **Deploy to production** - Make it live!

---

**Happy Coding! 🚀**
