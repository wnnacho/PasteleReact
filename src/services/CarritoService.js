import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/carrito';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en carrito API:', error);
    throw error;
  }
);

export const CarritoService = {
  // Obtener carrito de usuario
  getCarrito: async (usuarioEmail) => {
    const response = await api.get(`/${usuarioEmail}`);
    return response.data;
  },

  // Agregar al carrito
  agregarAlCarrito: async (usuarioEmail, productoId, cantidad, mensajePersonalizado = '') => {
    const response = await api.post(`/${usuarioEmail}`, {
      productoId,
      cantidad,
      mensajePersonalizado
    });
    return response.data;
  },

  // Actualizar cantidad
  actualizarCantidad: async (usuarioEmail, productoId, cantidad) => {
    const response = await api.put(`/${usuarioEmail}/${productoId}`, {
      cantidad
    });
    return response.data;
  },

  // Eliminar del carrito
  eliminarDelCarrito: async (usuarioEmail, productoId) => {
    await api.delete(`/${usuarioEmail}/${productoId}`);
  },

  // Vaciar carrito
  vaciarCarrito: async (usuarioEmail) => {
    await api.delete(`/${usuarioEmail}`);
  },

  // Actualizar mensaje personalizado
actualizarMensaje: async (usuarioEmail, productoId, mensaje) => {
  // Primero obtenemos el item actual
  const carrito = await CarritoService.getCarrito(usuarioEmail);
  const item = carrito.find(i => i.producto.id === productoId);
  
  if (!item) throw new Error('Item no encontrado en carrito');
  
  // Actualizamos el item con el nuevo mensaje
  const response = await api.put(`/${usuarioEmail}/${productoId}`, {
    cantidad: item.cantidad,
    mensajePersonalizado: mensaje
  });
  return response.data;
},
};