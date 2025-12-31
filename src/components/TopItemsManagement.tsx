import React, { useState, useEffect } from 'react';
import { Star, Search, Save, X, Plus } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Product } from '../data/products';

interface TopItem {
  id: string;
  product_id: string;
  product_name: string;
  description: string;
  image_url: string;
  category: string;
  page: string;
  position: number;
  variants: Array<{
    id: string;
    variant_label: string;
    price: number;
  }>;
}

const TopItemsManagement: React.FC = () => {
  const [topItems, setTopItems] = useState<TopItem[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadTopItems();
    loadAllProducts();
  }, []);

  const loadTopItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_top_items');
      if (error) throw error;
      setTopItems(data || []);
    } catch (error) {
      console.error('Error loading top items:', error);
      setMessage({ type: 'error', text: 'Failed to load top items' });
    } finally {
      setLoading(false);
    }
  };

  const loadAllProducts = async () => {
    try {
      // Load products with variants from the view
      const { data, error } = await supabase
        .from('product_variants_with_names')
        .select('*')
        .order('product_name');

      if (error) throw error;

      // Group variants by product
      const productsMap = new Map<string, Product>();
      
      data?.forEach(item => {
        if (!productsMap.has(item.product_id)) {
          productsMap.set(item.product_id, {
            id: item.product_id,
            name: item.product_name,
            description: '',
            image_url: '',
            category: item.category,
            page: item.page,
            variants: []
          });
        }
        
        const product = productsMap.get(item.product_id)!;
        product.variants.push({
          id: item.id,
          variant_label: item.variant_label,
          price: item.price
        });
      });

      setAllProducts(Array.from(productsMap.values()));
    } catch (error) {
      console.error('Error loading all products:', error);
    }
  };

  const handleReplaceItem = (position: number) => {
    setSelectedPosition(position);
    setShowProductSelector(true);
  };

  const handleSelectProduct = async (product: Product) => {
    if (selectedPosition === null) return;

    try {
      // Check if product is already in top items
      const existingItem = topItems.find(item => item.product_id === product.id);
      if (existingItem) {
        setMessage({ type: 'error', text: 'This product is already in the top items list' });
        setTimeout(() => setMessage(null), 3000);
        return;
      }

      // Update the top items array
      const updatedItems = [...topItems];
      const existingIndex = updatedItems.findIndex(item => item.position === selectedPosition);
      
      if (existingIndex >= 0) {
        updatedItems[existingIndex] = {
          id: `temp-${Date.now()}`,
          product_id: product.id,
          product_name: product.name,
          description: product.description || '',
          image_url: product.image_url,
          category: product.category,
          page: product.page,
          position: selectedPosition,
          variants: product.variants
        };
      } else {
        updatedItems.push({
          id: `temp-${Date.now()}`,
          product_id: product.id,
          product_name: product.name,
          description: product.description || '',
          image_url: product.image_url,
          category: product.category,
          page: product.page,
          position: selectedPosition,
          variants: product.variants
        });
      }

      setTopItems(updatedItems.sort((a, b) => a.position - b.position));
      setShowProductSelector(false);
      setSelectedPosition(null);
      setSearchTerm('');
    } catch (error) {
      console.error('Error selecting product:', error);
      setMessage({ type: 'error', text: 'Failed to select product' });
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      const itemsToSave = topItems.map(item => ({
        product_id: item.product_id,
        position: item.position
      }));

      const { error } = await supabase
        .rpc('update_top_items', { items: itemsToSave });
        
      if (error) throw error;

      setMessage({ type: 'success', text: 'Top items updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
      loadTopItems(); // Reload to get fresh data
    } catch (error) {
      console.error('Error saving top items:', error);
      setMessage({ type: 'error', text: 'Failed to save changes' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mb-4"></div>
        <p className="text-xl font-inter text-gray-600">Loading top items...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-playfair font-bold text-gray-800 flex items-center">
            <Star className="w-8 h-8 text-amber-600 mr-3" />
            Top 15 Items Management
          </h2>
        </div>
        
        <button
          onClick={handleSaveChanges}
          disabled={saving}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          <p className="font-inter">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {Array.from({ length: 15 }, (_, index) => {
          const position = index + 1;
          const item = topItems.find(item => item.position === position);
          
          return (
            <div key={position} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
              <div className="relative">
                {item ? (
                  <>
                    <img
                      src={item.image_url || 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg'}
                      alt={item.product_name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{position}
                    </div>
                    <button
                      onClick={() => handleReplaceItem(position)}
                      className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
                      title="Replace Item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <button
                      onClick={() => handleReplaceItem(position)}
                      className="flex flex-col items-center space-y-2 text-gray-500 hover:text-amber-600 transition-colors duration-200"
                    >
                      <Plus className="w-8 h-8" />
                      <span className="text-sm font-inter">Add Item #{position}</span>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                {item ? (
                  <>
                    <h3 className="text-lg font-inter font-bold text-gray-800 mb-2 line-clamp-2">
                      {item.product_name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-inter text-gray-500">
                        {item.variants[0]?.variant_label || 'Available'}
                      </span>
                      <span className="text-lg font-inter font-bold text-amber-900">
                        ₹{item.variants[0]?.price || 0}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-inter text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500">
                    <p className="font-inter">Position #{position}</p>
                    <p className="text-sm">Click to add item</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Selector Modal */}
      {showProductSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-playfair font-bold text-amber-900">
                  Select Product for Position #{selectedPosition}
                </h3>
                <button
                  onClick={() => {
                    setShowProductSelector(false);
                    setSelectedPosition(null);
                    setSearchTerm('');
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                  placeholder="Search products..."
                />
              </div>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-amber-50 hover:border-amber-200 border-2 border-transparent transition-all duration-200"
                  >
                    <img
                      src={product.image_url || 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg'}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-inter font-semibold text-gray-800 mb-1 line-clamp-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {product.variants[0]?.variant_label || 'Available'}
                      </span>
                      <span className="text-sm font-bold text-amber-900">
                        ₹{product.variants[0]?.price || 0}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full mt-2 inline-block">
                      {product.category}
                    </span>
                  </div>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 font-inter">No products found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopItemsManagement;