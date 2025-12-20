# How to Disable Admin Signup

After you've created your admin account, follow these steps to disable the signup page:

## Step 1: Update Environment Variable

Open your `.env.local` file and change:

```env
NEXT_PUBLIC_ENABLE_SIGNUP=true
```

To:

```env
NEXT_PUBLIC_ENABLE_SIGNUP=false
```

## Step 2: Restart Your Development Server

1. Stop your current dev server (Ctrl+C or Cmd+C)
2. Restart it with: `npm run dev`

## Step 3: Verify

1. Go to: `http://localhost:3000/admin/signup`
2. You should see a "Signup Disabled" message
3. The signup link will also disappear from the login page

## That's it!

Your admin panel is now secure with only the login page accessible.

---

## To Re-enable Signup (if needed)

Simply change the value back to `true` and restart the server.

```env
NEXT_PUBLIC_ENABLE_SIGNUP=true
```
