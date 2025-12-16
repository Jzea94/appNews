import axios from '../config/axios';

export const newsAPI = {
  getAllNews: async () => {
    const response = await axios.get('/news');
    return response.data;
  },

  getNewsById: async (id) => {
    const response = await axios.get(`/news/${id}`);
    return response.data;
  },

  createNews: async (newsData) => {
    const response = await axios.post('/news', newsData);
    return response.data;
  },

  updateNews: async (id, newsData) => {
    const response = await axios.patch(`/news/${id}`, newsData);
    return response.data;
  },

  deleteNews: async (id) => {
    const response = await axios.delete(`/news/${id}`);
    return response.data;
  }
};
