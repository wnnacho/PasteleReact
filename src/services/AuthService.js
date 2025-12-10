// src/services/AuthService.js
import http from '../utils/http';

const AUTH_BASE = '/api/v1/auth';

export const AuthService = {
  // Login y obtener token JWT
  login: async (username, password) => {
    try {
      const response = await http.post(`${AUTH_BASE}/login`, { 
        username, 
        password 
      });
      
      if (response.data && response.data.token) {
        // Guardar token en localStorage
        localStorage.setItem('adminToken', response.data.token);
        
        // También guardar información básica del usuario
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', username);
        
        return response.data.token;
      }
      throw new Error('No token received');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout (simbólico, el backend es stateless)
  logout: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        // Opcional: llamar al endpoint de logout si existe
        await http.post(`${AUTH_BASE}/logout`, {}, {
          headers: { 'X-Auth-Token': token }
        });
      }
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      // Limpiar localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;

    // Verificar si el token está expirado (decodificación básica)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // Obtener información del usuario actual
  getCurrentUser: () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        email: payload.sub,
        role: payload.authorities?.[0]?.replace('ROLE_', '').toLowerCase() || 'admin'
      };
    } catch {
      return null;
    }
  },

  // Obtener headers de autenticación
  getAuthHeaders: () => {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};