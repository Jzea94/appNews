import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NewsForm = ({ news, onSubmit, onCancel }) => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Tecnología',
    image: '',
    author: '',
    featured: false,
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['all', 'tech', 'sports', 'politics', 'economy', 'world', 'culture', 'other'];

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || '',
        content: news.content || '',
        excerpt: news.excerpt || '',
        category: news.category || 'tech',
        image: news.image || '',
        author: news.author || '',
        featured: news.featured || false,
        tags: news.tags || []
      });
    }
  }, [news]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={onCancel}
        ></div>
        
        <div className={`relative max-w-4xl w-full rounded-3xl shadow-2xl ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-6 border-b ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          } rounded-t-3xl`}>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {news ? 'Editar Noticia' : 'Nueva Noticia'}
            </h2>
            <button
              onClick={onCancel}
              disabled={loading}
              className={`p-2 rounded-xl transition-colors ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } disabled:opacity-50`}
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Título *
              </label>
              <input
                type="text"
                required
                disabled={loading}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } disabled:opacity-50`}
                placeholder="Título de la noticia"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  disabled={loading}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } disabled:opacity-50`}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Autor *
                </label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } disabled:opacity-50`}
                  placeholder="Nombre del autor"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                URL de la imagen
              </label>
              <input
                type="url"
                disabled={loading}
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } disabled:opacity-50`}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.image && (
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="mt-3 w-full h-48 object-cover rounded-xl"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Resumen
              </label>
              <textarea
                rows={3}
                disabled={loading}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } disabled:opacity-50`}
                placeholder="Breve resumen de la noticia"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Contenido completo *
              </label>
              <textarea
                required
                rows={12}
                disabled={loading}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } disabled:opacity-50`}
                placeholder="Contenido completo de la noticia"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Etiquetas
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  disabled={loading}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className={`flex-1 px-4 py-2 rounded-xl border transition-all outline-none ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } disabled:opacity-50`}
                  placeholder="Agregar etiqueta"
                />
                <button
                  type="button"
                  onClick={addTag}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50"
                >
                  Agregar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm flex items-center space-x-2 ${
                      darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      disabled={loading}
                      className="hover:text-red-500 disabled:opacity-50"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                disabled={loading}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
              />
              <label htmlFor="featured" className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Marcar como noticia destacada
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                } disabled:opacity-50`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  news ? 'Actualizar' : 'Crear'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsForm;