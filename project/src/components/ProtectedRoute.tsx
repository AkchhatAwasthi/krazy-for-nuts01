import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false, 
  fallback 
}) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F2E9] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mb-4"></div>
          <p className="text-xl font-inter text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen bg-[#F5F2E9] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-bold text-amber-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-lg font-inter text-gray-600">
            Please sign in to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (adminOnly && !isAdmin) {
    return fallback || (
      <div className="min-h-screen bg-[#F5F2E9] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-bold text-amber-900 mb-4">
            Access Denied
          </h2>
          <p className="text-lg font-inter text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;