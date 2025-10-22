// src/pages/DetalleProducto.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Importar todas las imágenes aquí también
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

export default function DetalleProducto() {
  const { id } = useParams();
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mensajePersonalizado, setMensajePersonalizado] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Cargar carrito
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoPasteleria');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Guardar carrito
  useEffect(() => {
    localStorage.setItem('carritoPasteleria', JSON.stringify(carrito));
  }, [carrito]);

  // TODOS los productos con imágenes importadas
  const productos = {
    'TC001': {
      id: 'TC001',
      nombre: 'Torta Cuadrada de Chocolate',
      precio: 45000,
      imagen: tcChocolate,
      categoria: 'Tortas Cuadradas',
      descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.',
      personalizable: true
    },
    'TC002': {
      id: 'TC002',
      nombre: 'Torta Cuadrada de Frutas',
      precio: 50000,
      imagen: tcFrutas,
      categoria: 'Tortas Cuadradas',
      descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.',
      personalizable: false
    },
    'TT001': {
      id: 'TT001',
      nombre: 'Torta Circular de Vainilla',
      precio: 40000,
      imagen: tcVainilla,
      categoria: 'Tortas Circulares',
      descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.',
      personalizable: false
    },
    'TT002': {
      id: 'TT002',
      nombre: 'Torta Circular de Manjar',
      precio: 42000,
      imagen: tcManjar,
      categoria: 'Tortas Circulares',
      descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.',
      personalizable: false
    },
    'PI001': {
      id: 'PI001',
      nombre: 'Mousse de Chocolate',
      precio: 5000,
      imagen: mousseChocolate,
      categoria: 'Postres Individuales',
      descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.',
      personalizable: false
    },
    'PI002': {
      id: 'PI002',
      nombre: 'Tiramisú Clásico',
      precio: 5500,
      imagen: tiramisu,
      categoria: 'Postres Individuales',
      descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.',
      personalizable: false
    },
    'PSA001': {
      id: 'PSA001',
      nombre: 'Torta Sin Azúcar de Naranja',
      precio: 48000,
      imagen: tsNaranja,
      categoria: 'Productos Sin Azúcar',
      descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.',
      personalizable: false
    },
    'PSA002': {
      id: 'PSA002',
      nombre: 'Cheesecake Sin Azúcar',
      precio: 47000,
      imagen: cheesecake,
      categoria: 'Productos Sin Azúcar',
      descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.',
      personalizable: false
    },
    'PT001': {
      id: 'PT001',
      nombre: 'Empanada de Manzana',
      precio: 3000,
      imagen: empanadaManzana,
      categoria: 'Pastelería Tradicional',
      descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.',
      personalizable: false
    },
    'PT002': {
      id: 'PT002',
      nombre: 'Tarta de Santiago',
      precio: 6000,
      imagen: tartaSantiago,
      categoria: 'Pastelería Tradicional',
      descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.',
      personalizable: false
    },
    'PG001': {
      id: 'PG001',
      nombre: 'Brownie Sin Gluten',
      precio: 4000,
      imagen: brownie,
      categoria: 'Productos Sin Gluten',
      descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.',
      personalizable: false
    },
    'PG002': {
      id: 'PG002',
      nombre: 'Pan Sin Gluten',
      precio: 3500,
      imagen: pan,
      categoria: 'Productos Sin Gluten',
      descripcion: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.',
      personalizable: false
    },
    'PV001': {
      id: 'PV001',
      nombre: 'Torta Vegana de Chocolate',
      precio: 50000,
      imagen: tcVegana,
      categoria: 'Producto Vegano',
      descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.',
      personalizable: false
    },
    'PV002': {
      id: 'PV002',
      nombre: 'Galletas Veganas de Avena',
      precio: 4500,
      imagen: galletas,
      categoria: 'Producto Vegano',
      descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.',
      personalizable: false
    },
    'TE001': {
      id: 'TE001',
      nombre: 'Torta Especial de Cumpleaños',
      precio: 55000,
      imagen: tortaCumple,
      categoria: 'Torta Especial',
      descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.',
      personalizable: true
    },
    'TE002': {
      id: 'TE002',
      nombre: 'Torta Especial de Boda',
      precio: 60000,
      imagen: tortaBoda,
      categoria: 'Torta Especial',
      descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.',
      personalizable: false
    }
  };

  const producto = productos[id];

  if (!producto) {
    return (
      <div>
        <h1>Producto no encontrado</h1>
        <Link to="/productos" className="btn">Volver a Productos</Link>
      </div>
    );
  }

  const agregarAlCarrito = () => {
    const productoParaCarrito = producto.personalizable 
      ? { ...producto, mensajePersonalizado }
      : producto;

    setCarrito(prev => {
      const existente = prev.find(item => item.id === producto.id);
      if (existente) {
        return prev.map(item =>
          item.id === producto.id
            ? { 
                ...item, 
                cantidad: item.cantidad + 1,
                mensajePersonalizado: producto.personalizable ? mensajePersonalizado : item.mensajePersonalizado
              }
            : item
        );
      }
      return [...prev, { ...productoParaCarrito, cantidad: 1 }];
    });

    alert(`${producto.nombre} agregado al carrito`);
    setMensajePersonalizado('');
  };

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  return (
    <div>
      <h1>Detalle de Producto</h1>
      
      {/* Botón del carrito */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button onClick={toggleCarrito} className="btn">
          🛒 Ver Carrito ({carrito.reduce((sum, item) => sum + item.cantidad, 0)})
        </button>
      </div>
      
      {/* Carrito desplegable */}
      {mostrarCarrito && (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2>Tu Carrito de Compras</h2>
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <div>
              {carrito.map(item => (
                <div key={item.id} style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f8f8', borderRadius: '4px' }}>
                  <strong>{item.nombre}</strong><br />
                  Precio: ${item.precio.toLocaleString('es-CL')} x {item.cantidad}
                  {item.mensajePersonalizado && (
                    <div><strong>Mensaje:</strong> "{item.mensajePersonalizado}"</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Detalle del producto */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>{producto.nombre}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
          <div>
            <p><strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Código:</strong> {producto.id}</p>
            
            <div style={{ margin: '1.5rem 0' }}>
              <h3>Descripción</h3>
              <p>{producto.descripcion}</p>
            </div>
            
            {producto.personalizable && (
              <div style={{ margin: '1.5rem 0' }}>
                <h3>Personalización</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Mensaje especial (opcional)
                  </label>
                  <input 
                    type="text" 
                    value={mensajePersonalizado}
                    onChange={(e) => setMensajePersonalizado(e.target.value)}
                    placeholder="Ej: Feliz Cumpleaños"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </div>
            )}
            
            <button onClick={agregarAlCarrito} className="btn">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
        <h2>Productos Relacionados</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <h3>Torta Cuadrada de Frutas</h3>
            <p>$50.000 CLP</p>
            <Link to="/detalle-producto/TC002" className="btn">Ver Detalles</Link>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <h3>Mousse de Chocolate</h3>
            <p>$5.000 CLP</p>
            <Link to="/detalle-producto/PI001" className="btn">Ver Detalles</Link>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <h3>Brownie Sin Gluten</h3>
            <p>$4.000 CLP</p>
            <Link to="/detalle-producto/PG001" className="btn">Ver Detalles</Link>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/productos" className="btn">← Volver a Productos</Link>
      </div>
    </div>
  );
}