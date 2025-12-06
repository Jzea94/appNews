import { Edit, Trash2, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { formatDate } from '../helpers/formatDate'

const NewsTable = ({ news, onEdit, onDelete }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`rounded-2xl overflow-hidden shadow-xl ${
      darkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                News
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Category
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Author
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Date
              </th>
              <th className={`px-6 py-4 text-left text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Views
              </th>
              <th className={`px-6 py-4 text-right text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
            {news.map(item => (
              <tr key={item._id} className={`transition-colors ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
              }`}>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </p>
                      {item.featured && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-red-500/20 text-red-500 text-xs rounded-full">
                          Destacada
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.category}
                  </span>
                </td>
                <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.author}
                </td>
                <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatDate(item.createdAt)}
                </td>
                <td className={`px-6 py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{item.views || 0}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode 
                          ? 'hover:bg-gray-700 text-blue-400' 
                          : 'hover:bg-blue-50 text-blue-600'
                      }`}
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode 
                          ? 'hover:bg-gray-700 text-red-400' 
                          : 'hover:bg-red-50 text-red-600'
                      }`}
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {news.length === 0 && (
        <div className="text-center py-12">
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No se encontraron noticias
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsTable;