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

  // Mock data para desarrollo
  const mockNewsDetail = {
    id: 1,
    title: "Avances revolucionarios en inteligencia artificial transforman la industria tecnológica",
    category: "Tecnología",
    author: "María González",
    authorBio: "Periodista especializada en tecnología con 10 años de experiencia",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    date: "2024-11-30",
    readTime: "5 min",
    views: "15.2k",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    excerpt: "Las nuevas capacidades de IA están redefiniendo cómo las empresas operan y cómo interactuamos con la tecnología en nuestra vida diaria.",
    content: `
      <p>La inteligencia artificial ha experimentado avances sin precedentes en los últimos meses, transformando radicalmente la forma en que las empresas operan y cómo las personas interactúan con la tecnología en su vida cotidiana.</p>

      <h2>Un cambio de paradigma</h2>
      <p>Los últimos desarrollos en modelos de lenguaje de gran escala (LLM) han demostrado capacidades que hace apenas un año parecían ciencia ficción. Desde la generación de código hasta la creación de contenido multimedia, la IA está democratizando habilidades que antes requerían años de entrenamiento especializado.</p>

      <p>Empresas de todos los tamaños están integrando estas tecnologías en sus flujos de trabajo, mejorando la productividad y permitiendo que los empleados se concentren en tareas de mayor valor agregado.</p>

      <h2>Impacto en diferentes industrias</h2>
      <p>El sector de la salud ha sido uno de los más beneficiados. Los algoritmos de IA ahora pueden detectar enfermedades con una precisión que rivaliza con la de especialistas humanos, analizando imágenes médicas en segundos y proporcionando diagnósticos preliminares que aceleran el tratamiento.</p>

      <p>En el ámbito educativo, los tutores impulsados por IA están personalizando el aprendizaje a un nivel nunca antes visto, adaptándose al ritmo y estilo de cada estudiante individual.</p>

      <h2>Desafíos éticos y regulatorios</h2>
      <p>Sin embargo, este rápido avance no viene sin desafíos. Las preocupaciones sobre privacidad, sesgo algorítmico y el impacto en el empleo están generando debates intensos entre legisladores, tecnólogos y la sociedad en general.</p>

      <p>Gobiernos de todo el mundo están trabajando en marcos regulatorios que buscan equilibrar la innovación con la protección de derechos fundamentales. La Unión Europea lidera estos esfuerzos con su AI Act, que establece estándares estrictos para sistemas de IA de alto riesgo.</p>

      <h2>El futuro es ahora</h2>
      <p>Los expertos predicen que los próximos años traerán avances aún más dramáticos. La integración de IA con otras tecnologías emergentes como computación cuántica y blockchain promete crear sinergias que multiplicarán exponencialmente las capacidades actuales.</p>

      <p>Lo que está claro es que la inteligencia artificial ya no es una tecnología del futuro: es una realidad presente que está redefiniendo nuestro mundo, y aquellos que se adapten más rápidamente tendrán una ventaja significativa en la economía del mañana.</p>
    `,
    tags: ["Inteligencia Artificial", "Tecnología", "Innovación", "Futuro", "IA"],
    featured: true
  };

  const mockRelatedNews = [
    {
      id: 2,
      title: "Descubren nueva especie marina en las profundidades del océano",
      category: "Ciencia",
      author: "Dr. Carlos Ruiz",
      date: "2024-11-29",
      readTime: "4 min",
      views: "8.5k",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop",
      excerpt: "Científicos marinos han identificado una fascinante criatura bioluminiscente.",
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
      excerpt: "Los inversores muestran renovado optimismo ante las nuevas regulaciones.",
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
      excerpt: "Nuevos paneles solares prometen revolucionar la energía limpia.",
      featured: false
    }
  ];

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
      setNews(mockNewsDetail);
      setRelatedNews(mockRelatedNews);
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
                  alt={news.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {news.author}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {news.authorBio}
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
