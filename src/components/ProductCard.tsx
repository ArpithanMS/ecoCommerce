import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price / 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="h-4 w-4 text-[#9F8170]" />
          </button>
        </div>
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[#9F8170] group-hover:text-[#759B8C] transition-colors">
            {product.name}
          </h3>
          <span className="text-sm text-[#9F8170] bg-[#DEAA79] px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <p className="text-[#9F8170] text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-[#9F8170]">
            {formatPrice(product.price)}
          </span>
          
          <button
            onClick={() => addToCart(product)}
            disabled={!product.available}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              product.available
                ? 'bg-[#DEAA79] text-[#9F8170] hover:bg-[#D2B48C]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;