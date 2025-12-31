# Netlify Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [ ] All features are working locally
- [ ] No console errors in browser
- [ ] All environment variables are documented in `.env.example`
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview build works locally (`npm run preview`)

### 2. Git Repository Setup
- [ ] Git repository initialized
- [ ] `.gitignore` is properly configured
- [ ] `.env` file is NOT committed (should be in `.gitignore`)
- [ ] All changes are committed
- [ ] Repository is pushed to GitHub

### 3. Environment Variables
Make sure you have these ready for Netlify:
- [ ] `VITE_SUPABASE_URL`
- [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] `VITE_GOOGLE_CLIENT_ID`

### 4. Netlify Configuration
- [ ] `netlify.toml` file exists in project root
- [ ] Build settings are correct (base: `project`, publish: `dist`)
- [ ] Redirect rules are configured for SPA routing

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
# Navigate to project directory
cd "c:\Users\akchh\Downloads\project-bolt-sb1-6ssyt9md (1)\project"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for Netlify deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository from the list

### Step 3: Configure Build Settings

Netlify should auto-detect settings from `netlify.toml`, but verify:

- **Base directory**: `project`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Step 4: Add Environment Variables

1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Click **"Add a variable"** and add each of these:

   | Key | Value |
   |-----|-------|
   | `VITE_SUPABASE_URL` | Your Supabase project URL |
   | `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth client ID |

### Step 5: Deploy

1. Click **"Deploy site"**
2. Wait for build to complete (usually 2-5 minutes)
3. Once deployed, you'll get a URL like `https://your-site-name.netlify.app`

### Step 6: Configure Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure DNS

## 🔄 Continuous Deployment

After initial setup:
- Every push to `main` branch will automatically deploy
- Pull requests will generate preview deployments
- You can rollback to any previous deployment from Netlify dashboard

## 🔍 Post-Deployment Verification

- [ ] Site loads correctly at Netlify URL
- [ ] All pages are accessible (no 404 errors on refresh)
- [ ] Authentication works (Google OAuth)
- [ ] Supabase connection is working
- [ ] Images and assets load properly
- [ ] Mobile responsiveness is maintained
- [ ] All forms and interactions work

## 🐛 Common Issues & Solutions

### Issue: Build fails with "command not found"
**Solution**: Ensure `package.json` has the correct build script

### Issue: Environment variables not working
**Solution**: 
- Verify variables are prefixed with `VITE_`
- Redeploy after adding variables
- Check for typos in variable names

### Issue: 404 on page refresh
**Solution**: Verify `netlify.toml` has the redirect rule (already configured)

### Issue: Google OAuth not working
**Solution**: 
- Add Netlify URL to Google OAuth authorized redirect URIs
- Update Supabase redirect URLs to include Netlify domain

## 📞 Support

If you encounter issues:
1. Check Netlify build logs for errors
2. Review Netlify documentation: https://docs.netlify.com/
3. Check browser console for errors
4. Verify all environment variables are set correctly

## 🎉 Success!

Once deployed, your site will be live at:
- **Netlify URL**: `https://your-site-name.netlify.app`
- **Custom Domain**: (if configured)

Remember to update:
- Google OAuth redirect URIs with your Netlify URL
- Supabase redirect URLs with your Netlify URL
