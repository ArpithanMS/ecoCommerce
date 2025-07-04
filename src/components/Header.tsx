import React from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartToggle: () => void;
  onAdminToggle: () => void;
  onAboutToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartToggle, onAboutToggle }) => {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-[#87A96B] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-[#DEAA79]" />
            <h1 className="text-2xl font-bold text-white">Village Eco</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-white hover:text-[#DEAA79] transition-colors">Home</a>
            <a href="#products" className="text-white hover:text-[#DEAA79] transition-colors">Products</a>
            <button 
              onClick={onAboutToggle}
              className="text-white hover:text-[#DEAA79] transition-colors"
            >
              About Us
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCartToggle}
              className="relative p-2 text-white hover:text-[#DEAA79] transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DEAA79] text-[#9F8170] text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;