import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const { FiShoppingCart, FiSearch, FiUser, FiMenu, FiX, FiPackage } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books',
    'Sports',
    'Beauty',
    'Automotive',
    'Toys'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/search?q=${searchQuery}`);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              Tipkart
            </motion.div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-r-md transition-colors"
              >
                <SafeIcon icon={FiSearch} className="text-gray-800" />
              </button>
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Track Order */}
            <Link to="/track-order" className="hidden md:flex items-center space-x-2">
              <SafeIcon icon={FiPackage} className="text-xl" />
              <span className="text-sm">Track Order</span>
            </Link>

            {/* User Account */}
            <div className="hidden md:flex items-center space-x-2">
              <SafeIcon icon={FiUser} className="text-xl" />
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Hi, {user.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => login({ name: 'User', email: 'user@example.com' })}
                  className="text-sm hover:underline"
                >
                  Login
                </button>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-1"
              >
                <SafeIcon icon={FiShoppingCart} className="text-xl" />
                <span className="hidden md:inline text-sm">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="hidden md:flex items-center space-x-6 py-2 border-t border-blue-500">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
              className="text-sm hover:text-yellow-300 transition-colors"
            >
              {category}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-blue-700 py-4"
          >
            <form onSubmit={handleSearch} className="px-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-r-md"
                >
                  <SafeIcon icon={FiSearch} className="text-gray-800" />
                </button>
              </div>
            </form>

            <Link
              to="/track-order"
              className="block px-4 py-2 text-sm hover:bg-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Track Order
            </Link>

            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                  className="block px-4 py-2 text-sm hover:bg-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;