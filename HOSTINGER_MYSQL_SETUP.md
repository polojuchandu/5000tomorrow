# 📚 Hostinger MySQL Setup Guide

## Step 1: Get Your MySQL Connection Details from Hostinger

1. **Log in** to [Hostinger Control Panel](https://hpanel.hostinger.com)
2. Go to **Databases** (usually under Website or Hosting)
3. Click your database name
4. Look for **Connection Details** tab
5. You'll find:
   - **Hostname** (e.g., `mysql.hostinger.com`)
   - **Username** (e.g., `u123456789_user`)
   - **Password** (Your database password)
   - **Port** (usually `3306`)
   - **Database Name** (e.g., `u123456789_db`)

## Step 2: Update `.env.local`

Replace with your actual values from Hostinger:

```env
DATABASE_URL=mysql://u123456789_user:yourPassword@mysql.hostinger.com:3306/u123456789_db
```

**⚠️ Important**: Keep this file SECRET. Never commit `.env.local` to git.

## Step 3: Install MySQL Client

Run this command in your project directory:

```bash
npm install mysql2
```

## Step 4: Deploy to Hostinger

When pushing to production:

1. Copy `.env.example` contents
2. Update values with production MySQL credentials
3. Add to your Hostinger environment (via Hostinger Panel > Environment Variables or hosting provider dashboard)

## Step 5: Test the Connection

The admin dashboard (`/admin`) will automatically:
- ✅ Create the `submissions` table if it doesn't exist
- ✅ Store all form submissions in MySQL
- ✅ Display them organized by form type

Just submit a form and visit `/admin` with your admin password!

## Database Schema

Automatically created table:

```sql
CREATE TABLE submissions (
  id VARCHAR(36) PRIMARY KEY,
  form_type ENUM('apply', 'attorney-referral', 'contact') NOT NULL,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_form_type (form_type),
  INDEX idx_created_at (created_at DESC)
);
```

## Troubleshooting

### "Cannot connect to database"
- ✓ Check hostname is correct (with port 3306)
- ✓ Verify username/password are correct
- ✓ Ensure database name is correct
- ✓ Check if Hostinger requires remote access to be enabled

### "Access denied"
- ✓ Verify credentials in `DATABASE_URL`
- ✓ Make sure password doesn't contain special MySQL characters (!, @, #, etc.)
- ✓ If it does, URL-encode it: `!` → `%21`, `@` → `%40`, etc.

### "Unknown database"
- ✓ Check the database name matches exactly (case-sensitive)
- ✓ Create the database in Hostinger if it doesn't exist yet

## What Happens Automatically

When a form is submitted (Apply, Contact, Attorney Referral):

1. ✅ Data validated server-side
2. ✅ Saved to MySQL database
3. ✅ Sent to CRM webhook (if configured)
4. ✅ Confirmation email sent (if configured)
5. ✅ User sees success message

All data is now safely stored in your MySQL database and accessible via the admin dashboard!
