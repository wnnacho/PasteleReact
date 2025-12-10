// src/pages/Productos.jsx
import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/ProductService';
import { CartService } from '../services/CartService';
import { AuthService } from '../services/AuthService';

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

  const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    let personalizacion = '';
    if (producto.personalizable) {
      personalizacion = prompt(`"${producto.nombre}" es personalizable.\nIngresa el mensaje (máx. 100 caracteres):`, '');
      if (personalizacion === null) return; // Usuario canceló
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

  const procesarCompra = () => {
    if (carrito.length === 0) {
      mostrarNotificacion('El carrito está vacío', 'error');
      return;
    }

    const total = CartService.calculateTotal(carrito);
    const confirmar = window.confirm(
      `¿Confirmar compra?\n\nTotal: $${total.toLocaleString('es-CL')}\n\nProductos: ${carrito.reduce((total, item) => total + item.cantidad, 0)}`
    );

    if (confirmar) {
      // Aquí iría la lógica para enviar la compra al backend
      mostrarNotificacion('¡Compra realizada con éxito! Te contactaremos pronto.', 'success');
      const nuevoCarrito = CartService.clearCart();
      setCarrito(nuevoCarrito);
      setCarritoAbierto(false);
    }
  };

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
    
    const nuevo = prompt('Edita tu mensaje personalizado (máx. 100 caracteres):', item.personalization || '');
    if (nuevo === null) return;
    
    const mensajeFinal = nuevo.length > 100 ? nuevo.substring(0, 100) : nuevo;
    const cart = CartService.getCart();
    const itemIndex = cart.findIndex(i => i.id === id);
    
    if (itemIndex >= 0) {
      cart[itemIndex].personalization = mensajeFinal;
      CartService.saveCart(cart);
      setCarrito([...cart]);
      
      if (mensajeFinal.trim() !== '') {
        mostrarNotificacion('Mensaje actualizado correctamente', 'success');
      }
    }
  };

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
                  <strong>{item.nombre}</strong><br />
                  Precio: ${item.precio.toLocaleString('es-CL')} x {item.cantidad} = ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  {item.personalization && (
                    <><br /><strong>Mensaje:</strong> "{item.personalization}"</>
                  )}
                  {!item.personalization && item.personalizable && (
                    <><br /><em>Sin mensaje personalizado</em></>
                  )}
                  <div style={{ marginTop: '0.5rem' }}>
                    <button onClick={() => aumentarCantidad(item.id)} className="btn" style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}>+</button>
                    <button onClick={() => disminuirCantidad(item.id)} className="btn" style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}>-</button>
                    {item.personalizable && (
                      <button onClick={() => editarMensaje(item.id)} className="btn" style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}>Editar mensaje</button>
                    )}
                    <button 
                      onClick={() => eliminarDelCarrito(item.id)} 
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '1rem' }}>
                <strong>Total: ${CartService.calculateTotal(carrito).toLocaleString('es-CL')}</strong>
                <div style={{ marginTop: '0.5rem' }}>
                  <button onClick={vaciarCarrito} className="btn btn-secondary">
                    Vaciar Carrito
                  </button>
                  <button onClick={procesarCompra} className="btn" style={{ marginLeft: '0.5rem', backgroundColor: '#28a745' }}>
                    Realizar Compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Notification toast */}
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
          fontWeight: 'bold'
        }}>
          {notification.mensaje}
        </div>
      )}

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <label htmlFor="categoria-select" style={{ marginRight: '1rem' }}>
          Filtrar por categoría:
        </label>
        <select 
          id="categoria-select" 
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="btn"
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
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
            textAlign: 'center' 
          }}>
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
            <h3 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>{producto.nombre}</h3>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Precio:</strong> ${producto.precio?.toLocaleString('es-CL') || '0'}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <button 
                onClick={() => agregarAlCarrito(producto.id)} 
                className="btn"
              >
                Agregar al carrito
              </button>
              <button className="btn btn-secondary" onClick={() => mostrarDetallesProducto(producto.id)}>
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
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
            <h2 style={{ color: '#884513', marginBottom: '1rem' }}>
              {productoDetalle.nombre}
            </h2>
            
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
            
            <p><strong>Categoría:</strong> {productoDetalle.categoria}</p>
            <p><strong>Precio:</strong> ${productoDetalle.precio?.toLocaleString('es-CL') || '0'}</p>
            <p><strong>Descripción:</strong> {productoDetalle.descripcion}</p>
            <p><strong>Personalizable:</strong> {productoDetalle.personalizable ? 'Sí' : 'No'}</p>
            
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
                    resize: 'vertical'
                  }}
                  placeholder="Escribe tu mensaje aquí..."
                  maxLength="100"
                  value={mensajePersonalizado}
                  onChange={(e) => setMensajePersonalizado(e.target.value)}
                />
              </div>
            )}
            
            <div style={{
              marginTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <button onClick={agregarDesdeModal} className="btn">
                Agregar al carrito
              </button>
              <button onClick={cerrarModalDetalles} className="btn btn-secondary">
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