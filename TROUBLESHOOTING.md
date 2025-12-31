# 🔍 Netlify White Screen Troubleshooting

## Common Causes & Solutions

### 1. ✅ Check Environment Variables (Most Common Issue)

**Problem:** Environment variables not set or incorrectly named in Netlify.

**Solution:**

1. Go to your Netlify site dashboard
2. Navigate to: **Site settings** → **Environment variables**
3. Verify you have these **exact** variable names:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_GOOGLE_CLIENT_ID
   ```

4. **Important:** Variable names must start with `VITE_` for Vite to include them in the build

5. After adding/updating variables, you MUST redeploy:
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Deploy site"**

### 2. 🔍 Check Browser Console

**How to check:**

1. Open your Netlify site in browser
2. Press `F12` or right-click → **Inspect**
3. Go to **Console** tab
4. Look for error messages

**Common errors:**

- ❌ `Missing Supabase environment variables` → Environment variables not set
- ❌ `Failed to fetch` → Network/CORS issue
- ❌ `Unexpected token '<'` → Build issue, serving wrong files

### 3. 📋 Check Netlify Build Logs

**How to check:**

1. Go to Netlify dashboard
2. Click **Deploys** tab
3. Click on the latest deploy
4. Scroll through the build log

**What to look for:**

✅ **Good build log:**
```
npm run build
vite v5.4.8 building for production...
✓ built in 4.53s
```

❌ **Bad build log:**
```
Error: Missing dependencies
Build failed
```

### 4. 🔧 Verify Build Settings

In Netlify dashboard → **Site settings** → **Build & deploy**:

```
Build command: npm run build
Publish directory: dist
```

### 5. 🌐 Check Deployed Files

1. In Netlify dashboard, go to **Deploys**
2. Click on the latest deploy
3. Click **"Preview deploy"** or **"View deploy"**
4. Check if `index.html` and `assets/` folder exist

### 6. 🔄 Force Rebuild

Sometimes Netlify cache causes issues:

1. Go to **Deploys** tab
2. Click **"Trigger deploy"**
3. Select **"Clear cache and deploy site"**

## 📝 Step-by-Step Checklist

Follow these steps in order:

- [ ] **Step 1:** Open Netlify site in browser, press F12, check Console tab
- [ ] **Step 2:** Look for error messages in console
- [ ] **Step 3:** Go to Netlify → Site settings → Environment variables
- [ ] **Step 4:** Verify all 3 environment variables are set with correct names
- [ ] **Step 5:** Check variable names start with `VITE_` (not `REACT_APP_` or other prefix)
- [ ] **Step 6:** After adding variables, trigger a new deploy
- [ ] **Step 7:** Check build logs for errors
- [ ] **Step 8:** If still white screen, clear cache and redeploy

## 🎯 Quick Fix (Most Likely Solution)

**The white screen is usually caused by missing environment variables.**

### Do this now:

1. **Open Netlify Dashboard**
   - Go to your site
   - Click **Site settings**
   - Click **Environment variables**

2. **Add these 3 variables:**

   | Key | Where to get value |
   |-----|-------------------|
   | `VITE_SUPABASE_URL` | Your local `.env` file |
   | `VITE_SUPABASE_ANON_KEY` | Your local `.env` file |
   | `VITE_GOOGLE_CLIENT_ID` | Your local `.env` file |

3. **Redeploy:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Deploy site"**

4. **Wait for build to complete** (2-3 minutes)

5. **Refresh your site**

## 🔍 Debug Mode Enabled

I've added debug logging to your code. After redeploying:

1. Open your Netlify site
2. Press F12 to open browser console
3. You'll see environment check messages:

```
Environment check: {
  hasSupabaseUrl: true/false,
  hasSupabaseKey: true/false,
  nodeEnv: "production"
}
```

If you see `false` for any variable, that's your issue!

## 🆘 Still Not Working?

### Check these:

1. **Variable names are EXACT:**
   - ✅ `VITE_SUPABASE_URL`
   - ❌ `SUPABASE_URL` (missing VITE_ prefix)
   - ❌ `VITE_SUPABASE_URI` (wrong name)

2. **No extra spaces:**
   - ✅ `VITE_SUPABASE_URL`
   - ❌ `VITE_SUPABASE_URL ` (space at end)

3. **Values are correct:**
   - Copy from your local `.env` file
   - Don't include quotes
   - Don't include `=` sign

4. **Redeployed after adding variables:**
   - Adding variables doesn't auto-redeploy
   - You MUST manually trigger a new deploy

## 📞 Get More Info

To help debug, share:
1. Screenshot of browser console (F12)
2. Screenshot of Netlify environment variables page (hide values)
3. Screenshot of Netlify build log

## ✅ Success Indicators

Your site is working when:
- ✅ No errors in browser console
- ✅ Environment check shows all `true`
- ✅ Site loads and displays content
- ✅ Can navigate between pages
