const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const newsAPI = {
  getAllNews: async () => {
    try {
      const response = await fetch(`${API_URL}/news`, {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Error al obtener noticias');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  getNewsById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/news/${id}`, {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Error al obtener noticia');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  createNews: async (newsData) => {
    try {
      const response = await fetch(`${API_URL}/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newsData)
      });
      if (!response.ok) throw new Error('Error al crear noticia');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  updateNews: async (id, newsData) => {
    try {
      const response = await fetch(`${API_URL}/news/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newsData)
      });
      if (!response.ok) throw new Error('Error al actualizar noticia');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  deleteNews: async (id) => {
    try {
      const response = await fetch(`${API_URL}/news/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Error al eliminar noticia');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};