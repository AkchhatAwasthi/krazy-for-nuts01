import React, { useState } from 'react';
import { X, Upload, Package } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'almonds',
    image_url: '',
    is_out_of_stock: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'cashews', label: 'Cashews' },
    { value: 'almonds', label: 'Almonds' },
    { value: 'mamra-almonds', label: 'Mamra Almonds' },
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image_url: previewUrl }));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = formData.image_url;

      // Upload image if a file was selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Insert product into database
      const { error: insertError } = await supabase
        .from('products')
        .insert([{
          name: formData.name,
          description: formData.description,
          category: formData.category,
          image_url: imageUrl,
          is_out_of_stock: formData.is_out_of_stock
        }]);

      if (insertError) {
        throw insertError;
      }

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: 'almonds',
        image_url: '',
        is_out_of_stock: false
      });
      setImageFile(null);
      
      onProductAdded();
    } catch (err: any) {
      setError(err.message || 'An error occurred while adding the product');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

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
              Add New Product
            </h2>
            <p className="text-gray-600 font-inter">
              Add a new product to your inventory
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm font-inter">{error}</p>
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
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors duration-200">
                {formData.image_url ? (
                  <div className="space-y-4">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, image_url: '' }));
                        setImageFile(null);
                      }}
                      className="text-red-600 hover:text-red-700 font-inter text-sm"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <label className="cursor-pointer">
                        <span className="text-amber-600 hover:text-amber-700 font-inter font-semibold">
                          Upload an image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>
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
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;