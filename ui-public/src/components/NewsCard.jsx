import { useNavigate } from 'react-router-dom';
import { Clock, Eye, Bookmark, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { formatDate } from '../helpers/formatDate'

const NewsCard = ({ news }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${news._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <article
      onClick={handleClick}
      className={`rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title}
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              console.log('Guardar noticia:', news.id);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <Bookmark size={16} className="text-gray-700" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              console.log('Compartir noticia:', news.id);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
          >
            <Share2 size={16} className="text-gray-700" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
          }`}>
            {news.category}
          </span>
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {formatDate(news.createdAt)}
          </span>
        </div>
        <h3 className={`text-xl font-bold mb-3 line-clamp-2 leading-tight ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {news.title}
        </h3>
        <p className={`text-sm mb-4 line-clamp-3 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {news.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1">
              <Clock size={14} className="text-gray-400" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                {news.readTime} min
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={14} className="text-gray-400" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                {news.views}
              </span>
            </div>
          </div>
          <span className={`text-xs font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {news.author}
          </span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;