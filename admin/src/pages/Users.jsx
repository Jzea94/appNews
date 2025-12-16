import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Shield, User as UserIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../api/user.api';
import Navbar from '../components/Navbar';
import UserForm from '../components/UserForm';

const Users = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersAPI.getAllUsers();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.msg || 'Error al cargar usuarios');
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const handleCreate = async (formData) => {
    try {
      await usersAPI.createUser(formData);
      await loadUsers();
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.msg || 'Error al crear usuario');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await usersAPI.updateUser(editingUser._id, formData);
      await loadUsers();
      setShowForm(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.msg || 'Error al actualizar usuario');
    }
  };

  const handleDelete = async (id) => {
    if (currentUser.id === id) {
      alert('No puedes eliminar tu propio usuario');
      return;
    }

    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      await usersAPI.deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.msg || 'Error al eliminar usuario');
    }
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Cargando usuarios...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className={`flex items-center space-x-2 mb-6 px-4 py-2 rounded-lg transition-all ${
            darkMode 
              ? 'hover:bg-gray-800 text-gray-300' 
              : 'hover:bg-gray-200 text-gray-600'
          }`}
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Gestión de Usuarios
            </h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {filteredUsers.length} {filteredUsers.length === 1 ? 'usuario' : 'usuarios'}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-lg"
          >
            <Plus size={20} />
            <span>Nuevo Usuario</span>
          </button>
        </div>

        <div className={`mb-8 relative rounded-xl overflow-hidden ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        } shadow-lg`}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 outline-none ${
              darkMode 
                ? 'bg-gray-900 text-white placeholder-gray-500' 
                : 'bg-white text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>

        <div className={`rounded-2xl overflow-hidden shadow-xl ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Usuario
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Rol
                  </th>
                  <th className={`px-6 py-4 text-right text-sm font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
                {filteredUsers.map(user => (
                  <tr key={user._id} className={`transition-colors ${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  }`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          user.role === 'superadmin'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {user.role === 'superadmin' ? <Shield size={20} /> : <UserIcon size={20} />}
                        </div>
                        <div>
                          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {user.username}
                          </p>
                          {currentUser.id === user.id && (
                            <span className="text-xs text-blue-500">(Tú)</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'superadmin'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditForm(user)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode 
                              ? 'hover:bg-gray-700 text-blue-400' 
                              : 'hover:bg-blue-50 text-blue-600'
                          }`}
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          disabled={currentUser.id === user.id}
                          className={`p-2 rounded-lg transition-colors ${
                            currentUser.id === user.id
                              ? 'opacity-50 cursor-not-allowed'
                              : darkMode 
                                ? 'hover:bg-gray-700 text-red-400' 
                                : 'hover:bg-red-50 text-red-600'
                          }`}
                          title={currentUser.id === user.id ? 'No puedes eliminarte' : 'Eliminar'}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No se encontraron usuarios
              </p>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdate : handleCreate}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

export default Users;
