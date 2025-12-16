import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { newsAPI } from '../api/news.api';
import Navbar from '../components/Navbar';
import NewsForm from '../components/NewsForm';
import NewsTable from '../components/NewsTable';

const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'tech', 'sports', 'politics', 'economy', 'world', 'culture', 'other'];

  const isSuperAdmin = user?.role === 'superadmin';

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [news, searchQuery, filterCategory]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await newsAPI.getAllNews();
      setNews(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const filterNews = () => {
    let filtered = news;

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  };

  const handleCreate = async (formData) => {
    try {
      await newsAPI.createNews(formData);
      await loadNews();
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.msg || 'Error al crear la noticia');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await newsAPI.updateNews(editingNews._id, formData);
      await loadNews();
      setShowForm(false);
      setEditingNews(null);
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.msg || 'Error al actualizar la noticia');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta noticia?')) return;

    try {
      await newsAPI.deleteNews(id);
      await loadNews();
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.msg || 'Error al eliminar la noticia');
    }
  };

  const openEditForm = (newsItem) => {
    setEditingNews(newsItem);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingNews(null);
  };

  if (loading) {
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
          <div className="flex gap-3">
            {isSuperAdmin && (
              <button
                onClick={() => navigate('/users')}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all shadow-lg"
              >
                <Users size={20} />
                <span>Usuarios</span>
              </button>
            )}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-lg"
            >
              <Plus size={20} />
              <span>Nueva Noticia</span>
            </button>
          </div>
        </div>

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
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
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
          news={editingNews}
          onSubmit={editingNews ? handleUpdate : handleCreate}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

export default Dashboard;