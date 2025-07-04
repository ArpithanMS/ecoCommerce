import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useAdmin } from '../contexts/AdminContext';
import { categories as baseCategories } from '../data/categories'; // ✅ Centralized import

const ProductGrid: React.FC = () => {
  const { products } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...baseCategories]; // ✅ Unified categories
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-16 bg-[#165f42]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Products</h2>
          <p className="text-white max-w-2xl mx-auto">
            Handpicked organic products crafted with care and love for your wellness journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#DEAA79] text-[#9F8170]'
                  : 'bg-white text-[#9F8170] hover:bg-[#D2B48C] hover:text-[#9F8170]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
