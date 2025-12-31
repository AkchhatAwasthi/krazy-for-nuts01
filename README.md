# Krazy for Nuts - E-commerce Website

A modern e-commerce platform for nuts and gift baskets, built with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **Icons**: Lucide React

## 📁 Project Structure

```
root/
├── src/              # Source code
├── public/           # Static assets
├── dist/             # Build output (generated)
├── supabase/         # Database migrations
├── index.html        # HTML template
├── netlify.toml      # Netlify configuration
├── package.json      # Dependencies
└── .env              # Environment variables (not committed)
```

## 🔧 Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env` file with:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deploy to Netlify

### Quick Deploy (GitHub)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Netlify"
   git push
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Netlify will auto-detect settings from `netlify.toml`

3. **Add Environment Variables**
   
   In Netlify: Site Settings → Environment Variables
   
   Add these variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GOOGLE_CLIENT_ID`

4. **Deploy**
   - Click "Deploy site"
   - Every push to `main` will auto-deploy

### Build Settings (Auto-configured)

The `netlify.toml` file configures:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA redirects**: All routes → `index.html`
- **Security headers**: Enabled

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID |

⚠️ **Never commit `.env` file** - It's already in `.gitignore`

## 🐛 Troubleshooting

### Build Fails
- Check environment variables are set in Netlify
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### 404 on Page Refresh
- Already handled by redirect rule in `netlify.toml`

### Environment Variables Not Working
- Ensure variables are prefixed with `VITE_`
- Redeploy after adding variables

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

Private and proprietary.
