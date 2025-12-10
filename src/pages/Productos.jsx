// src/pages/Productos.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../services/ProductService';
import { CartService } from '../services/CartService';
import { PedidoService } from '../services/PedidoService';
import { UsuarioService } from '../services/UsuarioService';
import { AuthService } from '../utils/auth';

const Productos = () => {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [mensajePersonalizado, setMensajePersonalizado] = useState('');
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Estado para productos traídos desde el backend
  const [productos, setProductos] = useState([]);

  // Cargar productos desde el backend al iniciar
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getAll();
        
        // Formatear los productos para incluir URLs completas de imágenes
        const productosFormateados = data.map(producto => ({
          ...producto,
          // Si la imagen es una ruta relativa, convertirla a URL completa
          imagen: producto.imagen?.startsWith('/') 
            ? `http://localhost:8080${producto.imagen}`
            : producto.imagen || ''
        }));
        
        setProductos(productosFormateados);
        setError('');
      } catch (err) {
        setError('Error al cargar productos. Por favor, intenta nuevamente.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
    // Cargar carrito desde localStorage
    setCarrito(CartService.getCart());
  }, []);

  // Notificación helper
  const mostrarNotificacion = (mensaje, tipo = 'info') => {
    setNotification({ mensaje, tipo });
    setTimeout(() => setNotification(null), 3000);
  };

  const categorias = ['Todos', ...new Set(productos.map(producto => producto.categoria))];

  const productosFiltrados = categoriaFiltro === 'Todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === categoriaFiltro);

  // ========== FUNCIONES DEL CARRITO ==========

  const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    let personalizacion = '';
    if (producto.personalizable) {
      personalizacion = prompt(`"${producto.nombre}" es personalizable.\nIngresa el mensaje (máx. 100 caracteres):`, '');
      if (personalizacion === null) return; // Usuario canceló
      if (personalizacion.length > 100) {
        personalizacion = personalizacion.substring(0, 100);
        mostrarNotificacion('El mensaje se ha truncado a 100 caracteres', 'info');
      }
    }

    const nuevoCarrito = CartService.addToCart(producto, 1, personalizacion);
    setCarrito(nuevoCarrito);
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
  };

  // Mostrar detalles en modal
  const mostrarDetallesProducto = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      setProductoDetalle(producto);
      setMensajePersonalizado('');
      setMostrarModal(true);
    }
  };

  const cerrarModalDetalles = () => {
    setMostrarModal(false);
    setProductoDetalle(null);
    setMensajePersonalizado('');
  };

  const agregarDesdeModal = () => {
    if (!productoDetalle) return;

    const nuevoCarrito = CartService.addToCart(
      productoDetalle, 
      1, 
      productoDetalle.personalizable ? mensajePersonalizado : ''
    );
    
    setCarrito(nuevoCarrito);
    cerrarModalDetalles();
    mostrarNotificacion(`${productoDetalle.nombre} agregado al carrito`, 'success');
  };

  // Manejar tecla Escape para cerrar modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mostrarModal) {
        cerrarModalDetalles();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mostrarModal]);

  const vaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      const nuevoCarrito = CartService.clearCart();
      setCarrito(nuevoCarrito);
      mostrarNotificacion('Carrito vaciado', 'info');
    }
  };

  // ========== PROCESAR COMPRA (NUEVA VERSIÓN CON BACKEND) ==========

  const procesarCompra = async () => {
    if (carrito.length === 0) {
      mostrarNotificacion('El carrito está vacío', 'error');
      return;
    }

    // Verificar si el usuario está logueado (como usuario normal O como admin)
    const usuarioNormal = UsuarioService.obtenerUsuarioActual();
    const esAdmin = AuthService.isAuthenticated();

    if (!usuarioNormal && !esAdmin) {
      if (window.confirm('Debes iniciar sesión o registrarte para comprar. ¿Ir a registro?')) {
        navigate('/registro');
      }
      return;
    }

    const total = CartService.calculateTotal(carrito);
    
    // Pedir datos de envío (solo si no es admin)
    let direccionEnvio = '';
    let telefonoContacto = '';
    
    if (!esAdmin) {
      direccionEnvio = prompt('Ingresa tu dirección de envío:', '');
      if (!direccionEnvio) return;
      
      telefonoContacto = prompt('Ingresa tu teléfono de contacto:', usuarioNormal?.telefono || '');
    }
    
    const notas = prompt('Notas adicionales para el pedido (opcional):', '');

    const confirmar = window.confirm(
      `¿Confirmar compra?\n\nTotal: $${total.toLocaleString('es-CL')}\n\nProductos: ${carrito.reduce((total, item) => total + item.cantidad, 0)}`
    );

    if (confirmar) {
      try {
        let usuarioEmail;
        let aplicarDescuento = false;
        
        if (esAdmin) {
          // Si es admin, usar un email por defecto (o pedirlo)
          usuarioEmail = prompt('Ingresa el email del cliente para el pedido:', 'cliente@ejemplo.com');
          if (!usuarioEmail) return;
        } else {
          // Si es usuario normal, usar su email
          usuarioEmail = usuarioNormal.email;
          // Verificar descuentos
          if (usuarioNormal.mayor50) {
            aplicarDescuento = true;
            total *= 0.5; // 50% descuento
          }
        }

        const pedidoData = {
          usuarioEmail: usuarioEmail,
          items: PedidoService.formatearItemsParaBackend(carrito),
          direccionEnvio: direccionEnvio || 'Retiro en tienda',
          telefonoContacto: telefonoContacto || 'No especificado',
          notas: notas || ''
        };

        const resultado = await PedidoService.crear(pedidoData);
        
        let mensajeExito = `¡Compra realizada con éxito! Número de pedido: ${resultado.pedidoId}`;
        if (aplicarDescuento) {
          mensajeExito += '\nSe aplicó 50% de descuento por ser mayor de 50 años';
        }
        
        mostrarNotificacion(mensajeExito, 'success');
        
        // Limpiar carrito
        const nuevoCarrito = CartService.clearCart();
        setCarrito(nuevoCarrito);
        setCarritoAbierto(false);
        
        // Si es usuario normal, redirigir a sus pedidos
        if (usuarioNormal && !esAdmin) {
          setTimeout(() => navigate('/mis-pedidos'), 1500);
        }
        
      } catch (error) {
        console.error('Error en compra:', error);
        mostrarNotificacion(
          'Error al procesar la compra: ' + (error.response?.data?.error || error.message), 
          'error'
        );
      }
    }
  };

  // ========== FUNCIONES AUXILIARES DEL CARRITO ==========

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = CartService.removeFromCart(id);
    setCarrito(nuevoCarrito);
  };

  const aumentarCantidad = (id) => {
    const item = carrito.find(item => item.id === id);
    if (item) {
      const nuevoCarrito = CartService.updateQuantity(id, item.cantidad + 1);
      setCarrito(nuevoCarrito);
    }
  };

  const disminuirCantidad = (id) => {
    const item = carrito.find(item => item.id === id);
    if (item) {
      const nuevoCarrito = CartService.updateQuantity(id, item.cantidad - 1);
      setCarrito(nuevoCarrito);
    }
  };

  const editarMensaje = (id) => {
    const item = carrito.find(i => i.id === id);
    if (!item || !item.personalizable) return;
    
    const nuevo = prompt('Edita tu mensaje personalizado (máx. 100 caracteres):', item.personalizacion || '');
    if (nuevo === null) return;
    
    const mensajeFinal = nuevo.length > 100 ? nuevo.substring(0, 100) : nuevo;
    const cart = CartService.getCart();
    const itemIndex = cart.findIndex(i => i.id === id);
    
    if (itemIndex >= 0) {
      cart[itemIndex].personalizacion = mensajeFinal;
      CartService.saveCart(cart);
      setCarrito([...cart]);
      
      if (mensajeFinal.trim() !== '') {
        mostrarNotificacion('Mensaje actualizado correctamente', 'success');
      }
    }
  };

  // ========== RENDERIZADO ==========

  if (loading) {
    return (
      <div className="container">
        <h1>Nuestros Productos</h1>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Nuestros Productos</h1>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#dc3545' }}>
          <p>{error}</p>
          <button className="btn" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Nuestros Productos</h1>
      
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <button onClick={() => setCarritoAbierto(!carritoAbierto)} className="btn">
          🛒 Ver Carrito ({carrito.reduce((total, item) => total + item.cantidad, 0)})
        </button>
      </div>
      
      {/* PANEL DEL CARRITO */}
      {carritoAbierto && (
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          marginBottom: '2rem',
          maxHeight: '500px',
          overflowY: 'auto'
        }}>
          <h2>Tu Carrito de Compras</h2>
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <>
              {carrito.map(item => (
                <div key={item.id} style={{ 
                  marginBottom: '1rem', 
                  padding: '1rem', 
                  background: '#f8f8f8', 
                  borderRadius: '4px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <strong>{item.nombre}</strong>
                      <div style={{ marginTop: '0.5rem' }}>
                        <p style={{ margin: 0 }}>
                          Precio: ${item.precio.toLocaleString('es-CL')} x {item.cantidad} = 
                          <strong> ${(item.precio * item.cantidad).toLocaleString('es-CL')}</strong>
                        </p>
                        {item.personalizacion && (
                          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
                            <strong>Mensaje:</strong> "{item.personalizacion}"
                          </p>
                        )}
                        {!item.personalizacion && item.personalizable && (
                          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', fontStyle: 'italic', color: '#666' }}>
                            Sin mensaje personalizado
                          </p>
                        )}
                      </div>
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                        <button onClick={() => aumentarCantidad(item.id)} className="btn" style={{ padding: '0.25rem 0.5rem' }}>+</button>
                        <button onClick={() => disminuirCantidad(item.id)} className="btn" style={{ padding: '0.25rem 0.5rem' }}>-</button>
                      </div>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {item.personalizable && (
                          <button onClick={() => editarMensaje(item.id)} className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                            Editar
                          </button>
                        )}
                        <button 
                          onClick={() => eliminarDelCarrito(item.id)} 
                          className="btn btn-secondary"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>Total:</h3>
                  <h3 style={{ margin: 0, color: '#884513' }}>
                    ${CartService.calculateTotal(carrito).toLocaleString('es-CL')}
                  </h3>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={vaciarCarrito} className="btn btn-secondary" style={{ flex: 1 }}>
                    Vaciar Carrito
                  </button>
                  <button onClick={procesarCompra} className="btn" style={{ flex: 1, backgroundColor: '#28a745' }}>
                    Realizar Compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* NOTIFICACIÓN TOAST */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '12px 16px',
          borderRadius: 6,
          color: 'white',
          zIndex: 2000,
          backgroundColor: notification.tipo === 'success' ? '#28a745' : 
                          notification.tipo === 'error' ? '#dc3545' : '#884513',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {notification.mensaje}
        </div>
      )}

      {/* FILTRO POR CATEGORÍA */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <label htmlFor="categoria-select" style={{ marginRight: '1rem' }}>
          Filtrar por categoría:
        </label>
        <select 
          id="categoria-select" 
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="btn"
          style={{ padding: '0.5rem 1rem' }}
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      {/* LISTA DE PRODUCTOS */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {productosFiltrados.map(producto => (
          <div key={producto.id} style={{ 
            background: 'white', 
            padding: '1rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer',
            ':hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ 
              height: '150px', 
              background: '#f0f0f0', 
              borderRadius: '4px', 
              marginBottom: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {producto.imagen ? (
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/250x150?text=Imagen+no+disponible';
                  }}
                />
              ) : (
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  Sin imagen
                </div>
              )}
            </div>
            <h3 style={{ fontSize: '1.1rem', margin: '0.5rem 0', color: '#5D4037' }}>{producto.nombre}</h3>
            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
              <strong>Categoría:</strong> {producto.categoria}
            </p>
            <p style={{ margin: '0.25rem 0', fontSize: '1rem', fontWeight: 'bold', color: '#884513' }}>
              ${producto.precio?.toLocaleString('es-CL') || '0'}
            </p>
            {producto.personalizable && (
              <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#1ABC9C', fontWeight: 'bold' }}>
                ✓ Personalizable
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <button 
                onClick={() => agregarAlCarrito(producto.id)} 
                className="btn"
                style={{ padding: '0.5rem' }}
              >
                🛒 Agregar al carrito
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => mostrarDetallesProducto(producto.id)}
                style={{ padding: '0.5rem' }}
              >
                🔍 Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE DETALLES */}
      {mostrarModal && productoDetalle && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              cerrarModalDetalles();
            }
          }}
        >
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ color: '#884513', margin: 0 }}>
                {productoDetalle.nombre}
              </h2>
              <button 
                onClick={cerrarModalDetalles}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '0',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>
            
            {productoDetalle.imagen && (
              <img 
                src={productoDetalle.imagen} 
                alt={productoDetalle.nombre}
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '1rem'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            )}
            
            <div style={{ marginBottom: '1rem' }}>
              <p><strong>Categoría:</strong> {productoDetalle.categoria}</p>
              <p><strong>Precio:</strong> ${productoDetalle.precio?.toLocaleString('es-CL') || '0'}</p>
              <p><strong>Personalizable:</strong> {productoDetalle.personalizable ? 'Sí' : 'No'}</p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#5D4037' }}>Descripción:</h4>
              <p>{productoDetalle.descripcion}</p>
            </div>
            
            {productoDetalle.personalizable && (
              <div style={{ margin: '1rem 0' }}>
                <label htmlFor="mensaje-personalizado">
                  <strong>Mensaje personalizado (opcional, máx. 100 caracteres):</strong>
                </label>
                <textarea 
                  id="mensaje-personalizado"
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    resize: 'vertical',
                    marginTop: '0.5rem'
                  }}
                  placeholder="Escribe tu mensaje aquí..."
                  maxLength="100"
                  value={mensajePersonalizado}
                  onChange={(e) => setMensajePersonalizado(e.target.value)}
                />
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                  {mensajePersonalizado.length}/100 caracteres
                </div>
              </div>
            )}
            
            <div style={{
              marginTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <button onClick={agregarDesdeModal} className="btn" style={{ flex: 1 }}>
                🛒 Agregar al carrito
              </button>
              <button onClick={cerrarModalDetalles} className="btn btn-secondary" style={{ flex: 1 }}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;