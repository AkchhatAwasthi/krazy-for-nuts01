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
      if (product.variants.length > 0) {
        setSelectedVariant(product.variants[0].variant_label);
      }
    }
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

  // Get price based on selected variant
  const selectedVariantData = product.variants.find(v => v.variant_label === selectedVariant);
  const calculatedPrice = selectedVariantData?.price || 0;
  const isSelectedVariantOutOfStock = selectedVariantData?.is_out_of_stock || false;

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, quantity);
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
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-inter font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-sm md:text-base font-inter text-gray-600 leading-relaxed mt-3">
                {product.description}
              </p>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-inter font-semibold text-gray-800 mb-3">
              Select Variant:
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.variant_label)}
                  disabled={variant.is_out_of_stock}
                  className={`p-3 rounded-xl border-2 font-inter font-medium transition-all duration-200 ${
                    selectedVariant === variant.variant_label
                      ? 'border-amber-700 bg-amber-50 text-amber-900'
                      : variant.is_out_of_stock
                        ? 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed opacity-50'
                        : 'border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-25'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm">
                      {variant.variant_label}
                      {variant.is_out_of_stock && <span className="block text-xs text-red-500">Not Available</span>}
                    </div>
                    <div className="text-xs text-gray-500">₹{variant.price}</div>
                  </div>
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
            disabled={!product || product.is_out_of_stock || isSelectedVariantOutOfStock}
            className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product?.is_out_of_stock || isSelectedVariantOutOfStock ? 'Not Available' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;