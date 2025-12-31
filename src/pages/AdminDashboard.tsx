import React, { useState, useEffect } from 'react';
import { Plus, Package, ShoppingBag, Users, TrendingUp, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import ProductEditorModal from '../components/ProductEditorModal';
import GiftBasketEditorModal from '../components/GiftBasketEditorModal';
import TodaysOrders from '../components/TodaysOrders';
import TopItemsManagement from '../components/TopItemsManagement';
import { GiftBasket, fetchGiftBaskets } from '../data/giftBaskets';

interface ProductVariant {
  id: string;
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

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  todaysOrders: number;
  totalRevenue: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'top-items' | 'gift-baskets'>('products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [products, setProducts] = useState<ProductWithVariants[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    todaysOrders: 0,
    totalRevenue: 0
  });
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithVariants | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Gift Baskets state
  const [giftBaskets, setGiftBaskets] = useState<GiftBasket[]>([]);
  const [isGiftBasketEditorOpen, setIsGiftBasketEditorOpen] = useState(false);
  const [selectedGiftBasket, setSelectedGiftBasket] = useState<GiftBasket | null>(null);

  const itemsPerPage = 12;

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cashews', name: 'Cashews' },
    { id: 'almonds', name: 'Almonds' },
    { id: 'mamra-almonds', name: 'Mamra Almonds' },
    { id: 'kishmish', name: 'Kishmish' },
    { id: 'pista', name: 'Pista' },
    { id: 'elaichi', name: 'Elaichi' },
    { id: 'bites', name: 'Bites' },
    { id: 'seeds', name: 'Seeds' },
    { id: 'akhrot', name: 'Akhrot' },
    { id: 'dates', name: 'Dates' },
    { id: 'chilgoza', name: 'Chilgoza' },
    { id: 'sun-dried-fruits', name: 'Sun-Dried Fruits' },
    { id: 'apricots', name: 'Apricots' },
    { id: 'figs', name: 'Figs' },
    { id: 'miscellaneous', name: 'Miscellaneous' },
    { id: 'saunf', name: 'Saunf (Fennel)' },
    { id: 'mukhwas', name: 'Mukhwas' },
    { id: 'papad', name: 'Papad' },
    { id: 'juices-drinks', name: 'Juices & Drinks' }
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchTerm, currentPage]);

  useEffect(() => {
    if (activeTab === 'gift-baskets') {
      loadGiftBaskets();
    }
  }, [activeTab]);

  const getTodayInIST = () => {
    const now = new Date();
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    return istTime.toISOString().split('T')[0];
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleTotalSalesChange = (total: number) => {
    setTotalSales(total);
  };

  const loadDashboardData = async () => {
    try {
      const getUtcRangeForIstDate = (selectedDate: string) => {
        const start = new Date(`${selectedDate}T00:00:00+05:30`);
        const end = new Date(`${selectedDate}T23:59:59+05:30`);
        return {
          startUtc: start.toISOString(),
          endUtc: end.toISOString(),
        };
      };

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id');

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('id, created_at');

      if (productsError) {
        console.error('Error loading products count:', productsError);
      }

      if (ordersError) {
        console.error('Error loading orders count:', ordersError);
      }

      const todayIST = getTodayInIST();
      const { startUtc, endUtc } = getUtcRangeForIstDate(todayIST);

      const todaysOrders = ordersData?.filter(order => {
        const orderTime = new Date(order.created_at);
        const startTime = new Date(startUtc);
        const endTime = new Date(endUtc);
        return orderTime >= startTime && orderTime <= endTime;
      }).length || 0;

      setStats({
        totalProducts: productsData?.length || 0,
        totalOrders: ordersData?.length || 0,
        todaysOrders,
        totalRevenue: 0
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setMessage({ type: 'error', text: 'Failed to load dashboard statistics.' });
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select(`
          id,
          name,
          category,
          image_url,
          product_variants (
            id,
            size_grams,
            price_inr,
            in_stock
          )
        `, { count: 'exact' });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (searchTerm.trim() !== '') {
        query = query.or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);
      }

      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error, count } = await query
        .order('name')
        .range(from, to);

      if (error) throw error;

      const productsWithVariants: ProductWithVariants[] = (data || []).map(product => {
        const variants = (product.product_variants || [])
          .filter((v: any) => v.id && v.size_grams > 0)
          .map((v: any) => ({
            id: v.id,
            size_grams: v.size_grams,
            price_inr: parseFloat(v.price_inr) || 0,
            in_stock: v.in_stock || false,
            variant_label: v.variant_label || `${v.size_grams}g`
          }));

        variants.sort((a: ProductVariant, b: ProductVariant) => a.size_grams - b.size_grams);

        return {
          id: product.id,
          name: product.name,
          category: product.category,
          image_url: product.image_url || 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg',
          variants
        };
      });

      setProducts(productsWithVariants);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    } catch (error) {
      console.error('Error loading products:', error);
      setMessage({ type: 'error', text: 'Failed to load products.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product? This will also delete all its variants.')) {
      return;
    }

    setActionLoading(`delete-${productId}`);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      loadProducts();
      loadDashboardData();
      setMessage({ type: 'success', text: 'Product deleted successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({ type: 'error', text: 'Failed to delete product' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleProductSaved = () => {
    loadProducts();
    loadDashboardData();
    setIsEditorOpen(false);
    setSelectedProduct(null);
    setMessage({ type: 'success', text: selectedProduct ? 'Product updated successfully!' : 'Product created successfully!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (product: ProductWithVariants) => {
    setSelectedProduct(product);
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsEditorOpen(true);
  };

  // Gift Basket Management Functions
  const loadGiftBaskets = async () => {
    setLoading(true);
    try {
      const baskets = await fetchGiftBaskets();
      setGiftBaskets(baskets);
    } catch (error) {
      console.error('Error loading gift baskets:', error);
      setMessage({ type: 'error', text: 'Failed to load gift baskets.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditGiftBasket = (giftBasket: GiftBasket) => {
    setSelectedGiftBasket(giftBasket);
    setIsGiftBasketEditorOpen(true);
  };

  const handleAddNewGiftBasket = () => {
    setSelectedGiftBasket(null);
    setIsGiftBasketEditorOpen(true);
  };

  const handleDeleteGiftBasket = async (giftBasketId: string) => {
    if (!confirm('Are you sure you want to delete this gift basket?')) {
      return;
    }

    setActionLoading(`delete-${giftBasketId}`);
    try {
      const { error } = await supabase
        .from('gift_baskets')
        .delete()
        .eq('id', giftBasketId);

      if (error) throw error;

      loadGiftBaskets();
      setMessage({ type: 'success', text: 'Gift basket deleted successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error deleting gift basket:', error);
      setMessage({ type: 'error', text: 'Failed to delete gift basket' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleGiftBasketSaved = () => {
    loadGiftBaskets();
    setIsGiftBasketEditorOpen(false);
    setSelectedGiftBasket(null);
    setMessage({ type: 'success', text: selectedGiftBasket ? 'Gift basket updated successfully!' : 'Gift basket created successfully!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const getStockBadge = (inStock: boolean) => {
    return inStock ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F2E9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-amber-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl font-inter text-gray-600">
            Manage your products and orders
          </p>

          {message && (
            <div className={`mt-4 p-4 rounded-xl ${message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
              <p className="font-inter">{message.text}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-inter text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-playfair font-bold text-amber-900">{stats.totalProducts}</p>
              </div>
              <Package className="w-12 h-12 text-amber-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-inter text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-playfair font-bold text-amber-900">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-amber-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-inter text-gray-600 mb-1">Today's Orders (IST)</p>
                <p className="text-3xl font-playfair font-bold text-amber-900">{stats.todaysOrders}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-amber-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-inter text-gray-600 mb-1">Total Sales (IST)</p>
                <p className="text-3xl font-playfair font-bold text-amber-900">₹{totalSales}</p>
                <p className="text-xs font-inter text-gray-500 mt-1">
                  {new Date(selectedDate).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <Users className="w-12 h-12 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-2 border-b-2 font-inter font-medium text-sm transition-colors duration-200 ${activeTab === 'products'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Product Management
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-2 border-b-2 font-inter font-medium text-sm transition-colors duration-200 ${activeTab === 'orders'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab('top-items')}
                className={`py-4 px-2 border-b-2 font-inter font-medium text-sm transition-colors duration-200 ${activeTab === 'top-items'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Top 15 Items
              </button>
              <button
                onClick={() => setActiveTab('gift-baskets')}
                className={`py-4 px-2 border-b-2 font-inter font-medium text-sm transition-colors duration-200 ${activeTab === 'gift-baskets'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Gift Baskets
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'products' ? (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-2xl font-playfair font-bold text-gray-800">
                    Product Management
                  </h2>
                  <button
                    onClick={handleAddNew}
                    className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                      placeholder="Search by name or category..."
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-xl font-inter font-medium transition-all duration-200 ${selectedCategory === category.id
                          ? 'bg-amber-100 text-amber-900 border-2 border-amber-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-800'
                          }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mb-4"></div>
                    <p className="text-xl font-inter text-gray-600">Loading products...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl font-inter text-gray-600">No products found</p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase">Image</th>
                            <th className="px-4 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase">Category</th>
                            <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">100g Price</th>
                            <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">200g Price</th>
                            <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">500g Price</th>
                            <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">Stock</th>
                            <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {products.map((product) => {
                            const variant100 = product.variants.find(v => v.size_grams === 100);
                            const variant200 = product.variants.find(v => v.size_grams === 200);
                            const variant500 = product.variants.find(v => v.size_grams === 500);

                            return (
                              <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                  <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                </td>
                                <td className="px-4 py-4 text-sm font-inter font-medium text-gray-800">{product.name}</td>
                                <td className="px-4 py-4 text-sm font-inter text-gray-600">{product.category}</td>
                                <td className="px-4 py-4 text-center text-sm font-inter text-gray-800">
                                  {variant100 && variant100.price_inr > 0 ? `₹${variant100.price_inr}` : '-'}
                                </td>
                                <td className="px-4 py-4 text-center text-sm font-inter text-gray-800">
                                  {variant200 && variant200.price_inr > 0 ? `₹${variant200.price_inr}` : '-'}
                                </td>
                                <td className="px-4 py-4 text-center text-sm font-inter text-gray-800">
                                  {variant500 && variant500.price_inr > 0 ? `₹${variant500.price_inr}` : '-'}
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center justify-center space-x-2">
                                    <div className="flex flex-col items-center">
                                      <span className="text-xs text-gray-500">100g</span>
                                      {getStockBadge(variant100?.in_stock || false)}
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-xs text-gray-500">200g</span>
                                      {getStockBadge(variant200?.in_stock || false)}
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-xs text-gray-500">500g</span>
                                      {getStockBadge(variant500?.in_stock || false)}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center justify-center space-x-2">
                                    <button
                                      onClick={() => handleEdit(product)}
                                      className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                      title="Edit Product"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(product.id)}
                                      disabled={actionLoading === `delete-${product.id}`}
                                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                      title="Delete Product"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {totalPages > 1 && (
                      <div className="mt-6 flex justify-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-inter font-medium text-gray-700 transition-colors duration-200"
                        >
                          Previous
                        </button>
                        <span className="px-4 py-2 font-inter text-gray-700">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-inter font-medium text-gray-700 transition-colors duration-200"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : activeTab === 'orders' ? (
              <TodaysOrders
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onTotalSalesChange={handleTotalSalesChange}
              />
            ) : activeTab === 'gift-baskets' ? (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-2xl font-playfair font-bold text-gray-800">
                    Gift Baskets Management
                  </h2>
                  <button
                    onClick={handleAddNewGiftBasket}
                    className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Gift Basket</span>
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mb-4"></div>
                    <p className="text-xl font-inter text-gray-600">Loading gift baskets...</p>
                  </div>
                ) : giftBaskets.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl font-inter text-gray-600">No gift baskets found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase">Image</th>
                          <th className="px-4 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-inter font-semibold text-gray-600 uppercase">Description</th>
                          <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">1 Piece</th>
                          <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">10 Pieces</th>
                          <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">20 Pieces</th>
                          <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">50 Pieces</th>
                          <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">Stock</th>
                          <th className="px-4 py-3 text-center text-xs font-inter font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {giftBaskets.map((basket) => (
                          <tr key={basket.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4">
                              <img
                                src={basket.image_url || 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_uidgtjuidgtjuidg.png'}
                                alt={basket.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            </td>
                            <td className="px-4 py-4 text-sm font-inter font-medium text-gray-800">{basket.name}</td>
                            <td className="px-4 py-4 text-sm font-inter text-gray-600 max-w-xs truncate" title={basket.description}>
                              {basket.description || '-'}
                            </td>
                            <td className="px-4 py-4 text-center text-sm font-inter text-gray-800">₹{basket.price_1}</td>
                            <td className="px-4 py-4 text-center text-sm font-inter text-gray-800">₹{basket.price_10}</td>
                            <td className="px-4 py-4 text-center text-sm font-inter text-gray-800">₹{basket.price_20}</td>
                            <td className="px-4 py-4 text-center text-sm font-inter text-gray-800">₹{basket.price_50}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-center">
                                {getStockBadge(basket.in_stock)}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => handleEditGiftBasket(basket)}
                                  className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                  title="Edit Gift Basket"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteGiftBasket(basket.id)}
                                  disabled={actionLoading === `delete-${basket.id}`}
                                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                  title="Delete Gift Basket"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <TopItemsManagement />
            )}
          </div>
        </div>
      </div>

      <ProductEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSaved={handleProductSaved}
      />

      <GiftBasketEditorModal
        isOpen={isGiftBasketEditorOpen}
        onClose={() => {
          setIsGiftBasketEditorOpen(false);
          setSelectedGiftBasket(null);
        }}
        giftBasket={selectedGiftBasket}
        onSaved={handleGiftBasketSaved}
      />
    </div>
  );
};

export default AdminDashboard;
