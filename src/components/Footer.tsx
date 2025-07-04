import React from 'react';
import { Leaf, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { categories } from '../data/categories';

interface FooterProps {
  onAdminToggle: () => void;
}
const Footer: React.FC <FooterProps>= ( {onAdminToggle} ) => {
  return (
    <footer className="bg-[#2a4e0d] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-9">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-[#DEAA79]" />
              <h3 className="text-xl font-bold">Village Eco</h3>
            </div>
            <p className="text-[#D2B48C] mb-4">
              Handcrafted organic products for your wellness journey. Made with love and care.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/yourpage"  // <- Replace this with your actual Instagram handle
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5 text-[#D2B48C] hover:text-[#DEAA79] cursor-pointer transition-colors" />
              </a>
            </div>

          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-[#D2B48C]">
              <li><a href="#home" className="hover:text-[#DEAA79] transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-[#DEAA79] transition-colors">Products</a></li>
              <li><a href="#about" className="hover:text-[#DEAA79] transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="columns-1 sm:columns-2 gap-4 space-y-1 text-[#D2B48C]">
              {categories.map((cat) => (
                <li key={cat}>
                  <a href="#" className="hover:text-[#DEAA79] transition-colors">{cat}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-[#D2B48C]">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>contact@organicessence.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>+91 01234 56789</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>Vythiri, Wayanad, Kerala</span>
              </div>
            </div>
          </div>

          <div>
          <h4 className="font-semibold mb-4">Admin</h4>
          <ul className="space-y-2 text-[#D2B48C]">
            <li>
             <button
                onClick={onAdminToggle}
                className="hover:text-[#DEAA79] transition-colors underline"
              >
                Admin Dashboard
              </button>
            </li>
          </ul>
        </div>
        </div>

        <div className="border-t border-[#D2B48C] mt-8 pt-8 text-center text-[#D2B48C]">
          <p>&copy; 2024 Organic Essence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;