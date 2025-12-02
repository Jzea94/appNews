import React from 'react';
import { useThemeStore } from '../store/theme';

const Footer = () => {
  const { darkMode } = useThemeStore();

  return (
    <footer className={`mt-16 border-t ${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white">
                N
              </div>
              <span className="text-xl font-bold">NewsHub</span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Tu fuente confiable de noticias y actualidad.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Categorías</h4>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><a href="#" className="hover:text-blue-600">Tecnología</a></li>
              <li><a href="#" className="hover:text-blue-600">Ciencia</a></li>
              <li><a href="#" className="hover:text-blue-600">Finanzas</a></li>
              <li><a href="#" className="hover:text-blue-600">Deportes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Acerca de</h4>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><a href="#" className="hover:text-blue-600">Quiénes somos</a></li>
              <li><a href="#" className="hover:text-blue-600">Contacto</a></li>
              <li><a href="#" className="hover:text-blue-600">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-blue-600">Términos de uso</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Recibe las noticias más importantes en tu correo.
            </p>
            <input
              type="email"
              placeholder="tu@email.com"
              className={`w-full px-4 py-2 rounded-lg text-sm ${
                darkMode 
                  ? 'bg-gray-800 text-white border-gray-700' 
                  : 'bg-gray-100 text-gray-900 border-gray-300'
              } border outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
        <div className={`mt-8 pt-8 border-t text-center text-sm ${
          darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
        }`}>
          © 2024 NewsHub. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;