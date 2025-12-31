# Quick Git Commands for Deployment

## 🚀 First Time Setup

### 1. Initialize Git Repository (if not already done)
```bash
cd "c:\Users\akchh\Downloads\project-bolt-sb1-6ssyt9md (1)\project"
git init
```

### 2. Add All Files
```bash
git add .
```

### 3. Create Initial Commit
```bash
git commit -m "Initial commit - Ready for Netlify deployment"
```

### 4. Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., "krazy-for-nuts")
3. **DO NOT** initialize with README, .gitignore, or license
4. Copy the repository URL

### 5. Connect to GitHub
```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 6. Push to GitHub
```bash
# For main branch
git push -u origin main

# If your default branch is master:
# git branch -M main
# git push -u origin main
```

## 🔄 Making Updates After Initial Deployment

### After Making Changes
```bash
# Check what files changed
git status

# Add all changed files
git add .

# Or add specific files
git add src/components/MyComponent.tsx

# Commit with a descriptive message
git commit -m "Add new feature: gift basket customization"

# Push to GitHub (triggers automatic Netlify deployment)
git push
```

## 📋 Useful Git Commands

### Check Repository Status
```bash
git status
```

### View Commit History
```bash
git log --oneline
```

### Create a New Branch
```bash
git checkout -b feature/new-feature
```

### Switch Between Branches
```bash
git checkout main
git checkout feature/new-feature
```

### Merge Branch to Main
```bash
git checkout main
git merge feature/new-feature
```

### Undo Last Commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Discard All Local Changes
```bash
git reset --hard HEAD
```

### View Remote Repository
```bash
git remote -v
```

## 🔐 Important Notes

- **Never commit `.env` file** - It's already in `.gitignore`
- **Always pull before push** if working with others: `git pull origin main`
- **Use descriptive commit messages** - Helps track changes
- **Create branches for new features** - Keep main branch stable

## 🎯 Complete Workflow Example

```bash
# 1. Navigate to project
cd "c:\Users\akchh\Downloads\project-bolt-sb1-6ssyt9md (1)\project"

# 2. Make sure you're on main branch
git checkout main

# 3. Pull latest changes (if working with team)
git pull origin main

# 4. Create feature branch
git checkout -b feature/add-payment-gateway

# 5. Make your changes in code editor
# ... edit files ...

# 6. Check what changed
git status

# 7. Add changes
git add .

# 8. Commit changes
git commit -m "Add payment gateway integration"

# 9. Push feature branch
git push -u origin feature/add-payment-gateway

# 10. Create Pull Request on GitHub (optional)
# Or merge directly to main:

# 11. Switch to main
git checkout main

# 12. Merge feature branch
git merge feature/add-payment-gateway

# 13. Push to main (triggers Netlify deployment)
git push origin main
```

## 🆘 Troubleshooting

### Error: "fatal: not a git repository"
```bash
git init
```

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin YOUR_REPO_URL
```

### Error: "failed to push some refs"
```bash
git pull origin main --rebase
git push origin main
```

### Accidentally Committed .env File
```bash
# Remove from git but keep local file
git rm --cached .env
git commit -m "Remove .env from repository"
git push
```

## ✅ Pre-Push Checklist

Before pushing to GitHub:
- [ ] Build succeeds locally (`npm run build`)
- [ ] No sensitive data in committed files
- [ ] `.env` is not committed
- [ ] Commit message is descriptive
- [ ] All necessary files are added

---

**Ready to deploy?** Follow the commands above, then connect your GitHub repo to Netlify!
