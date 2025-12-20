# Admin Panel Authentication Setup

## Overview
The admin panel is now protected with Supabase Authentication. Only authenticated users can access `/admin` routes.

## Setup Instructions

### 1. Enable Email Authentication in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Make sure **Email** provider is enabled
5. Configure email settings (or use Supabase's default email service)

### 2. Create Admin User

You have two options to create an admin user:

#### Option A: Using Supabase Dashboard (Recommended)
1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - Email: `admin@kaziagency.es` (or your preferred admin email)
   - Password: Create a strong password
   - Auto Confirm User: **Yes** (check this box)
4. Click **Create User**

#### Option B: Using SQL Editor
1. Go to **SQL Editor** in Supabase Dashboard
2. Run this query:
```sql
-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@kaziagency.es',
  crypt('YOUR_SECURE_PASSWORD', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```
Replace `YOUR_SECURE_PASSWORD` with your actual password.

### 3. Test Login

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter your admin credentials
3. You should be redirected to the admin dashboard

### 4. Security Best Practices

1. **Use a strong password** - At least 12 characters with mixed case, numbers, and symbols
2. **Enable 2FA** (optional) - Can be configured in Supabase Auth settings
3. **Limit admin users** - Only create accounts for trusted team members
4. **Regular password updates** - Change passwords every 90 days
5. **Monitor access logs** - Check Supabase logs regularly

### 5. Adding More Admin Users

To add additional admin users, repeat Step 2 with different email addresses.

### 6. Password Reset

If you forget your password:
1. Go to Supabase Dashboard → Authentication → Users
2. Find your user
3. Click the three dots → **Send Password Recovery**
4. Check your email for the reset link

## Environment Variables

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Troubleshooting

### "Invalid credentials" error
- Check that the user exists in Supabase Dashboard → Authentication → Users
- Verify the email is confirmed (email_confirmed_at should have a timestamp)
- Try resetting the password

### Redirected to login immediately after signing in
- Check browser console for errors
- Verify Supabase URL and keys are correct in `.env.local`
- Clear browser localStorage and try again

### Can't access admin pages
- Make sure you're logged in at `/admin/login`
- Check that session is stored in localStorage (open DevTools → Application → Local Storage)

## Features

✅ Protected admin routes - Only authenticated users can access
✅ Session management - Sessions stored securely
✅ Logout functionality - Clear session and redirect to login
✅ Auto-redirect - Unauthenticated users sent to login page
✅ Loading states - Smooth transitions during auth checks

## Login Page

Access the admin login at: `/admin/login`

Default credentials (after setup):
- Email: `admin@kaziagency.es`
- Password: (the one you set during setup)
