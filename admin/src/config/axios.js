import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Variable para controlar redirecciones
let isRedirecting = false;

// Interceptor para manejar errores globalmente
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    
    // Evitar redirección múltiple
    if (error.response?.status === 401 && !isRedirecting) {
      // Verificar si ya estamos en login para evitar loops
      if (!window.location.pathname.includes('/login')) {
        isRedirecting = true;
        console.log('No autenticado, redirigiendo a login...');
        
        // Usar setTimeout para evitar bloquear el ciclo de vida de React
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;