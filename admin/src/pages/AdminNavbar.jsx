import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut, User, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-colors ${
      darkMode 
        ? 'bg-gray-900/80 border-gray-800' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-xl text-white shadow-lg">
              N
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NewsHub
              </span>
              <span className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Panel Admin
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl transition-all ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } shadow-sm`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <User size={18} />
                <span className="hidden md:inline font-medium">
                  {user?.name || 'Usuario'}
                </span>
              </button>

              {showUserMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className={`px-4 py-3 border-b ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.name}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center space-x-2 px-4 py-3 transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'
                    }`}
                  >
                    <LogOut size={18} />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;