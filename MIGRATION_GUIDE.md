# 🚀 Database Migration Guide

## Quick Start

```bash
cd backend
npm run migrate
```

That's it! The script will handle everything automatically.

---

## 📋 What Gets Created

### Tables (7 total)
1. **users** - Authentication & profiles
2. **sessions** - JWT session management  
3. **service_requests** - Client project requests
4. **notifications** - User notifications
5. **activity_logs** - Audit trail
6. **contacts** - Contact form (already exists)
7. **projects** - Portfolio (already exists)

### Views (5 total)
- `user_stats` - User statistics
- `service_request_stats` - Request statistics
- `user_dashboard_view` - Dashboard data
- `admin_overview` - Admin panel overview
- `recent_activity` - Recent activity logs

---

## 🎯 Migration Order

The migrations run in this order:
1. Users table (required first)
2. Sessions table (depends on users)
3. Service requests table (depends on users)
4. Notifications table (depends on users)
5. Activity logs table (depends on users)
6. Database views (depends on all tables)
7. Sample data (optional)

---

## 🔧 Running Migrations

### Method 1: Automated Script (Recommended)
```bash
cd backend
npm run migrate
```

**What it does:**
- Connects to your Neon database
- Runs all 7 migrations in order
- Handles errors gracefully (skips if table exists)
- Verifies all tables are created
- Shows summary of created tables

### Method 2: Manual (One by One)
```bash
cd backend/database/migrations

# Windows PowerShell
$env:DATABASE_URL = "your_connection_string"
Get-ChildItem -Filter *.sql | Sort-Object Name | ForEach-Object {
    Write-Host "Running $($_.Name)..."
    psql $env:DATABASE_URL -f $_.FullName
}

# Linux/Mac
export DATABASE_URL="your_connection_string"
for file in *.sql; do
    echo "Running $file..."
    psql $DATABASE_URL -f "$file"
done
```

### Method 3: Neon SQL Editor (If psql not available)
1. Open Neon dashboard
2. Go to SQL Editor
3. Copy content from each migration file
4. Paste and run one at a time
5. Start with `001_create_users_table.sql`
6. End with `007_insert_sample_data.sql`

---

## ✅ Verification

After running migrations, verify everything worked:

```bash
# Check tables exist
psql $DATABASE_URL -c "\dt"

# Should show:
# - activity_logs
# - contacts
# - notifications
# - projects
# - service_requests
# - sessions
# - users
```

Or check in your code:
```bash
cd backend
npm run dev

# Visit http://localhost:3001/api/health
# Should return: { "success": true, "database": "connected" }
```

---

## 🐛 Troubleshooting

### Error: "relation already exists"
**Solution:** This is normal! The migration script skips existing tables.

### Error: "DATABASE_URL not found"
**Solution:** Make sure you have a `.env` file in the `backend` directory with your connection string.

```bash
cd backend
cp .env.example .env
# Edit .env and add your DATABASE_URL
```

### Error: "psql: command not found"
**Solution:** Either:
1. Install PostgreSQL client tools
2. Use the automated script: `npm run migrate`
3. Use Neon SQL Editor (Method 3 above)

### Error: "permission denied"
**Solution:** Check your database user has CREATE permissions.

### Error: "function update_updated_at_column() does not exist"
**Solution:** Run the main schema first:
```bash
psql $DATABASE_URL -f backend/database/schema.sql
```

---

## 🔄 Rolling Back

If you need to start over:

```sql
-- Drop all new tables (keeps contacts and projects)
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS service_requests CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop views
DROP VIEW IF EXISTS user_stats;
DROP VIEW IF EXISTS service_request_stats;
DROP VIEW IF EXISTS user_dashboard_view;
DROP VIEW IF EXISTS admin_overview;
DROP VIEW IF EXISTS recent_activity;
```

Then run migrations again:
```bash
npm run migrate
```

---

## 📊 Sample Data

Migration `007_insert_sample_data.sql` creates:

### Users
- **Admin**: admin@devagency.com / admin123
- **Client 1**: john@example.com / admin123
- **Client 2**: jane@example.com / admin123

### Service Requests
- E-Commerce Platform (John, in-progress, 65%)
- Mobile Fitness App (Jane, review, 90%)

### Notifications
- Welcome messages for all clients

**⚠️ IMPORTANT:** Change the admin password in production!

---

## 🎯 After Migration

### 1. Start the Backend
```bash
cd backend
npm run dev
```

### 2. Test Authentication
```bash
# Register a new user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Test Login
```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Save the token from response
```

### 4. Test Protected Routes
```bash
# Get current user (replace YOUR_TOKEN)
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📝 Migration Files

| File | Purpose | Dependencies |
|------|---------|--------------|
| 001 | Users table | None |
| 002 | Sessions table | Users |
| 003 | Service requests | Users |
| 004 | Notifications | Users |
| 005 | Activity logs | Users |
| 006 | Database views | All tables |
| 007 | Sample data | All tables |

---

## 🔐 Security Notes

- All passwords are hashed with bcrypt
- JWT tokens expire after 7 days
- Sessions are tracked with IP and user agent
- Activity logs track all important actions
- Sample data uses placeholder hashes

---

## 📞 Need Help?

Check these files:
- `backend/database/migrations/README.md` - Detailed migration docs
- `backend/IMPLEMENTATION_COMPLETE.md` - Full implementation guide
- `backend/DATABASE_SCHEMA_REPORT.md` - Schema analysis

---

## ✨ Success Indicators

You'll know migrations worked when:
- ✅ Script completes without errors
- ✅ All 7 tables are listed
- ✅ Backend starts successfully
- ✅ Can register/login users
- ✅ Protected routes work with token
- ✅ Sample data is accessible

---

**Ready? Run `npm run migrate` now!** 🚀
