import React, { useState, useEffect } from 'react';

const Productos = () => {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [carrito, setCarrito] = useState([]);

  // Productos de ejemplo
  const productos = [
    { 
      id: 'TC001', 
      categoria: 'Tortas Cuadradas', 
      nombre: 'Torta Cuadrada de Chocolate', 
      precio: 45000, 
      imagen: '../img/tcchocolate.webp',
      descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.',
      personalizable: true
    },
    { 
      id: 'TC002', 
      categoria: 'Tortas Cuadradas', 
      nombre: 'Torta Cuadrada de Frutas', 
      precio: 50000, 
      imagen: '../img/tccfrutas.jpg',
      descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla.',
      personalizable: false
    },
    { 
      id: 'TT001', 
      categoria: 'Tortas Circulares', 
      nombre: 'Torta Circular de Vainilla', 
      precio: 40000, 
      imagen: '../img/tcvainilla.jpg',
      descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera.',
      personalizable: false
    }
  ];

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
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
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
                  <div style={{ marginTop: '0.5rem' }}>
                    <button 
                      onClick={() => eliminarDelCarrito(item.id)} 
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.5rem' }}
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
              </div>
            </>
          )}
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
              justifyContent: 'center' 
            }}>
              Imagen
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
              <button className="btn btn-secondary">
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;