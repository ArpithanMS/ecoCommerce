import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price / 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-[#9F8170]">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#DEAA79] rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-[#9F8170]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-[#D2B48C] mx-auto mb-4" />
              <p className="text-[#9F8170]">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-[#5c7945] rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.product.name}</h3>
                    <p className="text-[#DEAA79] font-semibold">
                      {formatPrice(item.product.price)}
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#759B8C] rounded"
                      >
                        <Minus className="h-4 w-4 text-white" />
                      </button>
                      <span className="w-8 text-center text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#759B8C] rounded"
                      >
                        <Plus className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-300 hover:text-red-100 p-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-[#9F8170]">Total:</span>
              <span className="text-xl font-bold text-[#9F8170]">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            
            <button
              onClick={onCheckout}
              className="w-full bg-[#DEAA79] text-[#9F8170] py-3 rounded-lg font-semibold hover:bg-[#D2B48C] transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;