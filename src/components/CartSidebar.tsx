import React, { useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  weight: string;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string | number, weight: string, quantity: number) => void;
  onRemoveItem: (id: string | number, weight: string) => void;
  onCheckout: () => void;
  onLoginClick: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onLoginClick
}) => {
  const { user } = useAuth();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckoutClick = () => {
    if (!user) {
      // Show login required message - we'll handle this in the parent component
      onLoginClick();
      return;
    }
    onCheckout();
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={handleBackdropClick}
        />
      )}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-playfair font-bold text-amber-900">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-inter text-gray-500 mb-4">
                  Your cart is empty
                </p>
                <p className="text-lg font-inter text-gray-400">
                  Add some delicious nuts to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.weight}`} className="bg-amber-50 rounded-xl p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-inter font-semibold text-gray-800 mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm font-inter text-gray-600 mb-2">
                          Weight: {item.weight}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.weight, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="text-lg font-inter font-semibold text-gray-800 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.weight, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id, item.weight)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="mt-2 text-right">
                          <span className="text-lg font-inter font-bold text-amber-900">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-playfair font-bold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-2xl font-playfair font-bold text-amber-900">
                  ₹{totalAmount}
                </span>
              </div>
              <button 
                onClick={handleCheckoutClick}
                className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;