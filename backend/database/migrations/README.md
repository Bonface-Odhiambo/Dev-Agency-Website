# Database Migrations

Run these migration scripts in order to set up the complete database schema.

## Prerequisites

Make sure you have already run the main `schema.sql` which creates:
- UUID extension
- `contacts` table
- `projects` table
- `update_updated_at_column()` function

## Migration Order

Run these scripts in the following order:

### 1. Create Users Table
```bash
psql $DATABASE_URL -f backend/database/migrations/001_create_users_table.sql
```

### 2. Create Sessions Table
```bash
psql $DATABASE_URL -f backend/database/migrations/002_create_sessions_table.sql
```

### 3. Create Service Requests Table
```bash
psql $DATABASE_URL -f backend/database/migrations/003_create_service_requests_table.sql
```

### 4. Create Notifications Table
```bash
psql $DATABASE_URL -f backend/database/migrations/004_create_notifications_table.sql
```

### 5. Create Activity Logs Table
```bash
psql $DATABASE_URL -f backend/database/migrations/005_create_activity_logs_table.sql
```

### 6. Create Database Views
```bash
psql $DATABASE_URL -f backend/database/migrations/006_create_views.sql
```

### 7. Insert Sample Data (Optional)
```bash
psql $DATABASE_URL -f backend/database/migrations/007_insert_sample_data.sql
```

## Run All Migrations at Once

```bash
cd backend/database/migrations
for file in *.sql; do
  echo "Running $file..."
  psql $DATABASE_URL -f "$file"
done
```

## Or use PowerShell (Windows)

```powershell
cd backend\database\migrations
Get-ChildItem -Filter *.sql | Sort-Object Name | ForEach-Object {
    Write-Host "Running $($_.Name)..."
    psql $env:DATABASE_URL -f $_.FullName
}
```

## Verify Migrations

After running all migrations, verify the tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

You should see:
- activity_logs
- contacts
- notifications
- projects
- service_requests
- sessions
- users

## Rollback (if needed)

To drop all new tables (keeps contacts and projects):

```sql
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS service_requests CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
```

## Notes

- Each migration is idempotent (safe to run multiple times)
- Foreign key constraints are properly set up
- Indexes are created for performance
- Triggers are set up for automatic timestamp updates
- Sample data uses placeholder password hashes (change in production!)
