import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price / 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, integrate with Razorpay here
    alert('Order placed successfully! This is a demo - integrate with Razorpay for actual payments.');
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-[#9F8170]">Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#DEAA79] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#9F8170]" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#9F8170]">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm text-[#9F8170]">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-[#9F8170]">Total:</span>
                    <span className="text-[#9F8170]">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#9F8170]">Shipping Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#9F8170] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#9F8170] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#9F8170] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#9F8170] mb-1">
                      Address
                    </label>
                    <textarea
                      required
                      className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#9F8170] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#9F8170] mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-[#9F8170]">Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI', icon: Smartphone },
                  { id: 'netbanking', label: 'Net Banking', icon: Building }
                ].map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
                      paymentMethod === method.id 
                        ? 'border-[#759B8C] bg-[#87A96B] text-white' 
                        : 'border-[#D2B48C] hover:border-[#759B8C] text-[#9F8170]'
                    }`}
                  >
                    <method.icon className="h-5 w-5" />
                    <span className="font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                type="submit"
                className="w-full bg-[#DEAA79] text-[#9F8170] py-3 rounded-lg font-semibold hover:bg-[#D2B48C] transition-colors"
              >
                Place Order - {formatPrice(getTotalPrice())}
              </button>
              <p className="text-sm text-[#9F8170] mt-2 text-center">
                Secure payment powered by Razorpay
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;