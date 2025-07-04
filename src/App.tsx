import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AboutContact from './components/AboutContact';
import Footer from './components/Footer';

const AppContent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { isAuthenticated } = useAdmin();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleAdminToggle = () => {
    if (isAuthenticated) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAboutToggle = () => {
    setIsAboutOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#759B8C]">
      <Header 
        onCartToggle={handleCartToggle} 
        onAdminToggle={handleAdminToggle}
        onAboutToggle={handleAboutToggle}
      />
      <main>
        <Hero />
        <ProductGrid />
      </main>
      <Footer onAdminToggle={handleAdminToggle}/>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
      />
      
      <AdminLogin 
        isOpen={isAdminLoginOpen} 
        onClose={() => setIsAdminLoginOpen(false)}
      />
      
      <AdminDashboard 
        isOpen={isAdminDashboardOpen} 
        onClose={() => setIsAdminDashboardOpen(false)}
      />

      <AboutContact
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AdminProvider>
  );
}

export default App;