import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { newsAPI } from '../api/news.api';
import Navbar from '../components/Navbar';
import NewsForm from '../components/NewsForm';
import NewsTable from '../components/NewsTable';

const Dashboard = () => {
  const { darkMode } = useTheme();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  const isFormOpening = useRef(false);

  const categories = ['All', 'Tech', 'Sports', 'Politics', 'Economy', 'World', 'Culture', 'Other'];

  // Usar useCallback para evitar recreación de funciones
  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await newsAPI.getAllNews();
      setNews(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('render desde dashboard: 1');
    loadNews();
  }, []);

  // Usar useMemo para filteredNews para evitar renderizados innecesarios
    const filteredNews = useMemo(() => {
      let filtered = news;
      
      if (filterCategory !== 'All') {
        filtered = filtered.filter(item => item.category.toLowerCase() === filterCategory.toLowerCase());
      }
      
      if (searchQuery) {
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      return filtered;
    }, [news, searchQuery, filterCategory]);

  // Usar useCallback para las funciones handlers
  const handleCreate = useCallback(async (formData) => {
    try {
      await newsAPI.createNews(formData);
      await loadNews();
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear la noticia');
    }
  }, [loadNews]);

  const handleUpdate = useCallback(async (formData) => {
    try {
      await newsAPI.updateNews(editingNews._id, formData);
      await loadNews();
      setShowForm(false);
      setEditingNews(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar la noticia');
    }
  }, [editingNews, loadNews]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta noticia?')) return;

    try {
      await newsAPI.deleteNews(id);
      await loadNews();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la noticia');
    }
  }, [loadNews]);

  const openEditForm = useCallback((newsItem) => {
    // Evitar múltiples llamadas si ya se está abriendo
    if (isFormOpening.current) return;
    
    isFormOpening.current = true;
    setEditingNews(newsItem);
    setShowForm(true);
    
    // Resetear después de un breve tiempo
    setTimeout(() => {
      isFormOpening.current = false;
    }, 100);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingNews(null);
  }, []);

    // Renderizado condicional mejorado
  if (loading && news.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Cargando noticias...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Gestión de Noticias
            </h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {filteredNews.length} {filteredNews.length === 1 ? 'noticia' : 'noticias'}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-lg"
          >
            <Plus size={20} />
            <span>Nueva Noticia</span>
          </button>
        </div>
        {/*SearchaBar*/}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className={`relative rounded-xl overflow-hidden ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          } shadow-lg`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 outline-none ${
                darkMode 
                  ? 'bg-gray-900 text-white placeholder-gray-500' 
                  : 'bg-white text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
          {/*Filter Options*/}
          <div className={`relative rounded-xl overflow-hidden ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          } shadow-lg`}>
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 outline-none appearance-none ${
                darkMode 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-900'
              }`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <NewsTable 
          news={filteredNews}
          onEdit={openEditForm}
          onDelete={handleDelete}
        />
      </main>

      {showForm && (
        <NewsForm
          key={editingNews?._id}
          news={editingNews}
          onSubmit={editingNews ? handleUpdate : handleCreate}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
