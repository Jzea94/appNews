import React from 'react';
import { Search } from 'lucide-react';
import { useThemeStore } from '../store/theme';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  const { darkMode } = useThemeStore();

  return (
    <div className="mb-8">
      <div className={`relative max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar noticias..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`w-full pl-12 pr-4 py-4 text-lg outline-none transition-colors ${
            darkMode 
              ? 'bg-gray-900 text-white placeholder-gray-500' 
              : 'bg-white text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>
    </div>
  );
};

export default SearchBar;