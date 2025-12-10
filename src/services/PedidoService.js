// src/services/PedidoService.js
import http from '../utils/http';

const API_BASE = '/api/v1/pedidos';

export const PedidoService = {
  // Crear nuevo pedido
  crear: async (pedidoData) => {
    try {
      console.log('Enviando pedido:', pedidoData);
      const response = await http.post(API_BASE, pedidoData);
      console.log('Respuesta pedido:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creando pedido:', error);
      throw error;
    }
  },

  // Obtener pedidos del usuario actual
  obtenerMisPedidos: async (usuarioEmail) => {
    try {
      console.log('Buscando pedidos para:', usuarioEmail);
      const response = await http.get(`${API_BASE}/usuario/${usuarioEmail}`);
      console.log('Pedidos recibidos:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo pedidos:', error);
      throw error;
    }
  },

  // Obtener todos los pedidos (ADMIN)
  obtenerTodos: async () => {
    try {
      const response = await http.get(API_BASE);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo todos los pedidos:', error);
      throw error;
    }
  },

  // Cambiar estado (ADMIN)
  cambiarEstado: async (pedidoId, nuevoEstado) => {
    try {
      const response = await http.put(`${API_BASE}/${pedidoId}/estado`, { estado: nuevoEstado });
      return response.data;
    } catch (error) {
      console.error('Error cambiando estado:', error);
      throw error;
    }
  },

  // Eliminar pedido (ADMIN)
  eliminar: async (pedidoId) => {
    try {
      const response = await http.delete(`${API_BASE}/${pedidoId}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando pedido:', error);
      throw error;
    }
  },

  // Formatear items del carrito para el backend
  formatearItemsParaBackend: (carrito) => {
    return carrito.map(item => ({
      productoId: item.id,
      productoNombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad,
      personalizacion: item.personalizacion || ''
    }));
  }
};