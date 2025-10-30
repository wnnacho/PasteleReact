import React, { useState, useEffect } from 'react';

// Importar todas las imágenes
import tcchocolate from '../assets/tcchocolate.webp';
import tccfrutas from '../assets/tccfrutas.jpg';
import tcvainilla from '../assets/tcvainilla.jpg';
import tcmanjar from '../assets/tcmanjar.jpg';
import mchocolate from '../assets/mchocolate.jpg';
import tiramisu from '../assets/tiramisu.jpg';
import tsanaranja from '../assets/tsanaranja.webp';
import cheesecake from '../assets/cheesecake.jpg';
import emanzana from '../assets/emanzana.jpg';
import tsantiago from '../assets/tsantiago.jpg';
import brownie from '../assets/brownie.jpg';
import pan from '../assets/pan.jpg';
import tcvegana from '../assets/tcvegana.jpeg';
import galletas from '../assets/galletas.jpg';
import tortacumple from '../assets/tortacumple.jpg';
import tortaboda from '../assets/tortaboda.jpeg';

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

  // Productos de ejemplo con las imágenes importadas
  const productos = [
  { 
    id: 'TC001', 
    categoria: 'Tortas Cuadradas', 
    nombre: 'Torta Cuadrada de Chocolate', 
    precio: 45000, 
    imagen: tcchocolate,
    descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.',
    personalizable: true
  },
  { 
    id: 'TC002', 
    categoria: 'Tortas Cuadradas', 
    nombre: 'Torta Cuadrada de Frutas', 
    precio: 50000, 
    imagen: tccfrutas,
    descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.',
    personalizable: false
  },
  { 
    id: 'TT001', 
    categoria: 'Tortas Circulares', 
    nombre: 'Torta Circular de Vainilla', 
    precio: 40000, 
    imagen: tcvainilla,
    descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.',
    personalizable: false
  },
  { 
    id: 'TT002', 
    categoria: 'Tortas Circulares', 
    nombre: 'Torta Circular de Manjar', 
    precio: 42000, 
    imagen: tcmanjar,
    descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.',
    personalizable: false
  },
  { 
    id: 'PI001', 
    categoria: 'Postres Individuales', 
    nombre: 'Mousse de Chocolate', 
    precio: 5000, 
    imagen: mchocolate,
    descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.',
    personalizable: false
  },
  { 
    id: 'PI002', 
    categoria: 'Postres Individuales', 
    nombre: 'Tiramisú Clásico', 
    precio: 5500, 
    imagen: tiramisu,
    descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.',
    personalizable: false
  },
  { 
    id: 'PSA001', 
    categoria: 'Productos Sin Azúcar', 
    nombre: 'Torta Sin Azúcar de Naranja', 
    precio: 48000, 
    imagen: tsanaranja,
    descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.',
    personalizable: false
  },
  { 
    id: 'PSA002', 
    categoria: 'Productos Sin Azúcar', 
    nombre: 'Cheesecake Sin Azúcar', 
    precio: 47000, 
    imagen: cheesecake,
    descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.',
    personalizable: false
  },
  { 
    id: 'PT001', 
    categoria: 'Pastelería Tradicional', 
    nombre: 'Empanada de Manzana', 
    precio: 3000, 
    imagen: emanzana,
    descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.',
    personalizable: false
  },
  { 
    id: 'PT002', 
    categoria: 'Pastelería Tradicional', 
    nombre: 'Tarta de Santiago', 
    precio: 6000, 
    imagen: tsantiago,
    descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.',
    personalizable: false
  },
  { 
    id: 'PG001', 
    categoria: 'Productos Sin Gluten', 
    nombre: 'Brownie Sin Gluten', 
    precio: 4000, 
    imagen: brownie,
    descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.',
    personalizable: false
  },
  { 
    id: 'PG002', 
    categoria: 'Productos Sin Gluten', 
    nombre: 'Pan Sin Gluten', 
    precio: 3500, 
    imagen: pan,
    descripcion: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.',
    personalizable: false
  },
  { 
    id: 'PV001', 
    categoria: 'Producto Vegano', 
    nombre: 'Torta Vegana de Chocolate', 
    precio: 50000, 
    imagen: tcvegana,
    descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.',
    personalizable: false
  },
  { 
    id: 'PV002', 
    categoria: 'Producto Vegano', 
    nombre: 'Galletas Veganas de Avena', 
    precio: 4500, 
    imagen: galletas,
    descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.',
    personalizable: false
  },
  { 
    id: 'TE001', 
    categoria: 'Torta Especial', 
    nombre: 'Torta Especial de Cumpleaños', 
    precio: 55000, 
    imagen: tortacumple,
    descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.',
    personalizable: true
  },
  { 
    id: 'TE002', 
    categoria: 'Torta Especial', 
    nombre: 'Torta Especial de Boda', 
    precio: 60000, 
    imagen: tortaboda,
    descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.',
    personalizable: false
  }
];

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

  const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    const itemExistente = carrito.find(item => item.id === id);
    
    let nuevoCarrito;
    if (itemExistente) {
      nuevoCarrito = carrito.map(item => 
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }
    
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
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

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
    mostrarNotificacion('Carrito vaciado', 'info');
  };

  const procesarCompra = () => {
    if (carrito.length === 0) {
      mostrarNotificacion('El carrito está vacío', 'error');
      return;
    }

    const total = carrito.reduce((t, item) => t + (item.precio * item.cantidad), 0);
    const confirmar = window.confirm(`¿Confirmar compra?\n\nTotal: $${total.toLocaleString('es-CL')}\n\nProductos: ${carrito.reduce((total, item) => total + item.cantidad, 0)}`);

    if (confirmar) {
      mostrarNotificacion('¡Compra realizada con éxito! Te contactaremos pronto.', 'success');
      setCarrito([]);
      localStorage.removeItem('carrito');
      setCarritoAbierto(false);
    }
  };

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map(item => item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const disminuirCantidad = (id) => {
    const item = carrito.find(i => i.id === id);
    if (!item) return;
    let nuevoCarrito;
    if (item.cantidad <= 1) {
      nuevoCarrito = carrito.filter(i => i.id !== id);
    } else {
      nuevoCarrito = carrito.map(i => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i);
    }
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const editarMensaje = (id) => {
    const item = carrito.find(i => i.id === id);
    if (!item) return;
    const nuevo = prompt('Edita tu mensaje personalizado (máx. 100 caracteres):', item.mensajePersonalizado || '');
    if (nuevo === null) return;
    let mensajeFinal = nuevo;
    if (nuevo.length > 100) {
      mensajeFinal = nuevo.substring(0, 100);
      mostrarNotificacion('El mensaje se ha truncado a 100 caracteres', 'info');
    }
    const nuevoCarrito = carrito.map(i => i.id === id ? { ...i, mensajePersonalizado: mensajeFinal } : i);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    if (mensajeFinal.trim() !== '') mostrarNotificacion('Mensaje actualizado correctamente', 'success');
  };

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
                  <strong>{item.nombre}</strong><br />
                  Precio: ${item.precio.toLocaleString('es-CL')} x {item.cantidad} = ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  {item.mensajePersonalizado && (
                    <><br /><strong>Mensaje:</strong> "{item.mensajePersonalizado}"</>
                  )}
                  {!item.mensajePersonalizado && item.personalizable && (
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