import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  cartItems: number;
  onCartClick: () => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItems, onCartClick, onLoginClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    navigate('/admin');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-beige-100/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-beige-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Untitled_design-removebg-preview.png" 
              alt="K-R-A-Z-Y for Nuts Logo" 
              className="h-20 w-32 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-inter font-medium transition-all duration-300 relative ${
                location.pathname === '/'
                  ? 'text-brown-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-500 after:rounded-full'
                  : 'text-brown-600 hover:text-brown-800 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gold-400 hover:after:rounded-full hover:after:transition-all hover:after:duration-300'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`font-inter font-medium transition-all duration-300 relative ${
                location.pathname === '/products'
                  ? 'text-brown-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-500 after:rounded-full'
                  : 'text-brown-600 hover:text-brown-800 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gold-400 hover:after:rounded-full hover:after:transition-all hover:after:duration-300'
              }`}
            >
              Dry Fruit Delights
            </Link>
            {user && !isAdmin && (
              <Link
                to="/my-orders"
                className={`font-inter font-medium transition-all duration-300 relative ${
                  location.pathname === '/my-orders'
                    ? 'text-brown-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-500 after:rounded-full'
                    : 'text-brown-600 hover:text-brown-800 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gold-400 hover:after:rounded-full hover:after:transition-all hover:after:duration-300'
                }`}
              >
                My Orders
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className={`font-inter font-medium transition-all duration-300 relative ${
                  location.pathname === '/admin'
                    ? 'text-brown-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-500 after:rounded-full'
                    : 'text-brown-600 hover:text-brown-800 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gold-400 hover:after:rounded-full hover:after:transition-all hover:after:duration-300'
                }`}
              >
                Admin
              </Link>
            )}
            {isAdmin && (
              <button
                onClick={() => {
                  const event = new CustomEvent('openFavoritesManager');
                  window.dispatchEvent(event);
                }}
                className="font-inter font-medium text-brown-600 hover:text-brown-800 transition-all duration-300 relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gold-400 hover:after:rounded-full hover:after:transition-all hover:after:duration-300"
              >
                Manage Favorites
              </button>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 group hover:bg-beige-100 rounded-full"
            >
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-brown-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-inter font-bold shadow-lg">
                  {cartItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:block text-brown-600 font-inter text-sm">
                  {user.user_metadata?.full_name || user.email}
                </span>
                {isAdmin && (
                  <button
                    onClick={handleAdminClick}
                    className="p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 hover:bg-beige-100 rounded-full"
                    title="Admin Dashboard"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 hover:bg-beige-100 rounded-full"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-brown-900 px-4 py-2 rounded-full font-inter font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button and Cart - Only visible on mobile */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Cart Icon for Mobile */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 hover:bg-beige-100 rounded-full"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-brown-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-inter font-bold shadow-lg">
                  {cartItems}
                </span>
              )}
            </button>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 hover:bg-beige-100 rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-beige-200 bg-beige-50">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`block font-inter font-medium py-2 transition-all duration-300 ${
                  location.pathname === '/'
                    ? 'text-brown-800 border-l-4 border-gold-500 pl-4'
                    : 'text-brown-600 hover:text-brown-800 pl-4'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={closeMobileMenu}
                className={`block font-inter font-medium py-2 transition-all duration-300 ${
                  location.pathname === '/products'
                    ? 'text-brown-800 border-l-4 border-gold-500 pl-4'
                    : 'text-brown-600 hover:text-brown-800 pl-4'
                }`}
              >
                Dry Fruit Delights
              </Link>
              {user && !isAdmin && (
                <Link
                  to="/my-orders"
                  onClick={closeMobileMenu}
                  className={`block font-inter font-medium py-2 transition-all duration-300 ${
                    location.pathname === '/my-orders'
                      ? 'text-brown-800 border-l-4 border-gold-500 pl-4'
                      : 'text-brown-600 hover:text-brown-800 pl-4'
                  }`}
                >
                  My Orders
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={closeMobileMenu}
                  className={`block font-inter font-medium py-2 transition-all duration-300 ${
                    location.pathname === '/admin'
                      ? 'text-brown-800 border-l-4 border-gold-500 pl-4'
                      : 'text-brown-600 hover:text-brown-800 pl-4'
                  }`}
                >
                  Admin
                </Link>
              )}
              {isAdmin && (
                <button
                  onClick={() => {
                    const event = new CustomEvent('openFavoritesManager');
                    window.dispatchEvent(event);
                    closeMobileMenu();
                  }}
                  className="block font-inter font-medium text-brown-600 hover:text-brown-800 transition-all duration-300 py-2 pl-4 text-left w-full"
                >
                  Manage Favorites
                </button>
              )}
              
              {/* User Section */}
              {user ? (
                <div className="border-t border-beige-200 pt-4 mt-4">
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-brown-600 font-inter text-sm">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                    <div className="flex items-center space-x-2">
                      {isAdmin && (
                        <button
                          onClick={handleAdminClick}
                          className="p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 hover:bg-beige-100 rounded-full"
                          title="Admin Dashboard"
                        >
                          <Settings className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 hover:bg-beige-100 rounded-full"
                        title="Sign Out"
                      >
                        <LogOut className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t border-beige-200 pt-4 mt-4">
                  <button
                    onClick={() => {
                      onLoginClick();
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-brown-900 px-4 py-3 rounded-full font-inter font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tablet Navigation - Only visible on tablet (md to lg) */}
        <div className="hidden md:block lg:hidden pb-4">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link
              to="/"
              className={`font-inter font-medium transition-all duration-300 relative ${
                location.pathname === '/'
                  ? 'text-brown-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-500 after:rounded-full'
                  : 'text-brown-600 hover:text-brown-800'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`font-inter font-medium transition-all duration-300 relative ${
                location.pathname === '/products'
                  ? 'text-brown-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-500 after:rounded-full'
                  : 'text-brown-600 hover:text-brown-800'
              }`}
            >
              Dry Fruit Delights
            </Link>
            {user && !isAdmin && (
              <Link
                to="/my-orders"
                className={`font-inter font-medium transition-all duration-300 relative ${
                  location.pathname === '/my-orders'
                    ? 'text-brown-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-500 after:rounded-full'
                    : 'text-brown-600 hover:text-brown-800'
                }`}
              >
                My Orders
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className={`font-inter font-medium transition-all duration-300 relative ${
                  location.pathname === '/admin'
                    ? 'text-brown-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-500 after:rounded-full'
                    : 'text-brown-600 hover:text-brown-800'
                }`}
              >
                Admin
              </Link>
            )}
            {isAdmin && (
              <button
                onClick={() => {
                  const event = new CustomEvent('openFavoritesManager');
                  window.dispatchEvent(event);
                }}
                className="font-inter font-medium text-brown-600 hover:text-brown-800 transition-all duration-300 relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gold-400 hover:after:rounded-full hover:after:transition-all hover:after:duration-300"
              >
                Manage Favorites
              </button>
            )}
          </div>
          
          {/* Tablet User Actions */}
          <div className="flex items-center justify-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 group hover:bg-beige-100 rounded-full"
            >
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-brown-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-inter font-bold shadow-lg">
                  {cartItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-brown-600 font-inter text-sm">
                  {user.user_metadata?.full_name || user.email}
                </span>
                {isAdmin && (
                  <button
                    onClick={handleAdminClick}
                    className="p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 hover:bg-beige-100 rounded-full"
                    title="Admin Dashboard"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="p-2 text-brown-600 hover:text-brown-800 transition-all duration-300 hover:bg-beige-100 rounded-full"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-brown-900 px-4 py-2 rounded-full font-inter font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;