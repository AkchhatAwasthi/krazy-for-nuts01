import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { fetchProductsByPage, Product } from '../data/products';
import FavoriteProductsManager from './FavoriteProductsManager';
import { useAuth } from '../contexts/AuthContext';



const mostSellingItems = [
  {
    name: 'Akhrot',
    image: 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_1esk61esk61esk61.png',
    link: '/products'
  },
  {
    name: 'Almond',
    image: 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_oe2y67oe2y67oe2y.png',
    link: '/products'
  },
  {
    name: 'Bites',
    image: 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/WhatsApp%20Image%202025-08-28%20at%203.05.56%20AM.jpeg',
    link: '/products'
  },
  {
    name: 'Cashew',
    image: 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_iqedp1iqedp1iqed.png',
    link: '/products'
  },
  {
    name: 'Gift Boxes',
    image: 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_uidgtjuidgtjuidg.png',
    link: '/gift-boxes'
  },
  {
    name: 'Mukhwas',
    image: 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_f4ezztf4ezztf4ez.png',
    link: '/crisps-sips'
  }
];

interface HeroSlideshowProps {
  addToCart?: (product: Product) => void;
}

const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ addToCart }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState<Product[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [isFavoritesManagerOpen, setIsFavoritesManagerOpen] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadFavoriteProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFavorites(favoriteProducts);
    } else {
      const filtered = favoriteProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFavorites(filtered);
    }
  }, [searchTerm, favoriteProducts]);

  const loadFavoriteProducts = async () => {
    setLoadingFavorites(true);
    try {
      // Get favorite product IDs from localStorage
      const savedFavorites = localStorage.getItem('favoriteProducts');
      let favoriteIds: string[] = [];

      if (savedFavorites) {
        favoriteIds = JSON.parse(savedFavorites);
      } else {
        // Default favorites if none saved
        favoriteIds = [
          'default-1', 'default-2', 'default-3', 'default-4', 'default-5',
          'default-6', 'default-7', 'default-8', 'default-9', 'default-10',
          'default-11', 'default-12', 'default-13', 'default-14', 'default-15'
        ];
      }

      // Load all products to find favorites
      const allProducts = await Promise.all([
        fetchProductsByPage('Dry Fruit Delights'),
        fetchProductsByPage('Crisps and Sips'),
        fetchProductsByPage('Gift Boxes')
      ]);

      const combinedProducts = allProducts.flat();

      // Get favorite products in order
      const favorites = favoriteIds
        .map(id => combinedProducts.find(p => p.id === id))
        .filter(Boolean) as Product[];

      // If we don't have enough favorites, fill with random products
      if (favorites.length < 15) {
        const remainingProducts = combinedProducts.filter(p => !favoriteIds.includes(p.id));
        const additionalProducts = remainingProducts.slice(0, 15 - favorites.length);
        favorites.push(...additionalProducts);
      }

      setFavoriteProducts(favorites);
      setFilteredFavorites(favorites);
    } catch (error) {
      console.error('Error loading favorite products:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    const handleOpenFavoritesManager = () => {
      if (isAdmin) {
        setIsFavoritesManagerOpen(true);
      }
    };

    window.addEventListener('openFavoritesManager', handleOpenFavoritesManager);
    return () => window.removeEventListener('openFavoritesManager', handleOpenFavoritesManager);
  }, [isAdmin]);

  const handleSaveFavorites = (favoriteIds: string[]) => {
    // Reload the favorites after saving
    loadFavoriteProducts();
  };

  const handleAddToCart = (product: Product) => {
    if (addToCart) {
      addToCart(product);
    } else {
      // If no addToCart function provided, navigate to products page
      navigate('/products');
    }
  };

  return (
    <div className="w-full">
      {/* Hero Image - Responsive Images for Mobile and Desktop */}
      <div className="relative overflow-hidden bg-gradient-to-br from-beige-50 to-beige-100">
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] max-h-[800px]">
          {/* Mobile Image - Hidden on md and above */}
          <img
            src="https://github.com/AkchhatAwasthi/upscalers-images/blob/main/nutty%20deal.png?raw=true"
            alt="Krazy for Nuts - Premium Dry Fruits"
            className="w-full h-full object-cover block md:hidden"
          />
          {/* Desktop Image - Hidden on mobile, shown on md and above */}
          <img
            src="https://github.com/AkchhatAwasthi/upscalers-images/blob/main/nutty%20deal%20(1920%20x%20832%20px)%20(1).png?raw=true"
            alt="Krazy for Nuts - Premium Dry Fruits"
            className="w-full h-full object-cover hidden md:block"
          />
        </div>
      </div>

      {/* What People Like Most Section */}
      <div className="bg-white py-16" id="what-people-like-most">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-times font-bold text-brown-800 mb-4">
              What People Like Most
            </h2>
            <p className="text-xl font-inter text-brown-600">
              Our Customer Favorites
            </p>
            {isAdmin && (
              <button
                onClick={() => setIsFavoritesManagerOpen(true)}
                className="mt-4 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
              >
                Manage Favorites
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                placeholder="Search favorite products..."
              />
            </div>
          </div>
          {loadingFavorites ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gold-200 border-t-gold-600 mb-6"></div>
              <p className="text-xl font-inter text-brown-600">Loading favorites...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredFavorites.slice(0, 15).map((item, index) => (
                <div
                  key={item.id}
                  className="bg-beige-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image_url || 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg'}
                      alt={item.name}
                      className="w-full h-32 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{favoriteProducts.findIndex(p => p.id === item.id) + 1}
                    </div>
                    {item.is_out_of_stock && (
                      <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-2 sm:p-4">
                    <h3 className="text-sm sm:text-lg font-inter font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-inter text-gray-500">
                          {item.variants[0]?.variant_label || 'Available'}
                        </span>
                        <span className="text-lg sm:text-xl font-inter font-bold text-amber-900">
                          ₹{item.variants[0]?.price || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingFavorites && filteredFavorites.length === 0 && searchTerm.trim() !== '' && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-inter text-gray-500 mb-2">No products found</p>
              <p className="text-gray-400">Try searching with different keywords</p>
            </div>
          )}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Products
            </button>
          </div>
        </div>
      </div>

      {/* Our Most Selling Items Section */}
      <div className="bg-gradient-to-br from-beige-50 to-beige-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-times font-bold text-brown-800 mb-4">
              Our Most Selling Items
            </h2>
            <p className="text-xl font-inter text-brown-600">
              By Category
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mostSellingItems.map((item, index) => (
              <div
                key={item.name}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => navigate(item.link)}
              >
                <div className="relative w-60 h-60 md:w-70 md:h-70 lg:w-80 lg:h-80 mb-4">
                  <div className="w-full h-full rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 border-4 border-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-brown-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-inter font-semibold text-brown-800 text-center group-hover:text-amber-700 transition-colors duration-300">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Categories
            </button>
          </div>
        </div>
      </div>

      <FavoriteProductsManager
        isOpen={isFavoritesManagerOpen}
        onClose={() => setIsFavoritesManagerOpen(false)}
        onSave={handleSaveFavorites}
      />
    </div>
  );
};

export default HeroSlideshow;