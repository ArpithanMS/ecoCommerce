import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('Invalid password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-[#9F8170]">Admin Login</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#DEAA79] rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-[#9F8170]" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="text-center mb-6">
              <Lock className="h-12 w-12 text-[#759B8C] mx-auto mb-4" />
              <p className="text-[#9F8170]">Enter admin password to access dashboard</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#9F8170] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-[#D2B48C] rounded-lg focus:ring-2 focus:ring-[#759B8C] focus:border-[#759B8C]"
                placeholder="Enter password"
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#DEAA79] text-[#9F8170] py-2 rounded-lg font-semibold hover:bg-[#D2B48C] transition-colors"
            >
              Login
            </button>
            
            <p className="text-sm text-[#9F8170] mt-4 text-center">
              Demo password: admin123
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;