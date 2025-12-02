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
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech', 'Sports', 'Politics', 'Economy', 'World', 'Culture', 'Other'];

  // Mock data para desarrollo (reemplazar con API real)
  const mockNews = [
    {
      id: 1,
      title: "Avances revolucionarios en inteligencia artificial transforman la industria tecnológica",
      category: "Tecnología",
      author: "María González",
      date: "2024-11-30",
      readTime: "5 min",
      views: "15.2k",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      excerpt: "Las nuevas capacidades de IA están redefiniendo cómo las empresas operan y cómo interactuamos con la tecnología en nuestra vida diaria.",
      featured: true
    },
    {
      id: 2,
      title: "Descubren nueva especie marina en las profundidades del océano Pacífico",
      category: "Ciencia",
      author: "Dr. Carlos Ruiz",
      date: "2024-11-29",
      readTime: "4 min",
      views: "8.5k",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop",
      excerpt: "Científicos marinos han identificado una fascinante criatura bioluminiscente que habita a más de 3000 metros de profundidad.",
      featured: false
    },
    {
      id: 3,
      title: "El mercado de criptomonedas experimenta un repunte histórico",
      category: "Finanzas",
      author: "Laura Martínez",
      date: "2024-11-29",
      readTime: "6 min",
      views: "12.3k",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=500&fit=crop",
      excerpt: "Los inversores muestran renovado optimismo ante las nuevas regulaciones favorables en los principales mercados globales.",
      featured: false
    },
    {
      id: 4,
      title: "Innovación en energía solar alcanza eficiencia récord del 47%",
      category: "Tecnología",
      author: "Roberto Silva",
      date: "2024-11-28",
      readTime: "7 min",
      views: "9.8k",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
      excerpt: "Nuevos paneles solares de última generación prometen revolucionar la producción de energía limpia a nivel mundial.",
      featured: false
    },
    {
      id: 5,
      title: "Campeonato mundial de esports bate récord de audiencia",
      category: "Deportes",
      author: "Andrea López",
      date: "2024-11-28",
      readTime: "3 min",
      views: "18.7k",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
      excerpt: "Más de 50 millones de espectadores siguieron en vivo la final del torneo internacional de League of Legends.",
      featured: false
    },
    {
      id: 6,
      title: "Reforma educativa integra programación desde primaria",
      category: "Educación",
      author: "Prof. Juan Herrera",
      date: "2024-11-27",
      readTime: "5 min",
      views: "6.2k",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop",
      excerpt: "El nuevo currículo académico prepara a las nuevas generaciones para el mundo digital con habilidades de programación.",
      featured: false
    }
  ];


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
      setNews(data); // Fallback a mock data
      setLoading(false);
    }
  };

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory.toLocaleLowerCase();
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
            <NewsCard key={newsItem._id} news={newsItem} />
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