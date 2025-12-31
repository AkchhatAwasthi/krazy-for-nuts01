import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging for environment variables (only shows if they exist, not the values)
console.log('Environment check:', {
  hasSupabaseUrl: !!supabaseUrl,
  hasSupabaseKey: !!supabaseAnonKey,
  nodeEnv: import.meta.env.MODE
});

// Helper to check env vars safely from valid React components
export const checkEnvVars = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase environment variables!');
    throw new Error('Missing Supabase environment variables. Please check your Netlify configuration.');
  }
};

// Use fallback to prevent app crash on import
// This allows the ErrorBoundary to catch the error during render
const safeUrl = supabaseUrl || 'https://placeholder.supabase.co';
const safeKey = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(safeUrl, safeKey);
