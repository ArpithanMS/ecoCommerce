//../src/components/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { categories } from '../data/categories';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingProductId?: string | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, editingProductId }) => {
  const { products, addProduct, updateProduct } = useAdmin();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    available: true,
    isUsingLocalImage: false
  });

  useEffect(() => {
    if (editingProductId) {
      const product = products.find(p => p.id === editingProductId);
      if (product) {
        setFormData({
          name: product.name,
          price: (product.price / 100).toString(),
          description: product.description,
          image: product.image,
          category: product.category,
          available: product.available,
          isUsingLocalImage: false
        });
      }
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        category: '',
        available: true,
        isUsingLocalImage: false,
      });
    }
  }, [editingProductId, products]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: Math.round(parseFloat(formData.price) * 100),
      description: formData.description,
      image: formData.image,
      category: formData.category,
      available: formData.available
    };

    if (editingProductId) {
      updateProduct(editingProductId, productData);
    } else {
      addProduct(productData);
    }

    onClose();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const form = new FormData();
  form.append('image', file);

  try {
    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: form
    });

    const data = await res.json();
    setFormData({
      ...formData,
      image: data.path, // path returned by the backend
      isUsingLocalImage: true
    });
  } catch (err) {
    console.error('Upload error:', err);
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-[#9F8170]">
              {editingProductId ? 'Edit Product' : 'Add New Product'}
            </h2>
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
                <label className="block text-sm font-medium text-[#9F8170] mb-2">
                  Product Name
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
                <label className="block text-sm font-medium text-[#9F8170] mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#9F8170] mb-2">
                  Category
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#9F8170] mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#9F8170] mb-2">
                  Upload or Enter Image URL
                </label>

                <div className="space-y-3">
                  {/* File Upload */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg"
                  />

                  {/* External URL Input (e.g., Unsplash, Pexels) */}
                  <input
                    type="url"
                    placeholder="Or paste image URL (e.g. https://images.unsplash.com/...)"
                    value={!formData.isUsingLocalImage ? formData.image : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.value,
                        isUsingLocalImage: false
                      })
                    }
                    className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg"
                  />
                </div>

                {/* Preview */}
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="preview"
                    className="mt-3 max-h-36 rounded border"
                  />
                )}
              </div>



              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="rounded border-[#D2B48C] text-[#759B8C] focus:ring-[#759B8C]"
                  />
                  <span className="text-sm font-medium text-[#9F8170]">
                    Product is available for purchase
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-[#D2B48C] rounded-lg text-[#9F8170] hover:bg-[#DEAA79] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#DEAA79] text-[#9F8170] rounded-lg hover:bg-[#D2B48C] transition-colors"
              >
                {editingProductId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;