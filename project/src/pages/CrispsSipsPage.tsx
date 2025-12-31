import React, { useState, useEffect } from 'react';
import { Coffee, Filter,Search } from 'lucide-react';
import { fetchProductsByPage, getCategoriesByPage, Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Get the first variant for display
  const displayVariant = product.variants[0];
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
          alt={product.name}
          className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {product.is_out_of_stock && (
          <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-6">
        <div className="mb-4">
          <h3 className="text-sm sm:text-xl font-inter font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 font-inter text-xs sm:text-sm line-clamp-2 hidden sm:block">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-inter text-gray-500">
              {displayVariant ? displayVariant.variant_label : 'Available'}
            </span>
            <span className="text-lg sm:text-2xl font-inter font-bold text-amber-900">
              ₹{displayVariant ? displayVariant.price : 0}
            </span>
          </div>
          <div className="text-xs font-inter text-gray-400 bg-gray-100 px-2 py-1 rounded-full hidden sm:block">
            {product.category}
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.is_out_of_stock}
          className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-2 sm:py-3 px-3 sm:px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {product.is_out_of_stock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

interface CrispsSipsPageProps {
  addToCart: (product: Product) => void;
}

const CrispsSipsPage: React.FC<CrispsSipsPageProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProductsByPage('Crisps and Sips'),
          getCategoriesByPage('Crisps and Sips')
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const searchFilteredProducts = searchTerm.trim() === '' 
    ? filteredProducts 
    : filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 to-beige-100">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brown-800 to-brown-900">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
            alt="Crisps and Sips"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Coffee className="w-16 h-16 text-gold-400 mr-4" />
              <Coffee className="w-20 h-20 text-gold-400" />
              <Coffee className="w-16 h-16 text-gold-400 ml-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-times font-bold text-white mb-6">
              Crisps & Sips
            </h1>
            <p className="text-xl md:text-2xl font-inter text-beige-200 max-w-3xl mx-auto leading-relaxed">
              Traditional mouth fresheners and crispy delights. From aromatic mukhwas to 
              crunchy papads, experience authentic Indian flavors.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-gold-600 font-inter font-semibold text-lg mb-4 tracking-wide">
            TRADITIONAL COLLECTION
          </p>
          <h2 className="text-4xl md:text-5xl font-inter font-bold text-brown-800 mb-6">
            Mukhwas & Papad Collection
          </h2>
          <p className="text-xl font-inter text-brown-600 max-w-3xl mx-auto">
            Discover our authentic collection of traditional Indian mouth fresheners and 
            crispy treats, perfect for after meals and special occasions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Filter className="w-6 h-6 text-brown-600 mr-2" />
            <h3 className="text-xl font-inter font-semibold text-brown-800">
              Filter by Category
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-lg'
                  : 'bg-white text-brown-700 hover:bg-amber-50 hover:text-amber-800 border border-brown-200'
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((category) => {
              const categoryCount = products.filter(p => p.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-lg'
                      : 'bg-white text-brown-700 hover:bg-amber-50 hover:text-amber-800 border border-brown-200'
                  }`}
                >
                  {category} ({categoryCount})
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
              placeholder="Search mukhwas, papad, and beverages..."
            />
          </div>
        </div>
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gold-200 border-t-gold-600 mb-6"></div>
            <p className="text-xl font-inter text-brown-600">Loading traditional delights...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-xl font-inter text-brown-600 text-center">
                {searchFilteredProducts.length} products {selectedCategory !== 'all' ? `in ${selectedCategory}` : 'available'}
                {searchTerm.trim() !== '' && ` matching "${searchTerm}"`}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
              {searchFilteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </>
        )}

        {!loading && searchFilteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              {searchTerm.trim() !== '' ? (
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              ) : (
                <Coffee className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              )}
              <p className="text-2xl font-inter text-gray-500 mb-4">
                {searchTerm.trim() !== '' ? 'No products found' : 'No products found'}
              </p>
              <p className="text-lg font-inter text-gray-400">
                {searchTerm.trim() !== '' 
                  ? 'Try searching with different keywords or check the category filters.'
                  : selectedCategory !== 'all' 
                    ? `No products available in ${selectedCategory} category.`
                    : 'Please check back later for our traditional collection.'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrispsSipsPage;