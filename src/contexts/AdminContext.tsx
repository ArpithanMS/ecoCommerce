//..src/components/AdminContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AdminContextType, Product } from '../types';
import { initialProducts } from '../data/products';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedProducts = localStorage.getItem('adminProducts');
    
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  const login = (password: string) => {
    // Simple password check - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = async (id: string) => {
    const productToDelete = products.find(product => product.id === id);

    // ✅ Attempt to delete uploaded image if it's a local file
    if (productToDelete?.image?.startsWith('/uploads/')) {
      try {
        await fetch('http://localhost:5000/delete-image', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imagePath: productToDelete.image }),
        });
      } catch (error) {
        console.error('Failed to delete image from server:', error);
      }
    }

    // 🗑️ Remove product from local state
    setProducts(prev => prev.filter(product => product.id !== id));
  };


  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      products,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </AdminContext.Provider>
  );
};