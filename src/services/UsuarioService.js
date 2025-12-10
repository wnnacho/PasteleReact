// src/services/UsuarioService.js - VERSIÓN COMPLETA
import http from '../utils/http';

const API_BASE = '/api/v1/usuarios';

export const UsuarioService = {
  // Registrar nuevo usuario
  registrar: async (usuarioData) => {
    try {
      const response = await http.post(`${API_BASE}/registro`, usuarioData);
      return response.data;
    } catch (error) {
      console.error('Error registrando usuario:', error);
      throw error;
    }
  },

  // Login de usuario (no admin)
  login: async (email, password) => {
    try {
      const response = await http.post(`${API_BASE}/login`, { email, password });
      
      // DEBUG
      console.log('Login response:', response.data);
      
      if (response.data && response.data.usuario) {
        // Guardar usuario completo en localStorage
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        console.log('Usuario guardado en localStorage:', response.data.usuario);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en login usuario:', error);
      throw error;
    }
  },

  // Guardar usuario en localStorage
  guardarUsuarioSesion: (usuarioData) => {
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
    console.log('Usuario guardado en sesión:', usuarioData);
  },

  // Obtener usuario actual
  obtenerUsuarioActual: () => {
    try {
      const usuarioStr = localStorage.getItem('usuario');
      console.log('Usuario string en localStorage:', usuarioStr);
      
      if (usuarioStr) {
        const usuario = JSON.parse(usuarioStr);
        console.log('Usuario parseado:', usuario);
        return usuario;
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  },

  // Cerrar sesión usuario
  logout: () => {
    localStorage.removeItem('usuario');
    console.log('Usuario removido de localStorage');
  },

  // Verificar si hay usuario logueado
  estaAutenticado: () => {
    return localStorage.getItem('usuario') !== null;
  }
};