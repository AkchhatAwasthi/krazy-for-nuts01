import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GiftBasket } from '../data/giftBaskets';

interface GiftBasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftBasket: GiftBasket | null;
  onAddToCart: (giftBasket: GiftBasket, pieces: 1 | 10 | 20 | 50, quantity: number) => void;
}

const GiftBasketModal: React.FC<GiftBasketModalProps> = ({ 
  isOpen, 
  onClose, 
  giftBasket, 
  onAddToCart 
}) => {
  const [selectedPieces, setSelectedPieces] = useState<1 | 10 | 20 | 50>(1);
  const [quantity, setQuantity] = useState(1);

  // Reset state when a new gift basket is opened
  useEffect(() => {
    if (giftBasket) {
      setQuantity(1);
      setSelectedPieces(1);
    }
  }, [giftBasket]);

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

  if (!isOpen || !giftBasket) return null;

  // Get price based on selected pieces
  const calculatedPrice = selectedPieces === 1 ? giftBasket.price_1 :
                         selectedPieces === 10 ? giftBasket.price_10 :
                         selectedPieces === 20 ? giftBasket.price_20 :
                         giftBasket.price_50;

  const handleAddToCart = () => {
    onAddToCart(giftBasket, selectedPieces, quantity);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '+919903305374';
    const message = `Hi, I want to order more than 50 pieces of ${giftBasket.name}. Please help me with bulk pricing.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in duration-300">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6">
            <img
              src={giftBasket.image || 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_uidgtjuidgtjuidg.png'}
              alt={giftBasket.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-inter font-semibold text-gray-800 mb-2">
              {giftBasket.name}
            </h3>
            {giftBasket.description && (
              <p className="text-gray-600 font-inter text-sm mb-4">
                {giftBasket.description}
              </p>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-inter font-semibold text-gray-800 mb-3">
              Select Pieces:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setSelectedPieces(1)}
                className={`p-3 rounded-xl border-2 font-inter font-medium transition-all duration-200 ${
                  selectedPieces === 1
                    ? 'border-amber-700 bg-amber-50 text-amber-900'
                    : 'border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-25'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm">1 piece</div>
                  <div className="text-xs text-gray-500">₹{giftBasket.price_1}</div>
                </div>
              </button>
              <button
                onClick={() => setSelectedPieces(10)}
                className={`p-3 rounded-xl border-2 font-inter font-medium transition-all duration-200 ${
                  selectedPieces === 10
                    ? 'border-amber-700 bg-amber-50 text-amber-900'
                    : 'border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-25'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm">10 pieces</div>
                  <div className="text-xs text-gray-500">₹{giftBasket.price_10}</div>
                </div>
              </button>
              <button
                onClick={() => setSelectedPieces(20)}
                className={`p-3 rounded-xl border-2 font-inter font-medium transition-all duration-200 ${
                  selectedPieces === 20
                    ? 'border-amber-700 bg-amber-50 text-amber-900'
                    : 'border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-25'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm">20 pieces</div>
                  <div className="text-xs text-gray-500">₹{giftBasket.price_20}</div>
                </div>
              </button>
              <button
                onClick={() => setSelectedPieces(50)}
                className={`p-3 rounded-xl border-2 font-inter font-medium transition-all duration-200 ${
                  selectedPieces === 50
                    ? 'border-amber-700 bg-amber-50 text-amber-900'
                    : 'border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-25'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm">50 pieces</div>
                  <div className="text-xs text-gray-500">₹{giftBasket.price_50}</div>
                </div>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-inter font-semibold text-gray-800 mb-3">
              Quantity:
            </h4>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-inter font-semibold text-gray-700 transition-colors duration-200"
              >
                -
              </button>
              <span className="text-xl font-inter font-semibold text-gray-800 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-inter font-semibold text-gray-700 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-6 p-4 bg-amber-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-lg font-inter font-semibold text-gray-800">
                Total Price:
              </span>
              <span className="text-2xl font-inter font-bold text-amber-900">
                ₹{calculatedPrice * quantity}
              </span>
            </div>
          </div>

          {/* WhatsApp Notice */}
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-sm font-inter text-green-800 text-center">
              If your order is above 50 pieces, kindly{' '}
              <button
                onClick={handleWhatsAppContact}
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                contact us on WhatsApp
              </button>
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!giftBasket.in_stock}
            className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!giftBasket.in_stock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface GiftBasketCardProps {
  giftBasket: GiftBasket;
  onAddToCart: (giftBasket: GiftBasket) => void;
}

const GiftBasketCard: React.FC<GiftBasketCardProps> = ({ giftBasket, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <img
          src={giftBasket.image || 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_uidgtjuidgtjuidg.png'}
          alt={giftBasket.name}
          className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {!giftBasket.in_stock && (
          <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-6">
        <div className="mb-4">
          <h3 className="text-sm sm:text-xl font-inter font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
            {giftBasket.name}
          </h3>
          {giftBasket.description && (
            <p className="text-gray-600 font-inter text-xs sm:text-sm line-clamp-2 hidden sm:block">
              {giftBasket.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-inter text-gray-500">
              Starting from 1 piece
            </span>
            <span className="text-lg sm:text-2xl font-inter font-bold text-amber-900">
              ₹{giftBasket.price_1}
            </span>
          </div>
          <div className="text-xs font-inter text-gray-400 bg-gray-100 px-2 py-1 rounded-full hidden sm:block">
            Gift Basket
          </div>
        </div>

        <button
          onClick={() => onAddToCart(giftBasket)}
          disabled={!giftBasket.in_stock}
          className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-2 sm:py-3 px-3 sm:px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!giftBasket.in_stock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export { GiftBasketCard, GiftBasketModal };