import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/productos';

// Configurar axios para manejar errores
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición API:', error);
    throw error;
  }
);

export const ProductoService = {
  // Obtener todos los productos
  getProductos: async () => {
    const response = await api.get('');
    return response.data;
  },
  
  // Obtener producto por ID
  getProductoById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },
  
  // Crear producto
  createProducto: async (producto) => {
    const response = await api.post('/', producto);
    return response.data;
  },
  
  // Actualizar producto
  updateProducto: async (id, producto) => {
    const response = await api.put(`/${id}`, producto);
    return response.data;
  },
  
  // Eliminar producto
  deleteProducto: async (id) => {
    await api.delete(`/${id}`);
  },
  
  // Obtener por categoría
  getProductosByCategoria: async (categoria) => {
    const response = await api.get(`/categoria/${categoria}`);
    return response.data;
  }
};