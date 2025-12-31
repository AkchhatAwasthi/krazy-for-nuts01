import React, { useState, useEffect } from 'react';
import { Package, Calendar, Phone, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

interface OrderItem {
  id: number;
  name: string;
  weight: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: number;
  customer_name: string;
  email: string;
  phone_number: string;
  address: string;
  status: 'pending' | 'delivered' | 'cancelled';
  created_at: string;
  ordered_items: OrderItem[];
}

const MyOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserOrders();
    }
  }, [user]);

  const loadUserOrders = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateOrderTotal = (orderedItems: OrderItem[]) => {
    return orderedItems.reduce((total, item) => total + item.total, 0);
  };

  const handleWhatsAppClick = (orderId: number) => {
    const phoneNumber = '+919903305374';
    const message = `Hi, what is my order status for order ID ${orderId}?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F2E9] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mb-4"></div>
            <p className="text-xl font-inter text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2E9] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-amber-900 mb-2">
            My Orders
          </h1>
          <p className="text-xl font-inter text-gray-600">
            Track your order history and status
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-playfair font-semibold text-gray-600 mb-2">
              No Orders Yet
            </h3>
            <p className="text-lg font-inter text-gray-500 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <a
              href="/products"
              className="inline-flex items-center bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Package className="w-5 h-5 mr-2" />
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-2">
                        Order #{order.id}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm font-inter text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center">
                          <Package className="w-4 h-4 mr-1" />
                          {order.ordered_items?.length || 0} items
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-amber-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-amber-600" />
                      <span className="font-inter text-gray-700">{order.phone_number}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
                      <span className="font-inter text-gray-700">{order.address}</span>
                    </div>
                  </div>

                  {/* Ordered Items */}
                  <div className="mb-6">
                    <h4 className="text-lg font-inter font-semibold text-gray-800 mb-4">
                      Ordered Items
                    </h4>
                    <div className="space-y-3">
                      {order.ordered_items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h5 className="font-inter font-medium text-gray-800">{item.product_name || item.name}</h5>
                            <p className="text-sm text-gray-600">
                              Weight: {item.weight} | Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-inter font-semibold text-amber-900">₹{item.total}</p>
                            <p className="text-sm text-gray-600">₹{item.price} each</p>
                          </div>
                        </div>
                      )) || (
                        <p className="text-gray-500 font-inter">No items found</p>
                      )}
                    </div>
                  </div>

                  {/* Order Total and Actions */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="mb-4 sm:mb-0">
                        <p className="text-2xl font-playfair font-bold text-amber-900">
                          Total: ₹{calculateOrderTotal(order.ordered_items || [])}
                        </p>
                      </div>
                      <button
                        onClick={() => handleWhatsAppClick(order.id)}
                        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-inter font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Check Status on WhatsApp</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;