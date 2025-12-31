import React, { useState, useEffect } from 'react';
import { X, Package, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface ProductVariant {
  id?: string;
  variant_label: string;
  size_grams: number;
  price_inr: number;
  in_stock: boolean;
}

interface ProductWithVariants {
  id: string;
  name: string;
  category: string;
  image_url: string;
  variants: ProductVariant[];
}

interface ProductEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductWithVariants | null;
  onSaved: () => void;
}

interface CustomVariant {
  id?: string;
  variant_label: string;
  size_grams: number;
  price_inr: string;
  in_stock: boolean;
}

const ProductEditorModal: React.FC<ProductEditorModalProps> = ({
  isOpen,
  onClose,
  product,
  onSaved
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image_url: ''
  });
  const [isNewCategory, setIsNewCategory] = useState(false);

  const [customVariants, setCustomVariants] = useState<CustomVariant[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('category')
          .not('category', 'is', null);

        if (error) throw error;

        const uniqueCategories = Array.from(new Set(
          (data || []).map(p => p.category).filter(Boolean)
        )).sort();

        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData({
          name: product.name || '',
          category: product.category || '',
          image_url: product.image_url || ''
        });
        setIsNewCategory(false);

        const variants = product.variants.map(v => ({
          id: v.id,
          variant_label: v.variant_label || `${v.size_grams}g`,
          size_grams: v.size_grams || 0,
          price_inr: v.price_inr > 0 ? v.price_inr.toString() : '',
          in_stock: v.in_stock || false
        }));

        setCustomVariants(variants.length > 0 ? variants : [
          { variant_label: '100g', size_grams: 100, price_inr: '', in_stock: false },
          { variant_label: '200g', size_grams: 200, price_inr: '', in_stock: false },
          { variant_label: '500g', size_grams: 500, price_inr: '', in_stock: false }
        ]);
      } else {
        setFormData({
          name: '',
          category: '',
          image_url: ''
        });
        setIsNewCategory(false);
        setCustomVariants([
          { variant_label: '100g', size_grams: 100, price_inr: '', in_stock: false },
          { variant_label: '200g', size_grams: 200, price_inr: '', in_stock: false },
          { variant_label: '500g', size_grams: 500, price_inr: '', in_stock: false }
        ]);
      }
      setError('');
    }
  }, [product, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCustomVariant = () => {
    setCustomVariants(prev => [
      ...prev,
      { variant_label: '', size_grams: 0, price_inr: '', in_stock: false }
    ]);
  };

  const removeCustomVariant = (index: number) => {
    setCustomVariants(prev => prev.filter((_, i) => i !== index));
  };

  const updateCustomVariant = (index: number, field: keyof CustomVariant, value: string | number | boolean) => {
    setCustomVariants(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleVariantLabelChange = (index: number, value: string) => {
    updateCustomVariant(index, 'variant_label', value || '');

    if (value) {
      const match = value.match(/^(\d+(?:\.\d+)?)\s*(g|kg|ml|l|gm|gms|gram|grams)?$/i);
      if (match) {
        let grams = parseFloat(match[1]);
        const unit = match[2]?.toLowerCase();

        if (unit === 'kg') {
          grams *= 1000;
        } else if (unit === 'l') {
          grams *= 1000;
        }

        updateCustomVariant(index, 'size_grams', Math.round(grams));
      }
    }
  };

  const handleSizeGramsChange = (index: number, value: string) => {
    const numValue = parseInt(value);
    if (value === '' || (!isNaN(numValue) && numValue >= 0)) {
      updateCustomVariant(index, 'size_grams', value === '' ? 0 : numValue);
    }
  };

  const handlePriceChange = (index: number, value: string) => {
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      const numValue = parseFloat(value);
      if (value !== '' && (isNaN(numValue) || numValue < 0)) {
        return;
      }
      updateCustomVariant(index, 'price_inr', value);
    }
  };

  const handleStockChange = (index: number, checked: boolean) => {
    updateCustomVariant(index, 'in_stock', checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.name || !formData.name.trim()) {
        throw new Error('Product name is required');
      }

      if (!formData.category || !formData.category.trim()) {
        throw new Error('Category is required');
      }

      let productId = product?.id;

      if (product) {
        const { error: updateError } = await supabase
          .from('products')
          .update({
            name: formData.name.trim(),
            category: formData.category,
            image_url: (formData.image_url || '').trim()
          })
          .eq('id', product.id);

        if (updateError) throw updateError;
      } else {
        const { data: newProduct, error: insertError } = await supabase
          .from('products')
          .insert([{
            name: formData.name.trim(),
            category: formData.category,
            image_url: (formData.image_url || '').trim(),
            page: 'Dry Fruit Delights'
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        productId = newProduct.id;
      }

      const validVariants = customVariants.filter(v =>
        v.variant_label && v.variant_label.trim() !== '' &&
        v.size_grams > 0 &&
        v.price_inr && v.price_inr.trim() !== ''
      );

      if (validVariants.length === 0) {
        throw new Error('Please add at least one variant with a label, size, and price');
      }

      const variantsToUpdate = [];
      const variantsToInsert = [];

      for (const variant of validVariants) {
        const priceValue = parseFloat(variant.price_inr);
        const baseVariant = {
          product_id: productId,
          variant_label: variant.variant_label.trim(),
          size_grams: variant.size_grams,
          price_inr: priceValue,
          in_stock: variant.in_stock,
          price: priceValue
        };

        if (variant.id) {
          variantsToUpdate.push({ ...baseVariant, id: variant.id });
        } else {
          variantsToInsert.push(baseVariant);
        }
      }

      if (product && product.variants) {
        const currentVariantIds = validVariants.filter(v => v.id).map(v => v.id);
        const originalVariantIds = product.variants.map(v => v.id).filter(Boolean);
        const variantsToDelete = originalVariantIds.filter(id => !currentVariantIds.includes(id));

        if (variantsToDelete.length > 0) {
          const { error: deleteError } = await supabase
            .from('product_variants')
            .delete()
            .in('id', variantsToDelete);

          if (deleteError) throw deleteError;
        }
      }

      if (variantsToUpdate.length > 0) {
        for (const variant of variantsToUpdate) {
          const { error: updateError } = await supabase
            .from('product_variants')
            .update({
              variant_label: variant.variant_label,
              size_grams: variant.size_grams,
              price_inr: variant.price_inr,
              in_stock: variant.in_stock,
              price: variant.price
            })
            .eq('id', variant.id);

          if (updateError) throw updateError;
        }
      }

      if (variantsToInsert.length > 0) {
        const { error: insertError } = await supabase
          .from('product_variants')
          .insert(variantsToInsert);

        if (insertError) throw insertError;
      }

      onSaved();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the product');
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
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
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-gray-600 font-inter">
              {product ? 'Update product information and pricing' : 'Create a new product with pricing for different sizes'}
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
                {isNewCategory ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                      placeholder="Enter new category name"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewCategory(false);
                        setFormData(prev => ({ ...prev, category: categories[0] || '' }));
                      }}
                      className="text-sm text-amber-600 hover:text-amber-700"
                    >
                      Choose from existing categories
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewCategory(true);
                        setFormData(prev => ({ ...prev, category: '' }));
                      }}
                      className="text-sm text-amber-600 hover:text-amber-700"
                    >
                      + Create new category
                    </button>
                  </div>
                )}
              </div>
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
              {formData.image_url && (
                <div className="mt-4">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-inter font-semibold text-gray-800">
                  Product Variants
                </h3>
                <button
                  type="button"
                  onClick={addCustomVariant}
                  className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-inter font-semibold">Add Variant</span>
                </button>
              </div>

              <div className="space-y-4">
                {customVariants.map((variant, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-md font-inter font-semibold text-gray-700">
                        Variant {index + 1}
                      </h4>
                      {customVariants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCustomVariant(index)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-600 mb-2">
                          Label *
                        </label>
                        <input
                          type="text"
                          value={variant.variant_label}
                          onChange={(e) => handleVariantLabelChange(index, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                          placeholder="e.g., 100g, 250g, 1kg"
                        />
                        <p className="text-xs text-gray-500 mt-1 font-inter">
                          Enter size with unit
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-600 mb-2">
                          Size (grams) *
                        </label>
                        <input
                          type="number"
                          value={variant.size_grams || ''}
                          onChange={(e) => handleSizeGramsChange(index, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                          placeholder="100"
                          min="0"
                        />
                        <p className="text-xs text-gray-500 mt-1 font-inter">
                          For sorting
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-inter font-medium text-gray-600 mb-2">
                          Price (INR) *
                        </label>
                        <input
                          type="text"
                          value={variant.price_inr}
                          onChange={(e) => handlePriceChange(index, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                          placeholder="0.00"
                        />
                      </div>

                      <div className="flex items-end">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={variant.in_stock}
                            onChange={(e) => handleStockChange(index, e.target.checked)}
                            disabled={!variant.price_inr.trim()}
                            className="w-5 h-5 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <span className="text-sm font-inter text-gray-700">
                            In Stock
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-inter">
                  <strong>Tip:</strong> Enter custom sizes like "50g", "250g", "1kg", etc. The size in grams helps with sorting and filtering.
                </p>
              </div>
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
                {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditorModal;
