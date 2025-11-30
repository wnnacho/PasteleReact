import React, { useState, useEffect } from 'react';
import { ProductoService } from '../services/ProductoService';
import { CarritoService } from '../services/CarritoService';

const Productos = () => {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [mensajePersonalizado, setMensajePersonalizado] = useState('');
  const [notification, setNotification] = useState(null);

  // Simple in-component notification helper
  function mostrarNotificacion(mensaje, tipo = 'info') {
    setNotification({ mensaje, tipo });
    setTimeout(() => setNotification(null), 3000);
  }

  // Estado para productos desde la API
const [productos, setProductos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Email temporal - luego lo reemplazaremos con autenticación real
const [usuarioEmail] = useState('usuario@ejemplo.com');

// Cargar productos desde la API
useEffect(() => {
  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const productosData = await ProductoService.getProductos();
      setProductos(productosData);
    } catch (err) {
      setError('Error al cargar los productos: ' + err.message);
      console.error('Error cargando productos:', err);
    } finally {
      setLoading(false);
    }
  };

  cargarProductos();
}, []);

  // ... el resto del componente se mantiene igual
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  const categorias = ['Todos', ...new Set(productos.map(producto => producto.categoria))];

  const productosFiltrados = categoriaFiltro === 'Todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === categoriaFiltro);

  const agregarAlCarrito = async (id) => {
  try {
    const producto = productos.find(p => p.id === id);
    let mensajePersonalizado = '';

    if (producto.personalizable) {
      mensajePersonalizado = prompt(`"${producto.nombre}" es personalizable.\nIngresa el mensaje:`, '') || '';
    }

    // Llamar al backend
    await CarritoService.agregarAlCarrito(usuarioEmail, id, 1, mensajePersonalizado);
    
    // Actualizar carrito local
    const nuevoCarrito = await CarritoService.getCarrito(usuarioEmail);
    setCarrito(nuevoCarrito);
    
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
  } catch (error) {
    console.error('Error agregando al carrito:', error);
    mostrarNotificacion('Error al agregar al carrito', 'error');
  }
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

    const itemExistente = carrito.find(item => item.id === productoDetalle.id);
    let nuevoCarrito;
    if (itemExistente) {
      nuevoCarrito = carrito.map(item => 
        item.id === productoDetalle.id ? { ...item, cantidad: item.cantidad + 1, ...(productoDetalle.personalizable && { mensajePersonalizado }) } : item
      );
    } else {
      const nuevoItem = { ...productoDetalle, cantidad: 1 };
      if (productoDetalle.personalizable) nuevoItem.mensajePersonalizado = mensajePersonalizado;
      nuevoCarrito = [...carrito, nuevoItem];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
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

  const vaciarCarrito = async () => {
  try {
    if (carrito.length === 0) {
      mostrarNotificacion('El carrito ya está vacío', 'info');
      return;
    }

    const confirmar = window.confirm('¿Estás seguro de que quieres vaciar el carrito?');
    if (!confirmar) return;

    await CarritoService.vaciarCarrito(usuarioEmail);
    setCarrito([]);
    mostrarNotificacion('Carrito vaciado correctamente', 'success');
  } catch (error) {
    console.error('Error en vaciarCarrito:', error);
    mostrarNotificacion('Error al vaciar el carrito: ' + error.message, 'error');
  }
};

  const procesarCompra = async () => {
  if (carrito.length === 0) {
    mostrarNotificacion('El carrito está vacío', 'error');
    return;
  }

  const total = carrito.reduce((t, item) => t + (item.producto.precio * item.cantidad), 0);
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
  
  const confirmar = window.confirm(`¿Confirmar compra?\n\nTotal: $${total.toLocaleString('es-CL')}\n\nProductos: ${cantidadTotal}`);

  if (confirmar) {
    try {
      await CarritoService.vaciarCarrito(usuarioEmail);
      setCarrito([]);
      setCarritoAbierto(false);
      mostrarNotificacion('¡Compra realizada con éxito! Te contactaremos pronto.', 'success');
    } catch (error) {
      console.error('Error en procesarCompra:', error);
      mostrarNotificacion('Error al procesar la compra: ' + error.message, 'error');
    }
  }
};

  const eliminarDelCarrito = async (id) => {
  try {
    await CarritoService.eliminarDelCarrito(usuarioEmail, id);
    const nuevoCarrito = await CarritoService.getCarrito(usuarioEmail);
    setCarrito(nuevoCarrito);
  } catch (error) {
    console.error('Error eliminando del carrito:', error);
  }
};

  const aumentarCantidad = async (id) => {
  try {
    const item = carrito.find(i => i.producto.id === id);
    await CarritoService.actualizarCantidad(usuarioEmail, id, item.cantidad + 1);
    const nuevoCarrito = await CarritoService.getCarrito(usuarioEmail);
    setCarrito(nuevoCarrito);
  } catch (error) {
    console.error('Error aumentando cantidad:', error);
  }
};

const disminuirCantidad = async (id) => {
  try {
    const item = carrito.find(i => i.producto.id === id);
    if (item.cantidad > 1) {
      await CarritoService.actualizarCantidad(usuarioEmail, id, item.cantidad - 1);
    } else {
      await CarritoService.eliminarDelCarrito(usuarioEmail, id);
    }
    const nuevoCarrito = await CarritoService.getCarrito(usuarioEmail);
    setCarrito(nuevoCarrito);
  } catch (error) {
    console.error('Error disminuyendo cantidad:', error);
  }
};

  const editarMensaje = async (id) => {
  const item = carrito.find(i => i.producto.id === id);
  if (!item) return;
  
  const nuevo = prompt('Edita tu mensaje personalizado (máx. 100 caracteres):', item.mensajePersonalizado || '');
  if (nuevo === null) return;
  
  let mensajeFinal = nuevo;
  if (nuevo.length > 100) {
    mensajeFinal = nuevo.substring(0, 100);
    mostrarNotificacion('El mensaje se ha truncado a 100 caracteres', 'info');
  }
  
  try {
    await CarritoService.actualizarMensaje(usuarioEmail, id, mensajeFinal);
    const nuevoCarrito = await CarritoService.getCarrito(usuarioEmail);
    setCarrito(nuevoCarrito);
    
    if (mensajeFinal.trim() !== '') {
      mostrarNotificacion('Mensaje actualizado correctamente', 'success');
    }
  } catch (error) {
    console.error('Error actualizando mensaje:', error);
    mostrarNotificacion('Error al actualizar el mensaje: ' + error.message, 'error');
  }
};

  if (error) {
    return (
      <div className="container">
        <h1>Nuestros Productos</h1>
        <div style={{ 
          background: '#ffebee', 
          padding: '1rem', 
          borderRadius: '8px', 
          margin: '2rem 0',
          color: '#c62828'
        }}>
          <p><strong>Error:</strong> {error}</p>
          <button onClick={() => window.location.reload()} className="btn">
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
          marginBottom: '2rem'
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
    <strong>{item.producto.nombre}</strong><br />
    Precio: ${item.producto.precio.toLocaleString('es-CL')} x {item.cantidad} = ${(item.producto.precio * item.cantidad).toLocaleString('es-CL')}
    {item.mensajePersonalizado && (
      <><br /><strong>Mensaje:</strong> "{item.mensajePersonalizado}"</>
    )}
    {!item.mensajePersonalizado && item.producto.personalizable && (
      <><br /><em>Sin mensaje personalizado</em></>
    )}
    <div style={{ marginTop: '0.5rem' }}>
      <button onClick={() => aumentarCantidad(item.producto.id)} className="btn" style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}>+</button>
      <button onClick={() => disminuirCantidad(item.producto.id)} className="btn" style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}>-</button>
      {item.producto.personalizable && (
        <button onClick={() => editarMensaje(item.producto.id)} className="btn" style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}>Editar mensaje</button>
      )}
      <button 
        onClick={() => eliminarDelCarrito(item.producto.id)} 
        className="btn btn-secondary"
        style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}
      >
        Eliminar
      </button>
    </div>
  </div>
))}
              <div style={{ marginTop: '1rem' }}>
                <button onClick={vaciarCarrito} className="btn btn-secondary">
                  Vaciar Carrito
                </button>
                <button onClick={procesarCompra} className="btn" style={{ marginLeft: '0.5rem', backgroundColor: '#28a745' }}>
                  Realizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Notification toast */}
      {notification && (() => {
        let bg;
        if (notification.tipo === 'success') bg = '#28a745';
        else if (notification.tipo === 'error') bg = '#dc3545';
        else bg = '#884513';
        return (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 16px',
            borderRadius: 6,
            color: 'white',
            zIndex: 2000,
            backgroundColor: bg,
            fontWeight: 'bold'
          }}>
            {notification.mensaje}
          </div>
        )
      })()}

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
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              />
            </div>
            <h3>{producto.nombre}</h3>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')}</p>
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
          onKeyDown={(e) => {
            // close on Enter/Space, also handle Escape when overlay is focused
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
              cerrarModalDetalles();
            }
          }}
          aria-hidden={false}
        >
          <div aria-modal="true" aria-labelledby={`modal-title-${productoDetalle.id}`} style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 id={`modal-title-${productoDetalle.id}`} style={{ color: '#884513', marginBottom: '1rem' }}>
              {productoDetalle.nombre}
            </h2>
            
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
            />
            
            <p><strong>Categoría:</strong> {productoDetalle.categoria}</p>
            <p><strong>Precio:</strong> ${productoDetalle.precio.toLocaleString('es-CL')}</p>
            <p><strong>Descripción:</strong> {productoDetalle.descripcion}</p>
            
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