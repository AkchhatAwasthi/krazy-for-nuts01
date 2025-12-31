import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Package, Save } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price_200g: number;
  price_500g: number;
  price_1kg: number;
  image_url: string;
  is_out_of_stock: boolean;
}

interface ProductVariant {
  id: string;
  variant_label: string;
  price: number;
}

interface VariantManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onVariantsUpdated: () => void;
}

const VariantManagementModal: React.FC<VariantManagementModalProps> = ({
  isOpen,
  onClose,
  product,
  onVariantsUpdated
}) => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [suggestedVariants, setSuggestedVariants] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product && isOpen) {
      loadVariants();
      loadSuggestedVariants();
    }
  }, [product, isOpen]);

  const loadVariants = async () => {
    if (!product) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', product.id)
        .order('variant_label');

      if (error) throw error;
      setVariants(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestedVariants = async () => {
    if (!product) return;

    try {
      const { data, error } = await supabase
        .rpc('get_suggested_variants', { product_id_param: product.id });

      if (error) throw error;
      setSuggestedVariants(data || []);
    } catch (err: any) {
      console.error('Error loading suggested variants:', err);
      // Fallback to default suggestions based on category
      const defaultSuggestions = getDefaultSuggestions(product.category);
      setSuggestedVariants(defaultSuggestions);
    }
  };

  const getDefaultSuggestions = (category: string): string[] => {
    if (category.includes('pack') || category.includes('mukhwas')) {
      return ['5-pack', '10-pack', '20-pack'];
    }
    if (category.includes('juice') || category.includes('drink')) {
      return ['250ml', '500ml', '1ltr'];
    }
    return ['100g', '200g', '500g', '1kg'];
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: `temp-${Date.now()}`,
      variant_label: '',
      price: 0
    };
    setVariants([...variants, newVariant]);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string | number) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setVariants(updatedVariants);
  };

  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const addSuggestedVariant = (suggestedLabel: string) => {
    // Check if variant already exists
    if (variants.some(v => v.variant_label === suggestedLabel)) {
      return;
    }

    // Calculate suggested price based on existing variants
    let suggestedPrice = 100; // default
    if (variants.length > 0) {
      const avgPrice = variants.reduce((sum, v) => sum + v.price, 0) / variants.length;
      suggestedPrice = Math.round(avgPrice);
    }

    const newVariant: ProductVariant = {
      id: `temp-${Date.now()}`,
      variant_label: suggestedLabel,
      price: suggestedPrice
    };
    setVariants([...variants, newVariant]);
  };

  const saveVariants = async () => {
    if (!product) return;

    setSaving(true);
    setError('');

    try {
      // Delete all existing variants
      const { error: deleteError } = await supabase
        .from('product_variants')
        .delete()
        .eq('product_id', product.id);

      if (deleteError) throw deleteError;

      // Insert new variants (filter out empty ones)
      const validVariants = variants.filter(v => 
        v.variant_label.trim() !== '' && v.price > 0
      );

      if (validVariants.length > 0) {
        const variantsToInsert = validVariants.map(v => ({
          product_id: product.id,
          variant_label: v.variant_label.trim(),
          price: v.price
        }));

        const { error: insertError } = await supabase
          .from('product_variants')
          .insert(variantsToInsert);

        if (insertError) throw insertError;
      }

      onVariantsUpdated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
              Manage Product Variants
            </h2>
            <p className="text-gray-600 font-inter">
              {product.name}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm font-inter">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mb-4"></div>
              <p className="text-xl font-inter text-gray-600">Loading variants...</p>
            </div>
          ) : (
            <>
              {/* Suggested Variants */}
              {suggestedVariants.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-inter font-semibold text-gray-800 mb-4">
                    Suggested Variants (click to add):
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestedVariants.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => addSuggestedVariant(suggestion)}
                        disabled={variants.some(v => v.variant_label === suggestion)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          variants.some(v => v.variant_label === suggestion)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer'
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Variants */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-inter font-semibold text-gray-800">
                    Current Variants:
                  </h3>
                  <button
                    onClick={addVariant}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-inter font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Variant</span>
                  </button>
                </div>

                {variants.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 font-inter">
                      No variants found. Add some variants to get started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {variants.map((variant, index) => (
                      <div key={variant.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <label className="block text-sm font-inter font-medium text-gray-700 mb-1">
                            Variant Label
                          </label>
                          <input
                            type="text"
                            value={variant.variant_label}
                            onChange={(e) => updateVariant(index, 'variant_label', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                            placeholder="e.g., 200g, 5-pack, 500ml"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-inter font-medium text-gray-700 mb-1">
                            Price (₹)
                          </label>
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                            placeholder="0"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <button
                          onClick={() => removeVariant(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Remove Variant"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={saveVariants}
                  disabled={saving || variants.length === 0}
                  className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{saving ? 'Saving...' : 'Save Variants'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VariantManagementModal;