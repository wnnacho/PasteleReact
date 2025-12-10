// src/services/ProductService.js
import http from '../utils/http';

const API_BASE = '/api/v1/pasteles';

export const ProductService = {
  // Obtener todos los productos
  getAll: async () => {
    try {
      const response = await http.get(API_BASE);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Obtener producto por ID
  getById: async (id) => {
    try {
      const response = await http.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Crear nuevo producto (ADMIN)
  create: async (product) => {
    try {
      const response = await http.post(API_BASE, product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Actualizar producto (ADMIN)
  update: async (id, product) => {
    try {
      const response = await http.put(`${API_BASE}/${id}`, product);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  // Eliminar producto (ADMIN)
  delete: async (id) => {
    try {
      await http.delete(`${API_BASE}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }
};