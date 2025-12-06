import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NewsForm = ({ news, onSubmit, onCancel }) => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Tech',
    image: '',
    author: '',
    featured: false,
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const categories = ['All', 'Tech', 'Sports', 'Politics', 'Economy', 'World', 'Culture', 'Other'];

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || '',
        excerpt: news.excerpt || '',
        content: news.content || '',
        category: news.category || 'Tech',
        image: news.image || '',
        author: news.author || '',
        featured: news.featured || false,
        tags: news.tags || []
      });
    }
  }, [news]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {news ? 'Editar Noticia' : 'Nueva Noticia'}
          </h2>
          <button
            onClick={onCancel}
            className={`p-2 rounded-xl transition-colors ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
              placeholder="Título de la noticia"
            />
          </div>

          {/* Categoría y Autor */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
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
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
                placeholder="Nombre del autor"
              />
            </div>
          </div>

          {/* Imagen URL */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              URL de la imagen *
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className={`flex-1 px-4 py-3 rounded-xl border transition-all outline-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <button
                type="button"
                className={`px-4 py-3 rounded-xl transition-colors ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <ImageIcon size={20} />
              </button>
            </div>
            {formData.image && (
              <img 
                src={formData.image} 
                alt="Preview" 
                className="mt-3 w-full h-48 object-cover rounded-xl"
              />
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Resumen *
            </label>
            <textarea
              required
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
              placeholder="Breve resumen de la noticia"
            />
          </div>

          {/* Contenido */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Contenido completo *
            </label>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
              placeholder="Contenido completo de la noticia (soporta HTML básico)"
            />
          </div>

          {/* Tags */}
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
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className={`flex-1 px-4 py-2 rounded-xl border transition-all outline-none ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                }`}
                placeholder="Agregar etiqueta"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
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
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Noticia destacada */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="featured" className={`font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Marcar como noticia destacada
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all"
            >
              {news ? 'Actualizar' : 'Crear'} Noticia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;