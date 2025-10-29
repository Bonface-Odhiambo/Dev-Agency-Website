# 🗄️ How to Get Your DATABASE_URL from Neon

## What is DATABASE_URL?

`DATABASE_URL` is a PostgreSQL connection string that contains all the information needed to connect to your database:

```
postgresql://username:password@host:port/database?sslmode=require
```

## 📍 Step-by-Step Guide

### Option 1: Get from Neon Console (Recommended)

1. **Go to Neon Console**
   - Visit: https://console.neon.tech
   - Log in to your account

2. **Select Your Project**
   - Click on your project name
   - Or create a new project if you don't have one

3. **Find Connection Details**
   - Look for "Connection Details" section
   - Or click on "Dashboard" → "Connection Details"

4. **Copy Connection String**
   - You'll see different connection options
   - Look for "Connection String" or "Pooled Connection"
   - It will look like:
     ```
     postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
     ```
   - Click "Copy" button

5. **Add to Vercel**
   - Go to Vercel Dashboard
   - Your Backend Project → Settings → Environment Variables
   - Add new variable:
     - **Name**: `DATABASE_URL`
     - **Value**: Paste the connection string
     - **Environment**: Production (and Preview if needed)
   - Click "Save"

### Option 2: Construct Manually

If you have individual database credentials:

```
postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?sslmode=require
```

**Example**:
```
postgresql://myuser:mypassword@ep-cool-name-123456.us-east-2.aws.neon.tech:5432/neondb?sslmode=require
```

**Components**:
- `USERNAME`: Your database username (usually shown in Neon dashboard)
- `PASSWORD`: Your database password (from Neon)
- `HOST`: Your Neon endpoint (e.g., `ep-cool-name-123456.us-east-2.aws.neon.tech`)
- `PORT`: Usually `5432` for PostgreSQL
- `DATABASE`: Usually `neondb` or your custom database name
- `?sslmode=require`: Required for secure connection

## 🔍 Finding Individual Components in Neon

If you need to find individual parts:

1. **Username**:
   - Neon Dashboard → Project → Connection Details
   - Look for "User" or "Role"
   - Usually in format: `username` or `neondb_owner`

2. **Password**:
   - You set this when creating the project
   - If forgotten, you can reset it in Neon Dashboard
   - Settings → Reset Password

3. **Host**:
   - Neon Dashboard → Connection Details
   - Look for "Host" or "Endpoint"
   - Format: `ep-xxxxx.region.aws.neon.tech`

4. **Database Name**:
   - Usually `neondb` (default)
   - Or your custom database name
   - Found in Connection Details

## ✅ Verify Your DATABASE_URL

Test your connection string locally before deploying:

### Method 1: Using Node.js

Create a test file `test-db.js`:

```javascript
import { Sequelize } from 'sequelize';

const DATABASE_URL = 'your-connection-string-here';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
```

Run it:
```bash
node test-db.js
```

### Method 2: Using psql (PostgreSQL CLI)

```bash
psql "postgresql://username:password@host:port/database?sslmode=require"
```

If it connects, your DATABASE_URL is correct!

## 🚨 Common Issues

### Issue 1: "Connection Refused"
**Cause**: Wrong host or port
**Fix**: Double-check the host from Neon dashboard

### Issue 2: "Authentication Failed"
**Cause**: Wrong username or password
**Fix**: Reset password in Neon dashboard

### Issue 3: "SSL Required"
**Cause**: Missing `?sslmode=require`
**Fix**: Add `?sslmode=require` at the end of the URL

### Issue 4: "Database Does Not Exist"
**Cause**: Wrong database name
**Fix**: Check database name in Neon dashboard (usually `neondb`)

### Issue 5: "Timeout"
**Cause**: Firewall or network issue
**Fix**: 
- Check if Neon project is active
- Verify your IP is allowed (Neon allows all by default)
- Check your internet connection

## 📋 Example DATABASE_URLs

### Neon (Recommended for Vercel)
```
postgresql://alex:AbC123xyz@ep-cool-breeze-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Supabase
```
postgresql://postgres:password@db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

### Railway
```
postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway
```

### Local PostgreSQL
```
postgresql://localhost:5432/mydb
```

## 🔐 Security Best Practices

1. **Never commit DATABASE_URL to Git**
   - Always use environment variables
   - Add `.env` to `.gitignore`

2. **Use different databases for dev/prod**
   - Development: Local or separate Neon project
   - Production: Production Neon project

3. **Rotate passwords regularly**
   - Change password every 3-6 months
   - Update in Vercel after rotation

4. **Use connection pooling**
   - Already configured in `config/database.js`
   - Prevents too many connections

5. **Monitor database usage**
   - Check Neon dashboard for usage
   - Set up alerts for high usage

## 🎯 Quick Reference

**Format**:
```
postgresql://[user]:[pass]@[host]:[port]/[db]?sslmode=require
```

**Where to add in Vercel**:
1. Vercel Dashboard
2. Your Backend Project
3. Settings → Environment Variables
4. Add `DATABASE_URL` → Paste value → Save

**How to test**:
```bash
# In backend directory
node test-db.js
```

## 📞 Need Help?

If you're still having issues:

1. Check Neon status: https://neon.tech/status
2. Verify your Neon project is active
3. Try creating a new database in Neon
4. Contact Neon support: https://neon.tech/docs/introduction/support

## ✨ Next Steps

After getting your DATABASE_URL:

1. ✅ Add to Vercel environment variables
2. ✅ Test connection locally
3. ✅ Deploy backend to Vercel
4. ✅ Test `/api/health` endpoint
5. ✅ Update frontend with backend URL
