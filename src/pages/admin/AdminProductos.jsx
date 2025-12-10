// src/pages/admin/AdminProductos.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { AuthService } from '../../services/AuthService';
import '../../styles/estiloAdmin.css';

const AdminProductos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    id: '',
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    personalizable: false,
    imagen: ''
  });
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Verificar autenticación
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate('/inicio-sesion');
      return;
    }

    const user = AuthService.getCurrentUser();
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  // Cargar productos
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAll();
      setProductos(data);
      setError('');
    } catch (err) {
      setError('Error al cargar productos. Verifica la conexión con el backend.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditando(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const crearProducto = async () => {
    try {
      // Validar campos requeridos
      if (!nuevoProducto.id || !nuevoProducto.nombre || !nuevoProducto.precio) {
        setError('ID, Nombre y Precio son campos requeridos');
        return;
      }

      const productoData = {
        ...nuevoProducto,
        precio: parseFloat(nuevoProducto.precio)
      };

      const producto = await ProductService.create(productoData);
      setProductos(prev => [...prev, producto]);
      
      setSuccessMessage('Producto creado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Limpiar formulario
      setNuevoProducto({
        id: '',
        nombre: '',
        categoria: '',
        precio: '',
        descripcion: '',
        personalizable: false,
        imagen: ''
      });
    } catch (err) {
      setError(`Error al crear producto: ${err.message}`);
    }
  };

  const actualizarProducto = async () => {
    try {
      if (!editando) return;

      const productoData = {
        ...editando,
        precio: parseFloat(editando.precio)
      };

      const productoActualizado = await ProductService.update(editando.id, productoData);
      
      setProductos(prev => prev.map(p => 
        p.id === productoActualizado.id ? productoActualizado : p
      ));
      
      setSuccessMessage('Producto actualizado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setEditando(null);
    } catch (err) {
      setError(`Error al actualizar producto: ${err.message}`);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await ProductService.delete(id);
      setProductos(prev => prev.filter(p => p.id !== id));
      
      setSuccessMessage('Producto eliminado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(`Error al eliminar producto: ${err.message}`);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/inicio-sesion');
  };

  const adminEmail = localStorage.getItem('userEmail');

  return (
    <div className="admin-theme">
      <header>
        Pastelería Mil Sabores - Panel de Administración
        <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          {adminEmail} | <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#3498DB', cursor: 'pointer' }}>Cerrar sesión</button>
        </div>
      </header>

      <nav>
        <button type="button" onClick={() => navigate('/admin')}>Dashboard</button>
        <button type="button" className="active" onClick={() => navigate('/admin/productos')}>Productos</button>
        <button type="button" onClick={() => navigate('/admin/pedidos')}>Pedidos</button>
        <button type="button" onClick={() => navigate('/admin/blogs')}>Blogs</button>
        <button type="button" onClick={() => navigate('/admin/usuarios')}>Usuarios</button>
      </nav>

      <main className="container">
        <h1>Gestión de Productos</h1>

        {error && (
          <div className="notification error" style={{ marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="notification success" style={{ marginBottom: '1rem' }}>
            {successMessage}
          </div>
        )}

        <div className="admin-panel">
          <h2>Crear Nuevo Producto</h2>
          <div className="grid-2">
            <div className="form-group">
              <label>ID *</label>
              <input 
                type="text" 
                name="id"
                value={nuevoProducto.id}
                onChange={handleInputChange}
                placeholder="Ej: TC001"
              />
            </div>
            
            <div className="form-group">
              <label>Nombre *</label>
              <input 
                type="text" 
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleInputChange}
                placeholder="Nombre del producto"
              />
            </div>
            
            <div className="form-group">
              <label>Categoría</label>
              <input 
                type="text" 
                name="categoria"
                value={nuevoProducto.categoria}
                onChange={handleInputChange}
                placeholder="Ej: Tortas Cuadradas"
              />
            </div>
            
            <div className="form-group">
              <label>Precio *</label>
              <input 
                type="number" 
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Ruta de Imagen</label>
              <input 
                type="text" 
                name="imagen"
                value={nuevoProducto.imagen}
                onChange={handleInputChange}
                placeholder="/img/tcchocolate.webp"
              />
            </div>
            
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input 
                type="checkbox" 
                id="personalizable"
                name="personalizable"
                checked={nuevoProducto.personalizable}
                onChange={handleInputChange}
              />
              <label htmlFor="personalizable" style={{ marginBottom: 0 }}>Personalizable</label>
            </div>
            
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Descripción</label>
              <textarea 
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del producto"
                rows="3"
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn" onClick={crearProducto}>
              Crear Producto
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => setNuevoProducto({
                id: '',
                nombre: '',
                categoria: '',
                precio: '',
                descripcion: '',
                personalizable: false,
                imagen: ''
              })}
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className="admin-panel" style={{ marginTop: '2rem' }}>
          <h2>Lista de Productos ({productos.length})</h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Cargando productos...</p>
            </div>
          ) : productos.length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Personalizable</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>
                      {editando?.id === producto.id ? (
                        <input 
                          type="text" 
                          name="nombre"
                          value={editando.nombre}
                          onChange={handleEditInputChange}
                          style={{ width: '100%' }}
                        />
                      ) : producto.nombre}
                    </td>
                    <td>
                      {editando?.id === producto.id ? (
                        <input 
                          type="text" 
                          name="categoria"
                          value={editando.categoria}
                          onChange={handleEditInputChange}
                          style={{ width: '100%' }}
                        />
                      ) : producto.categoria}
                    </td>
                    <td>
                      {editando?.id === producto.id ? (
                        <input 
                          type="number" 
                          name="precio"
                          value={editando.precio}
                          onChange={handleEditInputChange}
                          style={{ width: '100%' }}
                          step="0.01"
                          min="0"
                        />
                      ) : `$${producto.precio?.toLocaleString('es-CL') || '0'}`}
                    </td>
                    <td>
                      {editando?.id === producto.id ? (
                        <input 
                          type="checkbox" 
                          name="personalizable"
                          checked={editando.personalizable}
                          onChange={handleEditInputChange}
                        />
                      ) : producto.personalizable ? 'Sí' : 'No'}
                    </td>
                    <td>
                      {editando?.id === producto.id ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-success" onClick={actualizarProducto}>
                            Guardar
                          </button>
                          <button className="btn btn-secondary" onClick={() => setEditando(null)}>
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn" onClick={() => setEditando(producto)}>
                            Editar
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            onClick={() => eliminarProducto(producto.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProductos;