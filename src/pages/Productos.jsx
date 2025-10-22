// src/pages/Productos.jsx - VERSIÓN COMPLETA
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importar todas las imágenes
import tcChocolate from '../assets/tcchocolate.webp';
import tcFrutas from '../assets/tccfrutas.jpg';
import tcVainilla from '../assets/tcvainilla.jpg';
import tcManjar from '../assets/tcmanjar.jpg';
import mousseChocolate from '../assets/mchocolate.jpg';
import tiramisu from '../assets/tiramisu.jpg';
import tsNaranja from '../assets/tsanaranja.webp';
import cheesecake from '../assets/cheesecake.jpg';
import empanadaManzana from '../assets/emanzana.jpg';
import tartaSantiago from '../assets/tsantiago.jpg';
import brownie from '../assets/brownie.jpg';
import pan from '../assets/pan.jpg';
import tcVegana from '../assets/tcvegana.jpeg';
import galletas from '../assets/galletas.jpg';
import tortaCumple from '../assets/tortacumple.jpg';
import tortaBoda from '../assets/tortaboda.jpeg';

export default function Productos() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  // Cargar carrito desde localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoPasteleria');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('carritoPasteleria', JSON.stringify(carrito));
  }, [carrito]);

  // Datos de productos
  const productos = [
    { 
      id: 'TC001', 
      categoria: 'Tortas Cuadradas', 
      nombre: 'Torta Cuadrada de Chocolate', 
      precio: 45000, 
      imagen: tcChocolate,
      descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.',
      personalizable: true
    },
    { 
      id: 'TC002', 
      categoria: 'Tortas Cuadradas', 
      nombre: 'Torta Cuadrada de Frutas', 
      precio: 50000, 
      imagen: tcFrutas,
      descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.',
      personalizable: false
    },
    { 
      id: 'TT001', 
      categoria: 'Tortas Circulares', 
      nombre: 'Torta Circular de Vainilla', 
      precio: 40000, 
      imagen: tcVainilla,
      descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.',
      personalizable: false
    },
    { 
      id: 'TT002', 
      categoria: 'Tortas Circulares', 
      nombre: 'Torta Circular de Manjar', 
      precio: 42000, 
      imagen: tcManjar,
      descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.',
      personalizable: false
    },
    { 
      id: 'PI001', 
      categoria: 'Postres Individuales', 
      nombre: 'Mousse de Chocolate', 
      precio: 5000, 
      imagen: mousseChocolate,
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
      imagen: tsNaranja,
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
      imagen: empanadaManzana,
      descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.',
      personalizable: false
    },
    { 
      id: 'PT002', 
      categoria: 'Pastelería Tradicional', 
      nombre: 'Tarta de Santiago', 
      precio: 6000, 
      imagen: tartaSantiago,
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
      imagen: tcVegana,
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
      imagen: tortaCumple,
      descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.',
      personalizable: true
    },
    { 
      id: 'TE002', 
      categoria: 'Torta Especial', 
      nombre: 'Torta Especial de Boda', 
      precio: 60000, 
      imagen: tortaBoda,
      descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.',
      personalizable: false
    }
  ];

  // Categorías únicas
  const categorias = ['Todos', ...new Set(productos.map(producto => producto.categoria))];

  // Filtrar productos por categoría
  const productosFiltrados = categoriaSeleccionada === 'Todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === categoriaSeleccionada);

  // Funciones del carrito
  const agregarAlCarrito = (producto) => {
    if (producto.personalizable) {
      const mensaje = prompt(`"${producto.nombre}" es personalizable.\nIngresa el mensaje:`, '');
      if (mensaje === null) return;
      
      setCarrito(prev => {
        const existente = prev.find(item => item.id === producto.id);
        if (existente) {
          return prev.map(item =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1, mensajePersonalizado: mensaje }
              : item
          );
        }
        return [...prev, { ...producto, cantidad: 1, mensajePersonalizado: mensaje }];
      });
    } else {
      setCarrito(prev => {
        const existente = prev.find(item => item.id === producto.id);
        if (existente) {
          return prev.map(item =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        }
        return [...prev, { ...producto, cantidad: 1 }];
      });
    }
    alert(`${producto.nombre} agregado al carrito`);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      setCarrito([]);
    }
  };

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(prev =>
        prev.map(item =>
          item.id === id ? { ...item, cantidad } : item
        )
      );
    }
  };

  // Función para editar mensaje
  const editarMensaje = (id) => {
    const item = carrito.find(item => item.id === id);
    if (!item) return;

    const nuevoMensaje = prompt('Edita tu mensaje personalizado (máx. 100 caracteres):', item.mensajePersonalizado || '');
    
    if (nuevoMensaje === null) {
      return; // Usuario canceló
    }

    // Limitar a 100 caracteres
    const mensajeRecortado = nuevoMensaje.length > 100 
      ? nuevoMensaje.substring(0, 100)
      : nuevoMensaje;

    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, mensajePersonalizado: mensajeRecortado } : item
      )
    );

    if (nuevoMensaje.length > 100) {
      alert('El mensaje se ha truncado a 100 caracteres');
    } else if (mensajeRecortado.trim() !== '') {
      alert('Mensaje actualizado correctamente');
    }
  };

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  return (
    <div>
      <h1>Nuestros Productos</h1>
      
      {/* Botón del carrito */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <button onClick={toggleCarrito} className="btn">
          🛒 Ver Carrito ({carrito.reduce((sum, item) => sum + item.cantidad, 0)})
        </button>
      </div>
      
      {/* Carrito desplegable */}
      {mostrarCarrito && (
        <div id="DivCarrito" style={{ 
          display: 'block', 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          marginBottom: '2rem' 
        }}>
          <h2>Tu Carrito de Compras</h2>
          <div id="cart-list">
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
                    
                    {/* Mostrar mensaje personalizado si existe */}
                    {item.mensajePersonalizado && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <strong>Mensaje:</strong> "{item.mensajePersonalizado}"
                      </div>
                    )}
                    
                    {/* Botones de acción */}
                    <div style={{ marginTop: '0.5rem' }}>
                      <button 
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        className="btn"
                        style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}
                      >
                        -
                      </button>
                      <button 
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        className="btn"
                        style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}
                      >
                        +
                      </button>
                      
                      {/* Botón para editar mensaje (solo para productos personalizables) */}
                      {item.personalizable && (
                        <button 
                          onClick={() => editarMensaje(item.id)}
                          className="btn"
                          style={{ 
                            padding: '0.25rem 0.5rem', 
                            margin: '0.25rem',
                            backgroundColor: '#FFC0CB',
                            color: '#5D4037'
                          }}
                        >
                          ✏️ Editar mensaje
                        </button>
                      )}
                      
                      <button 
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.5rem', margin: '0.25rem' }}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                
                <h3>Total: ${total.toLocaleString('es-CL')}</h3>
                
                <div style={{ marginTop: '1rem' }}>
                  <button onClick={vaciarCarrito} className="btn btn-secondary">
                    Vaciar Carrito
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Filtro de categorías */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <label htmlFor="categoria-select" style={{ marginRight: '1rem' }}>
          Filtrar por categoría:
        </label>
        <select 
          id="categoria-select"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontFamily: 'inherit'
          }}
        >
          {categorias.map(categoria => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
      </div>
      
      {/* Grid de productos */}
      <div id="product-list">
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
              position: 'relative'
            }}>
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  objectFit: 'cover', 
                  borderRadius: '4px', 
                  marginBottom: '1rem' 
                }} 
              />
              
              <h3>{producto.nombre}</h3>
              <p><strong>Categoría:</strong> {producto.categoria}</p>
              <p><strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <button 
                  onClick={() => agregarAlCarrito(producto)}
                  className="btn"
                >
                  Agregar al carrito
                </button>
                <Link 
                  to={`/detalle-producto/${producto.id}`}
                  className="btn btn-secondary"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {productosFiltrados.length === 0 && (
        <p>No hay productos en esta categoría.</p>
      )}
    </div>
  );
}