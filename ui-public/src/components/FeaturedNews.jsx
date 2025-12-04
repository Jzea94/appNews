import { useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { formatDate } from '../helpers/formatDate'

const FeaturedNews = ({ news }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  if (!news) return null;

  const handleClick = () => {
    navigate(`/news/${news._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <article 
      onClick={handleClick}
      className={`mb-12 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] cursor-pointer ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-full overflow-hidden">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
              <TrendingUp size={16} />
              <span>Destacada</span>
            </span>
          </div>
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center space-x-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
            }`}>
              {news.category}
            </span>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatDate(news.createdAt)}
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {news.title}
          </h2>
          <p className={`text-lg mb-6 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {news.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Por {news.author}
              </span>
              <div className="flex items-center space-x-1">
                <Clock size={16} className="text-gray-400" />
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {news.readTime}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={16} className="text-gray-400" />
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {news.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedNews;