import { ProductoService } from './services/ProductoService';

// Función temporal para probar
export const testService = async () => {
  try {
    console.log('Probando servicio de productos...');
    
    // Obtener todos los productos
    const productos = await ProductoService.getProductos();
    console.log('Productos obtenidos:', productos);
    
    return productos;
  } catch (error) {
    console.error('Error probando servicio:', error);
  }
};