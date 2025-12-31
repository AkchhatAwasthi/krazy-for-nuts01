import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { GiftBasket } from '../data/giftBaskets';

interface GiftBasketEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    giftBasket: GiftBasket | null;
    onSaved: () => void;
}

const GiftBasketEditorModal: React.FC<GiftBasketEditorModalProps> = ({
    isOpen,
    onClose,
    giftBasket,
    onSaved
}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price_1: 0,
        price_10: 0,
        price_20: 0,
        price_50: 0,
        in_stock: true,
        image_url: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (giftBasket) {
            setFormData({
                name: giftBasket.name,
                description: giftBasket.description || '',
                price_1: giftBasket.price_1,
                price_10: giftBasket.price_10,
                price_20: giftBasket.price_20,
                price_50: giftBasket.price_50,
                in_stock: giftBasket.in_stock,
                image_url: giftBasket.image_url || ''
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price_1: 0,
                price_10: 0,
                price_20: 0,
                price_50: 0,
                in_stock: true,
                image_url: ''
            });
        }
        setError(null);
    }, [giftBasket, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Validate form
            if (!formData.name.trim()) {
                throw new Error('Gift basket name is required');
            }

            if (formData.price_1 <= 0 || formData.price_10 <= 0 || formData.price_20 <= 0 || formData.price_50 <= 0) {
                throw new Error('All prices must be greater than 0');
            }

            const dataToSave = {
                name: formData.name.trim(),
                description: formData.description.trim() || null,
                price_1: formData.price_1,
                price_10: formData.price_10,
                price_20: formData.price_20,
                price_50: formData.price_50,
                in_stock: formData.in_stock,
                image: formData.image_url.trim() || null  // Database uses 'image' column
            };

            if (giftBasket) {
                // Update existing gift basket
                const { error: updateError } = await supabase
                    .from('gift_baskets')
                    .update(dataToSave)
                    .eq('id', giftBasket.id);

                if (updateError) throw updateError;
            } else {
                // Create new gift basket
                const { error: insertError } = await supabase
                    .from('gift_baskets')
                    .insert([dataToSave]);

                if (insertError) throw insertError;
            }

            onSaved();
            onClose();
        } catch (err: any) {
            console.error('Error saving gift basket:', err);
            setError(err.message || 'Failed to save gift basket');
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
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-2xl font-playfair font-bold text-gray-800">
                        {giftBasket ? 'Edit Gift Basket' : 'Add New Gift Basket'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                            <p className="font-inter">{error}</p>
                        </div>
                    )}

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                            Gift Basket Name *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                            placeholder="e.g., Premium Dry Fruits Hamper"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                            placeholder="Describe the gift basket..."
                            rows={3}
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="url"
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                            placeholder="https://example.com/image.jpg"
                        />
                        {formData.image_url && (
                            <img
                                src={formData.image_url}
                                alt="Preview"
                                className="mt-3 w-32 h-32 object-cover rounded-lg"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_uidgtjuidgtjuidg.png';
                                }}
                            />
                        )}
                    </div>

                    {/* Pricing Section */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-inter font-semibold text-gray-800 mb-4">
                            Pricing (₹)
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                                    1 Piece *
                                </label>
                                <input
                                    type="number"
                                    value={formData.price_1}
                                    onChange={(e) => setFormData({ ...formData, price_1: parseFloat(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                                    10 Pieces *
                                </label>
                                <input
                                    type="number"
                                    value={formData.price_10}
                                    onChange={(e) => setFormData({ ...formData, price_10: parseFloat(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                                    20 Pieces *
                                </label>
                                <input
                                    type="number"
                                    value={formData.price_20}
                                    onChange={(e) => setFormData({ ...formData, price_20: parseFloat(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                                    50 Pieces *
                                </label>
                                <input
                                    type="number"
                                    value={formData.price_50}
                                    onChange={(e) => setFormData({ ...formData, price_50: parseFloat(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="in_stock"
                            checked={formData.in_stock}
                            onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                            className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        />
                        <label htmlFor="in_stock" className="text-sm font-inter font-medium text-gray-700">
                            In Stock
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : giftBasket ? 'Update Gift Basket' : 'Create Gift Basket'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GiftBasketEditorModal;
