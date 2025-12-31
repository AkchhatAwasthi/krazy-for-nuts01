import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('AuthCallback: Starting callback processing...');
        console.log('Current URL:', window.location.href);

        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        console.log('Access token present:', !!accessToken);
        console.log('Refresh token present:', !!refreshToken);
        console.log('Type:', type);

        if (type === 'recovery') {
          console.log('Password recovery flow detected');
          setIsPasswordRecovery(true);
        }

        if (accessToken && refreshToken) {
          console.log('Setting session from tokens...');
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Error setting session:', error);
            setError(error.message);
            setIsProcessing(false);
            return;
          }

          console.log('Session set successfully:', data);

          window.history.replaceState({}, document.title, '/');

          if (type === 'recovery') {
            console.log('Redirecting to password update page...');
            navigate('/update-password', { replace: true });
          } else {
            console.log('Redirecting to home page...');
            navigate('/', { replace: true });
          }
        } else {
          console.log('No tokens found in URL, checking for existing session...');

          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

          if (sessionError) {
            console.error('Session error:', sessionError);
            setError('Authentication failed. Please try again.');
            setIsProcessing(false);
            return;
          }

          if (sessionData.session) {
            console.log('Existing session found, redirecting...');
            if (type === 'recovery') {
              navigate('/update-password', { replace: true });
            } else {
              navigate('/', { replace: true });
            }
          } else {
            console.log('No session found, redirecting to home...');
            setError('No authentication data found. Please try signing in again.');
            setIsProcessing(false);
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 3000);
          }
        }
      } catch (err) {
        console.error('Unexpected error in handleCallback:', err);
        setError('An unexpected error occurred. Please try again.');
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">
              Authentication Error
            </h2>
            <p className="text-gray-600 font-inter mb-6">
              {error}
            </p>
            <button
              onClick={() => navigate('/', { replace: true })}
              className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg className="w-8 h-8 text-amber-700 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">
              {isPasswordRecovery ? 'Verifying Reset Link...' : 'Completing Sign In...'}
            </h2>
            <p className="text-gray-600 font-inter">
              Please wait while we authenticate your account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
