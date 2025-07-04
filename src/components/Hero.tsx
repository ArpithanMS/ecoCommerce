import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="bg-gradient-to-r from-[#468651] to-[#87A96B] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pure <span className="text-[#DEAA79]">Organic</span> Wellness
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Discover our handcrafted collection of organic massage oils, essential oils, and beautiful handicrafts made with love and care.
          </p>
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#DEAA79] text-[#9F8170] px-8 py-3 rounded-lg font-semibold hover:bg-[#D2B48C] transition-colors shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;