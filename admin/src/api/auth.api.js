import axios from '../config/axios';

export const authAPI = {
  login: async (identifier, password) => {
    const response = await axios.post('/auth/login', { identifier, password });
    return response.data;
  },

  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  },

  me: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  }
};