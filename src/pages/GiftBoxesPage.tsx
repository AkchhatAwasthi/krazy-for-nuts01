import React, { useState, useEffect } from 'react';
import { Gift, Package,Search } from 'lucide-react';
import { GiftBasketCard, GiftBasketModal } from '../components/GiftBasketCard';
import { fetchGiftBaskets, GiftBasket } from '../data/giftBaskets';

interface GiftBoxesPageProps {
  addToCart: (giftBasket: GiftBasket, pieces: 1 | 10 | 20 | 50, quantity: number) => void;
}

const GiftBoxesPage: React.FC<GiftBoxesPageProps> = ({ addToCart }) => {
  const [giftBaskets, setGiftBaskets] = useState<GiftBasket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGiftBasket, setSelectedGiftBasket] = useState<GiftBasket | null>(null);

  useEffect(() => {
    const loadGiftBaskets = async () => {
      setLoading(true);
      setError(null);
      try {
        const baskets = await fetchGiftBaskets();
        setGiftBaskets(baskets);
        if (baskets.length === 0) {
          setError('No gift baskets found in the database.');
        }
      } catch (error) {
        console.error('Error loading gift baskets:', error);
        setError('Failed to load gift baskets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadGiftBaskets();
  }, []);

  const handleAddToCart = (giftBasket: GiftBasket) => {
    setSelectedGiftBasket(giftBasket);
    setIsModalOpen(true);
  };

  const handleAddToCartConfirm = (giftBasket: GiftBasket, pieces: number, quantity: number) => {
    addToCart(giftBasket, pieces as 1 | 10 | 20 | 50, quantity);
    setIsModalOpen(false);
  };

  const filteredGiftBaskets = searchTerm.trim() === '' 
    ? giftBaskets 
    : giftBaskets.filter(basket =>
        basket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (basket.description && basket.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 to-beige-100">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brown-800 to-brown-900">
        <div className="absolute inset-0">
          <img
            src="https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_uidgtjuidgtjuidg.png"
            alt="Gift Boxes Collection"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Gift className="w-16 h-16 text-gold-400 mr-4" />
              <Package className="w-16 h-16 text-gold-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-times font-bold text-white mb-6">
              Premium Gift Boxes
            </h1>
            <p className="text-xl md:text-2xl font-inter text-beige-200 max-w-3xl mx-auto leading-relaxed">
              Beautifully curated gift collections perfect for every occasion. 
              Share the joy of premium dry fruits with your loved ones.
            </p>
          </div>
        </div>
      </div>

      {/* Gift Boxes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-gold-600 font-inter font-semibold text-lg mb-4 tracking-wide">
            PREMIUM COLLECTIONS
          </p>
          <h2 className="text-4xl md:text-5xl font-inter font-bold text-brown-800 mb-6">
            Our Gift Box Collection
          </h2>
          <p className="text-xl font-inter text-brown-600 max-w-3xl mx-auto">
            From festive celebrations to corporate gifting, find the perfect gift box 
            for every special moment and occasion.
          </p>
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
              placeholder="Search gift baskets..."
            />
          </div>
        </div>
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gold-200 border-t-gold-600 mb-6"></div>
            <p className="text-xl font-inter text-brown-600">Loading premium gift boxes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Gift className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <p className="text-2xl font-inter text-red-500 mb-4">
                Error Loading Gift Baskets
              </p>
              <p className="text-lg font-inter text-gray-600">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-xl font-inter text-brown-600 text-center">
                {filteredGiftBaskets.length} premium gift baskets available
                {searchTerm.trim() !== '' && ` matching "${searchTerm}"`}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {filteredGiftBaskets.map((giftBasket) => (
                <GiftBasketCard
                  key={giftBasket.id}
                  giftBasket={giftBasket}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}

        {!loading && !error && filteredGiftBaskets.length === 0 && searchTerm.trim() === '' && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Gift className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <p className="text-2xl font-inter text-gray-500 mb-4">
                No gift baskets found
              </p>
              <p className="text-lg font-inter text-gray-400">
                Please add some gift baskets to your Supabase "GiftBaskets" table.
              </p>
            </div>
          </div>
        )}
      </div>
        {!loading && !error && filteredGiftBaskets.length === 0 && searchTerm.trim() !== '' && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <p className="text-2xl font-inter text-gray-500 mb-4">
                No gift baskets found
              </p>
              <p className="text-lg font-inter text-gray-400">
                Try searching with different keywords.
              </p>
            </div>
          </div>
        )}

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-inter font-bold text-brown-800 mb-2">
                Premium Packaging
              </h3>
              <p className="text-brown-600 font-inter">
                Elegant boxes designed to make every gift memorable and special.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gold-600" />
              </div>
              <h3 className="text-xl font-inter font-bold text-brown-800 mb-2">
                Curated Selection
              </h3>
              <p className="text-brown-600 font-inter">
                Handpicked premium dry fruits and nuts for the perfect gift combination.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-inter font-bold text-brown-800 mb-2">
                Perfect Timing
              </h3>
              <p className="text-brown-600 font-inter">
                Ideal for festivals, weddings, corporate events, and special occasions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <GiftBasketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        giftBasket={selectedGiftBasket}
        onAddToCart={handleAddToCartConfirm}
      />
    </div>
  );
};

export default GiftBoxesPage;