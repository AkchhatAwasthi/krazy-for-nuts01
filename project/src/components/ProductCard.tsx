import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '../data/products';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, variantLabel: string, quantity: number) => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart 
}) => {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Reset state when a new product is opened
  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
            {displayVariant ? displayVariant.variant_label : 'Available'}
  }, [product]);

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

  if (!isOpen || !product) return null;

  // Get price based on selected weight
  let calculatedPrice = 0;
  if (selectedWeight === '200g') {
    calculatedPrice = product.price_200g || product.price;
  } else if (selectedWeight === '500g') {
    calculatedPrice = product.price_500g || Math.round(product.price * 2.3);
  } else if (selectedWeight === '1kg') {
    calculatedPrice = product.price_1kg || Math.round(product.price * 4.5);
  }

  const handleAddToCart = () => {
    onAddToCart(product, selectedWeight, quantity);
    onClose();
  };

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
              src={product.image_url || product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-inter font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-inter font-semibold text-gray-800 mb-3">
              Select Weight:
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {weightOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedWeight(option.value)}
                  className={`p-3 rounded-xl border-2 font-inter font-medium transition-all duration-200 ${
                    selectedWeight === option.value
                      ? 'border-amber-700 bg-amber-50 text-amber-900'
                      : 'border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-25'
                  }`}
                >
                  {option.label}
                </button>
              ))}
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

          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;