# Simple Admin Setup Guide

## Step 1: Create the Database Table

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the contents of `database_admin_users.sql`
6. Click **Run** or press `Ctrl+Enter`

This creates the `admin_users` table with:
- `id` - Unique identifier
- `email` - Admin email address
- `password_hash` - Encrypted password
- `role` - User role (default: 'admin')
- `created_at` - Account creation date
- `updated_at` - Last update date

## Step 2: Create Your Admin Account

1. Start your development server: `npm run dev`
2. Go to: `http://localhost:3000/admin/signup`
3. Enter your email (e.g., `admin@kaziagency.es`)
4. Create a strong password (minimum 8 characters)
5. Confirm your password
6. Click "Create Admin Account"
7. You'll be redirected to the login page

## Step 3: Login

1. Go to: `http://localhost:3000/admin/login`
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to the admin dashboard

## Step 4: Disable Signup (Important!)

After creating your admin account:

1. Open `.env.local`
2. Change:
   ```env
   NEXT_PUBLIC_ENABLE_SIGNUP=true
   ```
   To:
   ```env
   NEXT_PUBLIC_ENABLE_SIGNUP=false
   ```
3. Restart your dev server
4. The signup page will now show "Signup Disabled"

## How It Works

- **No Supabase Auth** - Uses a custom `admin_users` table
- **Password Security** - Passwords are hashed with bcrypt (10 salt rounds)
- **Role-Based** - Each user has a role field (default: 'admin')
- **Simple** - Just email, password, and role stored in your database
- **Secure** - Passwords are never stored in plain text

## Verify Your Admin User

To see your admin user in the database:

1. Go to Supabase Dashboard → **Table Editor**
2. Select `admin_users` table
3. You'll see your admin user with:
   - Email
   - Password hash (encrypted)
   - Role: admin
   - Created date

## Adding More Admins (Optional)

To add more admin users later:

1. Set `NEXT_PUBLIC_ENABLE_SIGNUP=true` in `.env.local`
2. Restart server
3. Go to `/admin/signup` and create another account
4. Set `NEXT_PUBLIC_ENABLE_SIGNUP=false` again
5. Restart server

## Security Notes

✅ Passwords are hashed with bcrypt (industry standard)
✅ Minimum 8 character password requirement
✅ Signup can be disabled with one environment variable
✅ User data stored securely in Supabase
✅ No email confirmation needed (simpler setup)

That's it! Your admin panel is now secure and ready to use.
