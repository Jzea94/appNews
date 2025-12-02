import React, { useState, useEffect } from 'react';
import { newsAPI } from '../api/news.api';
import { useThemeStore } from '../store/theme';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FeaturedNews from '../components/FeaturedNews';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';

const Home = () => {
  const { darkMode } = useThemeStore();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Tecnología', 'Ciencia', 'Finanzas', 'Deportes', 'Educación'];

  // Mock data para desarrollo (reemplazar con API real)
  

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);

      const data = await newsAPI.getAllNews();
      setNews(data);

      setLoading(false);
    } catch (error) {
      console.error('Error al cargar noticias:', error);
      setNews(mockNews); // Fallback a mock data
      setLoading(false);
    }
  };

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.find(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-950' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Cargando noticias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <FeaturedNews news={featuredNews} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map(newsItem => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No se encontraron noticias que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;