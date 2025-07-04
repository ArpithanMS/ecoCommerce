//..src/components/AdminDashboard.tsx
import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import ProductForm from './ProductForm';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { products, logout, deleteProduct, updateProduct } = useAdmin();
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price / 100);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleEdit = (productId: string) => {
    setEditingProduct(productId);
    setShowProductForm(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId);
    }
  };


  const handleToggleAvailability = (productId: string, available: boolean) => {
    updateProduct(productId, { available: !available });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-[#9F8170]">Admin Dashboard</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-[#9F8170] hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#DEAA79] rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-[#9F8170]" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-[#9F8170]">Products Management</h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowProductForm(true);
                }}
                className="flex items-center space-x-2 bg-[#DEAA79] text-[#9F8170] px-4 py-2 rounded-lg hover:bg-[#D2B48C] transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-[#375023] rounded-lg p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">{product.name}</h4>
                    <p className="text-sm text-[#DEAA79]">{product.category}</p>
                    <p className="text-[#DEAA79] font-semibold">{formatPrice(product.price)}</p>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <button
                        onClick={() => handleToggleAvailability(product.id, product.available)}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          product.available 
                            ? 'bg-[#000000] text-[#9F8170]' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.available ? 'Available' : 'Unavailable'}
                      </button>
                      
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="p-1 text-[#DEAA79] hover:text-white"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1 text-red-300 hover:text-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showProductForm && (
        <ProductForm
          isOpen={showProductForm}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
          editingProductId={editingProduct}
        />
      )}
    </div>
  );
};

export default AdminDashboard;