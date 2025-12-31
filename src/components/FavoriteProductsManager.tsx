import React, { useState, useEffect } from 'react';
import { X, Search, Save, Star, Package, ArrowUp, ArrowDown } from 'lucide-react';
import { fetchProductsByPage, Product } from '../data/products';

interface FavoriteProductsManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (favoriteIds: string[]) => void;
}

const FavoriteProductsManager: React.FC<FavoriteProductsManagerProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load all products
      const allProductsData = await Promise.all([
        fetchProductsByPage('Dry Fruit Delights'),
        fetchProductsByPage('Crisps and Sips'),
        fetchProductsByPage('Gift Boxes')
      ]);
      
      const combined = allProductsData.flat();
      setAllProducts(combined);

      // Load current favorites
      const savedFavorites = localStorage.getItem('favoriteProducts');
      if (savedFavorites) {
        const favoriteIds = JSON.parse(savedFavorites);
        const favorites = favoriteIds
          .map((id: string) => combined.find(p => p.id === id))
          .filter(Boolean) as Product[];
        setFavoriteProducts(favorites);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (product: Product) => {
    if (favoriteProducts.length >= 15) {
      alert('You can only have up to 15 favorite products');
      return;
    }
    
    if (favoriteProducts.find(p => p.id === product.id)) {
      return; // Already in favorites
    }
    
    setFavoriteProducts([...favoriteProducts, product]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavoriteProducts(favoriteProducts.filter(p => p.id !== productId));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFavorites = [...favoriteProducts];
    [newFavorites[index], newFavorites[index - 1]] = [newFavorites[index - 1], newFavorites[index]];
    setFavoriteProducts(newFavorites);
  };

  const moveDown = (index: number) => {
    if (index === favoriteProducts.length - 1) return;
    const newFavorites = [...favoriteProducts];
    [newFavorites[index], newFavorites[index + 1]] = [newFavorites[index + 1], newFavorites[index]];
    setFavoriteProducts(newFavorites);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const favoriteIds = favoriteProducts.map(p => p.id);
      localStorage.setItem('favoriteProducts', JSON.stringify(favoriteIds));
      onSave(favoriteIds);
      onClose();
    } catch (error) {
      console.error('Error saving favorites:', error);
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = allProducts.filter(product =>
    !favoriteProducts.find(p => p.id === product.id) &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-amber-600" />
              <h2 className="text-3xl font-playfair font-bold text-amber-900">
                Manage Favorite Products
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 font-inter">
            Select up to 15 products to display in the "What People Like Most" section
          </p>
        </div>

        <div className="flex h-[70vh]">
          {/* Current Favorites */}
          <div className="w-1/2 p-6 border-r border-gray-200">
            <h3 className="text-xl font-playfair font-bold text-gray-800 mb-4">
              Current Favorites ({favoriteProducts.length}/15)
            </h3>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-900 mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-96">
                {favoriteProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center space-x-3 p-3 bg-amber-50 rounded-xl">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === favoriteProducts.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                      #{index + 1}
                    </div>
                    
                    <img
                      src={product.image_url || 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-inter font-semibold text-gray-800 truncate">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {favoriteProducts.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No favorite products selected</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Available Products */}
          <div className="w-1/2 p-6">
            <div className="mb-4">
              <h3 className="text-xl font-playfair font-bold text-gray-800 mb-4">
                Available Products
              </h3>
              
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
            
            <div className="space-y-3 overflow-y-auto max-h-96">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <img
                    src={product.image_url || 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg'}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-inter font-semibold text-gray-800 truncate">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-sm font-semibold text-amber-900">
                      ₹{product.variants[0]?.price || 0}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => addToFavorites(product)}
                    disabled={favoriteProducts.length >= 15}
                    className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {favoriteProducts.length}/15 products selected
          </p>
          
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-inter font-semibold rounded-xl transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductsManager;