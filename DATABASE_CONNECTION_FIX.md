# 🔧 Database Connection Error - Quick Fix Guide

## Problem
Your backend server is crashing with:
```
ConnectionError [SequelizeConnectionError]: Connection terminated unexpectedly
```

This means the backend cannot connect to your PostgreSQL database.

---

## ✅ Solution Steps

### Step 1: Check if PostgreSQL is Running

**Windows:**
```powershell
# Check if PostgreSQL service is running
Get-Service -Name postgresql*

# Or check with:
pg_ctl status
```

**If PostgreSQL is not running, start it:**
```powershell
# Start PostgreSQL service
Start-Service postgresql-x64-14  # Replace with your version

# Or use pg_ctl:
pg_ctl start -D "C:\Program Files\PostgreSQL\14\data"
```

---

### Step 2: Verify Your Database Exists

**Option A: Using pgAdmin**
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Check if `kalocode_db` database exists
4. If not, create it:
   - Right-click "Databases" → Create → Database
   - Name: `kalocode_db`

**Option B: Using Command Line**
```bash
# Connect to PostgreSQL
psql -U postgres

# List all databases
\l

# Create database if it doesn't exist
CREATE DATABASE kalocode_db;

# Exit
\q
```

---

### Step 3: Update Your .env File

Your backend `.env` file should have the correct `DATABASE_URL`:

**Location:** `backend/.env`

```env
# Update this line with your actual PostgreSQL credentials:
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/kalocode_db

# Replace:
# - postgres: your PostgreSQL username
# - your_password: your PostgreSQL password
# - localhost: your database host (usually localhost)
# - 5432: PostgreSQL port (default is 5432)
# - kalocode_db: your database name
```

**Example with actual values:**
```env
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/kalocode_db
```

---

### Step 4: Test Database Connection

Create a test script to verify connection:

**File:** `backend/test-db-connection.js`
```javascript
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    console.log('Database:', process.env.DATABASE_URL.split('/').pop());
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\nCheck:');
    console.error('1. PostgreSQL is running');
    console.error('2. DATABASE_URL is correct in .env');
    console.error('3. Database exists');
    console.error('4. Username and password are correct');
    process.exit(1);
  }
}

testConnection();
```

**Run the test:**
```bash
cd backend
node test-db-connection.js
```

---

### Step 5: Setup Database Tables

Once connection works, run the database setup:

```bash
cd backend
npm run setup-db
```

This will create all necessary tables (users, sessions, contacts, projects, etc.)

---

## 🔍 Common Issues & Solutions

### Issue 1: "password authentication failed"
**Solution:** Wrong password in DATABASE_URL
- Check your PostgreSQL password
- Update `DATABASE_URL` in `backend/.env`

### Issue 2: "database does not exist"
**Solution:** Create the database
```sql
CREATE DATABASE kalocode_db;
```

### Issue 3: "Connection refused" or "ECONNREFUSED"
**Solution:** PostgreSQL is not running
- Start PostgreSQL service
- Check if port 5432 is available

### Issue 4: "Connection terminated unexpectedly"
**Solution:** Database connection dropped
- Restart PostgreSQL service
- Check PostgreSQL logs for errors
- Increase connection pool timeout in `config/database.js`

### Issue 5: "role does not exist"
**Solution:** PostgreSQL user doesn't exist
```sql
-- Create user
CREATE USER postgres WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE kalocode_db TO postgres;
```

---

## 📝 Quick Checklist

Before starting the backend server, verify:

- [ ] PostgreSQL service is running
- [ ] Database `kalocode_db` exists
- [ ] `backend/.env` file exists
- [ ] `DATABASE_URL` in `.env` is correct
- [ ] Can connect to database using pgAdmin or psql
- [ ] Database tables are created (run `npm run setup-db`)

---

## 🚀 Start Backend Server

Once everything is configured:

```bash
cd backend
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 Server running on http://localhost:3001
```

---

## 🆘 Still Having Issues?

### Check PostgreSQL Logs

**Windows:**
```
C:\Program Files\PostgreSQL\14\data\log\
```

### Verify Environment Variables
```bash
# In backend directory
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
```

### Alternative: Use a Different Database

If PostgreSQL is causing too many issues, you can:

1. **Use Supabase (Free PostgreSQL hosting)**
   - Sign up at https://supabase.com
   - Create a new project
   - Copy the connection string
   - Update `DATABASE_URL` in `.env`

2. **Use Neon (Serverless PostgreSQL)**
   - Sign up at https://neon.tech
   - Create a database
   - Copy the connection string
   - Update `DATABASE_URL` in `.env`

---

## 📞 Need More Help?

If you're still stuck, provide:
1. PostgreSQL version: `psql --version`
2. Error message from backend logs
3. Your DATABASE_URL format (without password)
4. Operating system

---

**Good luck! Your database will be connected soon! 🎉**
