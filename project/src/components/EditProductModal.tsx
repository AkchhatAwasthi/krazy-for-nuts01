import React, { useState } from 'react';
import { X, Package, Upload } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  is_out_of_stock: boolean;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onProductUpdated: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  onProductUpdated 
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || 'almonds',
    image_url: product?.image_url || '',
    is_out_of_stock: product?.is_out_of_stock || false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    { value: 'cashews', label: 'Cashews' },
    { value: 'almonds', label: 'Almonds' ,children: [
      { value: 'mamra-almonds', label: 'Mamra Almonds' }
    ]},
    
    { value: 'kishmish', label: 'Kishmish' },
    { value: 'pista', label: 'Pista' },
    { value: 'elaichi', label: 'Elaichi' },
    { value: 'bites', label: 'Bites' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'akhrot', label: 'Akhrot' },
    { value: 'dates', label: 'Dates' },
    { value: 'chilgoza', label: 'Chilgoza' },
    { value: 'sun-dried-fruits', label: 'Sun-Dried Fruits' },
    { value: 'apricots', label: 'Apricots' },
    { value: 'figs', label: 'Figs' },
    { value: 'miscellaneous', label: 'Miscellaneous' },
    { value: 'saunf', label: 'Saunf (Fennel)' },
    { value: 'mukhwas', label: 'Mukhwas' },
    { value: 'papad', label: 'Papad' },
    { value: 'juices-drinks', label: 'Juices & Drinks' }
  ];

  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        category: product.category,
        image_url: product.image_url || '',
        is_out_of_stock: product.is_out_of_stock || false
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error: updateError } = await supabase
        .from('products')
        .update({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          image_url: formData.image_url,
          is_out_of_stock: formData.is_out_of_stock
        })
        .eq('id', product.id);

      if (updateError) {
        throw updateError;
      }

      setSuccess('Product updated successfully!');
      setTimeout(() => {
        onProductUpdated();
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the product');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <Package className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl font-playfair font-bold text-amber-900 mb-2">
              Edit Product
            </h2>
            <p className="text-gray-600 font-inter">
              Update product information
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm font-inter">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 text-sm font-inter">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                  required
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                placeholder="Enter product description"
              />
            </div>

            <div>
              <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_out_of_stock"
                checked={formData.is_out_of_stock}
                onChange={handleInputChange}
                className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
              />
              <label className="ml-2 text-sm font-inter text-gray-700">
                Mark as out of stock
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating Product...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;