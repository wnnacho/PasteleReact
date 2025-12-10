// src/pages/admin/AdminPedidos.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PedidoService } from '../../services/PedidoService';
import { AuthService } from '../../services/AuthService';
import '../../styles/estiloAdmin.css';

const AdminPedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate('/inicio-sesion');
      return;
    }

    const user = AuthService.getCurrentUser();
    if (user?.role !== 'admin') {
      navigate('/');
    }

    cargarPedidos();
  }, [navigate]);

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const datos = await PedidoService.obtenerTodos();
      setPedidos(datos);
    } catch (err) {
      setError('Error cargando pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (pedidoId, nuevoEstado) => {
    try {
      await PedidoService.cambiarEstado(pedidoId, nuevoEstado);
      cargarPedidos(); // Recargar lista
      alert('Estado actualizado');
    } catch (err) {
      alert('Error actualizando estado');
    }
  };

  const eliminarPedido = async (pedidoId) => {
    if (!window.confirm('¿Eliminar este pedido?')) return;
    
    try {
      await PedidoService.eliminar(pedidoId);
      cargarPedidos();
      alert('Pedido eliminado');
    } catch (err) {
      alert('Error eliminando pedido');
    }
  };

  const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-CL');
  };

  const adminEmail = localStorage.getItem('userEmail');

  return (
    <div className="admin-theme">
      <header>
        Pastelería Mil Sabores - Panel de Administración
        <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{adminEmail}</div>
      </header>

      <nav>
        <button type="button" onClick={() => navigate('/admin')}>Dashboard</button>
        <button type="button" onClick={() => navigate('/admin/productos')}>Productos</button>
        <button type="button" className="active" onClick={() => navigate('/admin/pedidos')}>Pedidos</button>
        <button type="button" onClick={() => navigate('/admin/usuarios')}>Usuarios</button>
      </nav>

      <main className="container">
        <h1>Gestión de Pedidos</h1>

        {error && (
          <div className="notification error">
            {error}
          </div>
        )}

        {loading ? (
          <p>Cargando pedidos...</p>
        ) : pedidos.length === 0 ? (
          <p>No hay pedidos registrados.</p>
        ) : (
          <div className="admin-panel">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(pedido => (
                  <tr key={pedido.id}>
                    <td>{pedido.id.substring(0, 8)}...</td>
                    <td>
                      <div>
                        <strong>{pedido.usuario?.nombre}</strong>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                          {pedido.usuario?.email}
                        </div>
                      </div>
                    </td>
                    <td>{formatFecha(pedido.fechaPedido)}</td>
                    <td>${pedido.total.toLocaleString('es-CL')}</td>
                    <td>
                      <select 
                        value={pedido.estado}
                        onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                        style={{
                          padding: '0.25rem',
                          borderRadius: '4px',
                          border: '1px solid #ddd'
                        }}
                      >
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="CONFIRMADO">Confirmado</option>
                        <option value="ENVIADO">Enviado</option>
                        <option value="ENTREGADO">Entregado</option>
                        <option value="CANCELADO">Cancelado</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        className="btn"
                        onClick={() => navigate(`/admin/pedidos/${pedido.id}`)}
                        style={{ marginRight: '0.5rem' }}
                      >
                        Ver
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => eliminarPedido(pedido.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button className="btn" onClick={cargarPedidos}>
            Actualizar Lista
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminPedidos;