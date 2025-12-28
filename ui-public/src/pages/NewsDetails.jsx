import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Bookmark, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { newsAPI } from '../api/news.api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import { formatDate } from '../helpers/formatDate'

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadNewsDetail();
  }, [id]);

  const loadNewsDetail = async () => {
    try {
      setLoading(true);
      
      // DESCOMENTAR cuando el backend esté listo:
      const selectedNews = await newsAPI.getNewsById(id);
      const allNews = await newsAPI.getAllNews();
      const relatedNews = allNews.filter(item => {
        const matchCategory = item.category === selectedNews.category;
        const remSelectedNews = item._id !== selectedNews._id;
        return matchCategory && remSelectedNews;
      })
      
      // Simulación de carga
      setTimeout(() => {
        setNews(selectedNews);
        setRelatedNews(relatedNews);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error('Error al cargar noticia:', error);
      setLoading(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = news.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-950' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Cargando noticia...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-950' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Noticia no encontrada
          </h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar 
        categories={[]}
        selectedCategory=""
        onCategoryChange={() => {}}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón de regreso */}
        <button
          onClick={() => navigate('/')}
          className={`flex items-center space-x-2 mb-6 px-4 py-2 rounded-lg transition-all ${
            darkMode 
              ? 'hover:bg-gray-800 text-gray-300' 
              : 'hover:bg-gray-200 text-gray-600'
          }`}
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        {/* Imagen principal */}
        <div className="relative h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Contenido principal */}
        <article className={`rounded-3xl overflow-hidden shadow-xl mb-12 ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className="p-8 md:p-12">
            {/* Categoría y meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
              }`}>
                {news.category}
              </span>
              <div className="flex items-center space-x-4 text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {formatDate(news.createdAt)}
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

            {/* Título */}
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {news.title}
            </h1>

            {/* Excerpt */}
            <p className={`text-xl mb-8 leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {news.excerpt}
            </p>

            {/* Autor y acciones */}
            <div className="flex flex-wrap items-center justify-between pb-8 mb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-4">
                <img 
                  src={news.authorImage} 
                  alt={news.author.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {news.author.username}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {"Comunicador social"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <button className={`p-3 rounded-xl transition-all ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}>
                  <Bookmark size={20} />
                </button>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className={`p-3 rounded-xl transition-all ${
                      darkMode 
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Share2 size={20} />
                  </button>

                  {showShareMenu && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl z-10 overflow-hidden ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <button
                        onClick={() => handleShare('facebook')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <Facebook size={18} />
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <Twitter size={18} />
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <Linkedin size={18} />
                        <span>LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        {copied ? <Check size={18} /> : <LinkIcon size={18} />}
                        <span>{copied ? 'Copiado!' : 'Copiar enlace'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contenido del artículo */}
            <div 
              className={`prose prose-lg max-w-none ${
                darkMode ? 'prose-invert' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {/* Tags */}
          </div>
        </article>

        {/* Noticias relacionadas */}
        <section>
          <h2 className={`text-3xl font-bold mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Noticias Relacionadas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedNews.map(newsItem => (
              <div key={newsItem._id} onClick={() => {
                navigate(`/news/${newsItem.id}`);
                window.scrollTo(0, 0);
              }}>
                <NewsCard news={newsItem} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetails;
