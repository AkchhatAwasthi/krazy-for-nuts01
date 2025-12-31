import React, { useState, useEffect } from 'react';
import { Calendar, User, Mail, Phone, MapPin, Package, Clock, CalendarDays } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// Helper function to convert IST date to UTC range
const getUtcRangeForIstDate = (selectedDate: string) => {
  // Create start and end of day in IST (UTC+5:30)
  const start = new Date(`${selectedDate}T00:00:00+05:30`);
  const end = new Date(`${selectedDate}T23:59:59+05:30`);
  
  return {
    startUtc: start.toISOString(),
    endUtc: end.toISOString(),
  };
};

interface OrderItem {
  id: string;
  product_name: string;
  weight: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customer_name: string;
  email: string;
  phone_number: string;
  address: string;
  status: 'pending' | 'delivered' | 'cancelled';
  created_at: string;
  order_items: OrderItem[];
}

interface TodaysOrdersProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onTotalSalesChange: (total: number) => void;
}

const TodaysOrders: React.FC<TodaysOrdersProps> = ({ 
  selectedDate, 
  onDateChange, 
  onTotalSalesChange 
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  useEffect(() => {
    loadOrdersForDate();
  }, [selectedDate]);

  const loadOrdersForDate = async () => {
    setLoading(true);
    try {
      // Convert IST date to UTC range for proper filtering
      const { startUtc, endUtc } = getUtcRangeForIstDate(selectedDate);
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', startUtc)
        .lte('created_at', endUtc)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
      
      // Calculate total sales for the selected date
      const totalSales = (data || []).reduce((total, order) => {
        return total + calculateOrderTotal(order.ordered_items || []);
      }, 0);
      
      onTotalSalesChange(totalSales);
    } catch (error) {
      console.error('Error loading orders for date:', error);
      setOrders([]);
      onTotalSalesChange(0);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: 'pending' | 'delivered' | 'cancelled') => {
    setUpdatingStatus(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      // Recalculate total sales after status update
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      const totalSales = updatedOrders.reduce((total, order) => {
        return total + calculateOrderTotal(order.ordered_items || []);
      }, 0);
      onTotalSalesChange(totalSales);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setUpdatingStatus(null);
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

  const calculateOrderTotal = (orderedItems: any[]) => {
    if (!orderedItems || !Array.isArray(orderedItems) || orderedItems.length === 0) return 0;
    return orderedItems.reduce((total, item) => {
      const itemTotal = item.total || (item.price * item.quantity) || 0;
      return total + itemTotal;
    }, 0);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900 mb-4"></div>
        <p className="text-xl font-inter text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-playfair font-bold text-gray-800 flex items-center">
            <Calendar className="w-8 h-8 text-amber-600 mr-3" />
            Orders
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-amber-600" />
            <label className="text-sm font-inter font-semibold text-gray-700">
              Select Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter text-sm bg-white"
            />
          </div>
          <div className="text-sm font-inter text-gray-600">
            {new Date(selectedDate).toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-playfair font-semibold text-gray-600 mb-2">
            No Orders Found
          </h3>
          <p className="text-gray-500 font-inter">
            No orders have been placed on {new Date(selectedDate).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-playfair font-bold text-gray-800">
                      Order #{order.id}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 font-inter">
                        {new Date(order.created_at).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="font-inter text-gray-700">{order.customer_name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="font-inter text-gray-700">{order.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="font-inter text-gray-700">{order.phone_number}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <span className="font-inter text-gray-700">{order.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="text-lg font-inter font-semibold text-gray-800 mb-3 flex items-center">
                  <Package className="w-5 h-5 text-amber-600 mr-2" />
                  Ordered Items
                </h4>
                <div className="bg-white rounded-xl p-4 space-y-3">
                  {Array.isArray(order.ordered_items) && order.ordered_items.length > 0 ? (
                    order.ordered_items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <span className="font-inter font-medium text-gray-800">{item.product_name || item.name}</span>
                        <span className="text-sm text-gray-600 ml-2">({item.weight})</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-inter text-gray-600">Qty: {item.quantity}</span>
                        <span className="font-inter font-semibold text-amber-900">₹{item.total || (item.price * item.quantity)}</span>
                      </div>
                    </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 font-inter">
                      No items found for this order
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-playfair font-bold text-gray-800">Total Amount:</span>
                      <span className="text-xl font-playfair font-bold text-amber-900">
                        ₹{calculateOrderTotal(order.ordered_items || [])}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="font-inter font-medium text-gray-700">Update Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    disabled={updatingStatus === order.id}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter text-sm bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-inter text-gray-600">
                    Last updated: {new Date(order.created_at).toLocaleString('en-IN')}
                  </div>
                </div>
                
                {updatingStatus === order.id && (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-900"></div>
                    <span className="text-sm font-inter text-gray-600">Updating...</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysOrders;