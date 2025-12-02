const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const newsAPI = {
  // Obtener todas las noticias
  getAllNews: async () => {
    try {
      const response = await fetch(`${API_URL}/news`);
      if (!response.ok) throw new Error('Error al obtener noticias');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Obtener noticia por ID
  getNewsById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/news/${id}`);
      if (!response.ok) throw new Error('Error al obtener noticia');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Buscar noticias
  searchNews: async (query) => {
    try {
      const response = await fetch(`${API_URL}/news/search?q=${query}`);
      if (!response.ok) throw new Error('Error al buscar noticias');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Filtrar por categoría
  getNewsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_URL}/news/category/${category}`);
      if (!response.ok) throw new Error('Error al filtrar noticias');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};