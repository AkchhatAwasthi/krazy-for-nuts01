import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, CreditCard, CheckCircle, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { CartItem } from './CartSidebar';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onOrderComplete 
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    customerName: user?.user_metadata?.full_name || '',
    phoneNumber: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [previewOrderId, setPreviewOrderId] = useState<number | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const handlingCharge = 9;
  const finalAmount = totalAmount + handlingCharge - discountAmount;

  // ✅ Reset modal state every time it opens
  useEffect(() => {
    if (isOpen) {
      setOrderComplete(false);
      setOrderId(null);
      setError('');
      setFormData({
        customerName: user?.user_metadata?.full_name || '',
        phoneNumber: '',
        address: ''
      });
      setPreviewOrderId(null);
      setDiscountPercentage(0);
      setDiscountAmount(0);
    }
  }, [isOpen, user]);

  // Load preview order ID and calculate discount when modal opens
  useEffect(() => {
    if (isOpen && user) {
      loadPreviewOrderId();
    }
  }, [isOpen, user]);

  // Calculate discount when order ID or total amount changes
  useEffect(() => {
    if (previewOrderId && totalAmount > 0) {
      const discount = calculateDiscount(previewOrderId);
      setDiscountPercentage(discount);
      setDiscountAmount(Math.round(totalAmount * (discount / 100)));
    }
  }, [previewOrderId, totalAmount]);

  const loadPreviewOrderId = async () => {
    try {
      // Get the current sequence value for preview only (doesn't increment)
      const { data, error } = await supabase
        .from('orders')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      if (error) throw error;

      // Calculate what the next order ID would be without incrementing sequence
      const nextId = data && data.length > 0 ? data[0].id + 1 : 55;
      setPreviewOrderId(nextId);
    } catch (error) {
      console.error('Error loading preview order ID:', error);
      setPreviewOrderId(55); // Fallback to 55
    }
  };

  const calculateDiscount = (orderId: number): number => {
    if (orderId >= 55 && orderId <= 105) {
      return 10; // 10% discount
    } else if (orderId >= 106 && orderId <= 155) {
      return 7; // 7% discount
    } else if (orderId >= 156 && orderId <= 206) {
      return 5; // 5% discount
    }
    return 0; // No discount
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // ✅ Check minimum order amount
    if (finalAmount < 400) {
      setError(`Minimum order amount is ₹400. Your final total is ₹${finalAmount}.`);
      return;
    }

    // Validate required fields
    if (!formData.customerName.trim()) {
      setError('Please enter your full name');
      return;
    }
    
    if (!formData.phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }
    
    if (!formData.address.trim()) {
      setError('Please enter your delivery address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          customer_name: formData.customerName,
          email: user.email!,
          phone_number: formData.phoneNumber,
          address: formData.address,
          status: 'pending',
          discount_percentage: discountPercentage,
          discount_amount: discountAmount,
          handling_charge: handlingCharge,
          original_amount: totalAmount,
          final_amount: finalAmount,
          ordered_items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            weight: item.weight,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
          }))
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        weight: item.weight,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrderId(orderData.id);
      setOrderComplete(true);
      onOrderComplete();
    } catch (err: any) {
      setError(err.message || 'An error occurred while placing your order');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const resetAndClose = () => {
    setOrderComplete(false);
    setOrderId(null);
    setFormData({
      customerName: user?.user_metadata?.full_name || '',
      phoneNumber: '',
      address: ''
    });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-8">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {orderComplete ? (
            <div className="text-center py-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-playfair font-bold text-green-700 mb-4">
                Order Placed Successfully!
              </h2>
              <p className="text-xl font-inter text-gray-600 mb-6">
                Your order ID is: <span className="font-bold text-amber-900">#{orderId}</span>
              </p>
              {discountPercentage > 0 && (
                <div className="bg-green-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Tag className="w-5 h-5" />
                    <span className="font-inter font-semibold">
                      {discountPercentage}% Discount Applied!
                    </span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    You saved ₹{discountAmount} on this order
                  </p>
                </div>
              )}
              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <p className="text-green-800 font-inter">
                  Thank you for your order! We'll process it shortly and keep you updated via Whatsapp.
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <CreditCard className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                <h2 className="text-3xl font-playfair font-bold text-amber-900 mb-2">
                  Checkout
                </h2>
                <p className="text-gray-600 font-inter">
                  Complete your order details
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm font-inter">{error}</p>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-amber-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-playfair font-bold text-amber-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.weight}`} className="flex justify-between items-center">
                      <div>
                        <span className="font-inter font-medium text-gray-800">{item.name}</span>
                        <span className="text-sm text-gray-600 ml-2">({item.weight}) x {item.quantity}</span>
                      </div>
                      <span className="font-inter font-semibold text-amber-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-amber-200 pt-3 mt-3">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-inter text-gray-700">Subtotal:</span>
                        <span className="text-base font-inter text-gray-700">₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-base font-inter text-gray-700">Handling Charge:</span>
                        <span className="text-base font-inter text-gray-700">₹{handlingCharge}</span>
                      </div>
                      {discountPercentage > 0 && (
                        <>
                          <div className="flex justify-between items-center text-green-600">
                            <span className="text-base font-inter flex items-center">
                              <Tag className="w-4 h-4 mr-1" />
                              Discount ({discountPercentage}%):
                            </span>
                            <span className="text-base font-inter">-₹{discountAmount}</span>
                          </div>
                          <div className="border-t border-amber-200 pt-2">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-playfair font-bold text-gray-800">Final Total:</span>
                              <span className="text-xl font-playfair font-bold text-amber-900">₹{finalAmount}</span>
                            </div>
                          </div>
                        </>
                      )}
                      {discountPercentage === 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-playfair font-bold text-gray-800">Total:</span>
                          <span className="text-xl font-playfair font-bold text-amber-900">₹{totalAmount + handlingCharge}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount Information */}
              {previewOrderId && (
                <div className="mb-6">
                  {discountPercentage > 0 ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 text-green-800 mb-2">
                        <Tag className="w-5 h-5" />
                        <span className="font-inter font-semibold">
                          🎉 Congratulations! You're getting {discountPercentage}% off!
                        </span>
                      </div>
                      <p className="text-green-700 text-sm">
                        Your order ID #{previewOrderId} qualifies for our special discount offer. 
                        You'll save ₹{discountAmount} on this order!
                      </p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 text-blue-800 mb-2">
                        <Tag className="w-5 h-5" />
                        <span className="font-inter font-semibold">
                          Your Order ID: #{previewOrderId}
                        </span>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Keep shopping! Orders #55-105 get 10% off, #106-155 get 7% off, and #156-206 get 5% off.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 font-inter"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-inter"
                      placeholder="Enter your complete delivery address"
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-blue-800 font-inter text-sm">
                    <strong>Note:</strong>You should login through your email to place order. Your order will be placed immediately. 
                    We'll contact you for payment and delivery coordination.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-inter font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
