# Krazy for Nuts - E-commerce Website

A modern e-commerce platform built with React, TypeScript, and Vite, featuring gift basket customization and Supabase backend integration.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **Routing**: React Router DOM v7
- **Icons**: Lucide React

## 📁 Project Structure

```
project/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/           # Page components
│   ├── contexts/        # React Context providers
│   ├── lib/             # Library configurations (Supabase)
│   ├── data/            # Static data and constants
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── supabase/            # Supabase migrations and functions
├── dist/                # Build output (generated)
├── index.html           # HTML template
├── netlify.toml         # Netlify configuration
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── .env                 # Environment variables (not committed)
```

## 🔧 Local Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `project` directory with the following:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌐 Deploying to Netlify

### Method 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Commit changes
   git commit -m "Initial commit"
   
   # Add remote repository
   git remote add origin <your-github-repo-url>
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your repository

3. **Configure build settings**
   
   Netlify will automatically detect the `netlify.toml` configuration:
   - **Base directory**: `project`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **Add environment variables**
   
   In Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add the following variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_GOOGLE_CLIENT_ID`

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your site automatically
   - Every push to `main` branch will trigger a new deployment

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify**
   ```bash
   cd project
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Method 3: Manual Deploy (Drag & Drop)

1. **Build the project locally**
   ```bash
   cd project
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Drag and drop the `dist` folder to Netlify's deploy zone
   - Configure environment variables in Site settings

## 🔐 Environment Variables

Make sure to set these environment variables in Netlify:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID |

## 📝 Important Notes

- The `netlify.toml` file is configured to handle SPA routing
- All routes redirect to `index.html` for client-side routing
- Security headers are automatically added
- Assets are cached for optimal performance
- The `.env` file is gitignored for security

## 🔄 Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Build and deploy on every push to `main` branch
- Create deploy previews for pull requests
- Provide unique URLs for each deployment

## 🐛 Troubleshooting

### Build Fails on Netlify

1. Check that all environment variables are set correctly
2. Verify Node.js version compatibility
3. Check build logs for specific errors
4. Ensure `package.json` has all required dependencies

### 404 Errors on Refresh

- This is handled by the redirect rule in `netlify.toml`
- Ensure the `netlify.toml` file is in the `project` directory

### Environment Variables Not Working

- Ensure variables are prefixed with `VITE_`
- Redeploy after adding/updating environment variables
- Check that variables are set in Netlify dashboard

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Supabase Documentation](https://supabase.com/docs)

## 📄 License

This project is private and proprietary.
