const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const authAPI = {
  login: async (identifier, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // IMPORTANTE: Enviar cookies
        body: JSON.stringify({ identifier, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg || 'The username or password is incorrect.');
      }
      
      const data = await response.json();
      
      // Guardar usuario en localStorage (la cookie se guarda automáticamente)
      if (data.user) {
        localStorage.setItem('admin-user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      localStorage.removeItem('admin-user');
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('admin-user');
    }
  },

  me: async () => {
    // try {
    //   const response = await fetch(`${API_URL}/auth/me`, {
    //     method: 'GET',
    //     credentials: 'include'
    //   });
      
    //   if (!response.ok) {
    //     throw new Error('No autenticado');
    //   }
      
    //   const data = await response.json();
      
    //   // Actualizar usuario en localStorage
    //   if (data.user) {
    //     localStorage.setItem('admin-user', JSON.stringify(data.user));
    //   }
      
    //   return data;
    // } catch (error) {
    //   console.error('Error:', error);
    //   throw error;
    // }
    console.log('No implemented');
  },

  getUser: () => {
    const user = localStorage.getItem('admin-user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('admin-user');
  }
};
