import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSlideshow from './components/HeroSlideshow';
import CartSidebar, { CartItem } from './components/CartSidebar';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import AddToCartModal from './components/AddToCartModal';
import ProductsPage from './pages/ProductsPage';
import CrispsSipsPage from './pages/CrispsSipsPage';
import GiftBoxesPage from './pages/GiftBoxesPage';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard';
import AuthCallback from './pages/AuthCallback';
import UpdatePassword from './pages/UpdatePassword';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Product } from './data/products';
import { GiftBasket } from './data/giftBaskets';
import { checkEnvVars } from './lib/supabaseClient';
import ChatbotWidget from './components/ChatbotWidget';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import NewYearPopup from './components/NewYearPopup';

// Login Required Modal Component
const LoginRequiredModal: React.FC<{ isOpen: boolean; onClose: () => void; onLoginClick: () => void }> = ({
  isOpen,
  onClose,
  onLoginClick
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="relative p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-playfair font-bold text-amber-900 mb-4">
              Login Required
            </h3>
            <p className="text-lg font-inter text-gray-600 mb-6">
              Please log in with your email before checking out.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                onLoginClick();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    // Check environment variables
    checkEnvVars();

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, variantLabel: string, quantity: number) => {
    const variant = product.variants.find(v => v.variant_label === variantLabel);
    if (!variant) return;

    const cartItemId = `${product.id}-${variantLabel}`;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item =>
        item.id === product.id && item.weight === variantLabel
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.weight === variantLabel
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: variant.price,
          image: product.image_url,
          weight: variantLabel,
          quantity: quantity
        };
        return [...prevItems, newItem];
      }
    });
  };

  const addGiftBasketToCart = (giftBasket: GiftBasket, pieces: number, quantity: number) => {
    const price = pieces === 1 ? giftBasket.price_1 :
      pieces === 10 ? giftBasket.price_10 :
        pieces === 20 ? giftBasket.price_20 :
          giftBasket.price_50;

    const cartItemId = `${giftBasket.id}-${pieces}pieces`;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item =>
        item.id === giftBasket.id && item.weight === `${pieces} pieces`
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === giftBasket.id && item.weight === `${pieces} pieces`
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: giftBasket.id,
          name: giftBasket.name,
          price: price,
          image: giftBasket.image_url || 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_uidgtjuidgtjuidg.png',
          weight: `${pieces} pieces`,
          quantity: quantity
        };
        return [...prevItems, newItem];
      }
    });
  };

  const updateCartQuantity = (id: string | number, weight: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.weight === weight
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id: string | number, weight: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === id && item.weight === weight))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsAddToCartModalOpen(true);
  };

  const handleAddToCartConfirm = (product: Product, variantLabel: string, quantity: number) => {
    addToCart(product, variantLabel, quantity);
    setIsAddToCartModalOpen(false);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleCartCheckout = () => {
    setIsLoginRequiredModalOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
    setIsCheckoutModalOpen(false);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-beige-50">
          <Navbar
            cartItems={totalItems}
            onCartClick={() => setIsCartOpen(true)}
            onLoginClick={() => setIsLoginModalOpen(true)}
          />

          <Routes>
            <Route path="/" element={<HeroSlideshow addToCart={handleAddToCart} />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route
              path="/products"
              element={<ProductsPage addToCart={handleAddToCart} />}
            />
            <Route
              path="/crisps-sips"
              element={<CrispsSipsPage addToCart={handleAddToCart} />}
            />
            <Route
              path="/gift-boxes"
              element={<GiftBoxesPage addToCart={addGiftBasketToCart} />}
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
            onLoginClick={handleCartCheckout}
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onForgotPasswordClick={() => setIsForgotPasswordModalOpen(true)}
          />

          <ForgotPasswordModal
            isOpen={isForgotPasswordModalOpen}
            onClose={() => setIsForgotPasswordModalOpen(false)}
          />

          <LoginRequiredModal
            isOpen={isLoginRequiredModalOpen}
            onClose={() => setIsLoginRequiredModalOpen(false)}
            onLoginClick={() => setIsLoginModalOpen(true)}
          />

          <CheckoutModal
            isOpen={isCheckoutModalOpen}
            onClose={() => setIsCheckoutModalOpen(false)}
            cartItems={cartItems}
            onOrderComplete={handleOrderComplete}
          />

          <AddToCartModal
            isOpen={isAddToCartModalOpen}
            onClose={() => setIsAddToCartModalOpen(false)}
            product={selectedProduct}
            onAddToCart={handleAddToCartConfirm}
          />
        </div>

        <ChatbotWidget />
        <NewYearPopup />
      </Router>
    </AuthProvider>
  );
}

export default App;