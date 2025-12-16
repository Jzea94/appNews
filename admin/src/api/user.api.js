import axios from '../config/axios';

export const usersAPI = {
  getAllUsers: async () => {
    const response = await axios.get('/user');
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axios.post('/user', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axios.put(`/user/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`/user/${id}`);
    return response.data;
  }
};