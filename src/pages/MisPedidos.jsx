// src/pages/MisPedidos.jsx - VERSIÓN COMPLETA CORREGIDA
import React, { useState, useEffect } from 'react';
import { PedidoService } from '../services/PedidoService';
import { UsuarioService } from '../services/UsuarioService';
import { useNavigate } from 'react-router-dom';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Obtener usuario actual con logs
        const usuario = UsuarioService.obtenerUsuarioActual();
        console.log('🔍 Usuario en MisPedidos:', usuario);
        
        if (!usuario || !usuario.email) {
          setError('❌ No hay usuario registrado. Por favor, inicia sesión.');
          setLoading(false);
          
          // Redirigir al login después de 2 segundos
          setTimeout(() => {
            navigate('/inicio-sesion');
          }, 2000);
          return;
        }
        
        setUsuarioInfo(usuario);
        
        console.log(`📦 Buscando pedidos para: ${usuario.email}`);
        const datos = await PedidoService.obtenerMisPedidos(usuario.email);
        console.log('📦 Datos recibidos del backend:', datos);
        
        // Validar y formatear los datos
        if (datos && Array.isArray(datos)) {
          if (datos.length === 0) {
            console.log('ℹ️ No hay pedidos para mostrar');
            setPedidos([]);
          } else {
            console.log(`✅ Se encontraron ${datos.length} pedidos`);
            
            // Mapear los datos para asegurar formato correcto
            const pedidosFormateados = datos.map(pedido => ({
              id: pedido.id || 'N/A',
              fechaPedido: pedido.fechaPedido || new Date().toISOString(),
              total: pedido.total || 0,
              estado: pedido.estado || 'PENDIENTE',
              direccionEnvio: pedido.direccionEnvio || '',
              telefonoContacto: pedido.telefonoContacto || '',
              notas: pedido.notas || '',
              items: pedido.items || [],
              usuario: pedido.usuario || usuario
            }));
            
            setPedidos(pedidosFormateados);
          }
        } else {
          console.warn('⚠️ Los datos no son un array:', datos);
          setPedidos([]);
        }
        
      } catch (err) {
        console.error('🔥 Error cargando pedidos:', err);
        console.error('🔥 Error details:', err.response?.data || err.message);
        
        if (err.response?.status === 401) {
          setError('🔒 Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          setTimeout(() => navigate('/inicio-sesion'), 2000);
        } else if (err.response?.status === 404) {
          setError('📭 No se encontraron pedidos para tu cuenta.');
          setPedidos([]);
        } else {
          setError('❌ Error al cargar tus pedidos. Por favor, intenta nuevamente.');
        }
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, [navigate]);

  const formatFecha = (fechaString) => {
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Error formateando fecha:', e);
      return 'Fecha no disponible';
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado?.toUpperCase()) {
      case 'PENDIENTE': return '#fff3cd';
      case 'CONFIRMADO': return '#d1ecf1';
      case 'ENVIADO': return '#d4edda';
      case 'ENTREGADO': return '#c3e6cb';
      case 'CANCELADO': return '#f8d7da';
      default: return '#f0f0f0';
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado?.toUpperCase()) {
      case 'PENDIENTE': return 'Pendiente';
      case 'CONFIRMADO': return 'Confirmado';
      case 'ENVIADO': return 'Enviado';
      case 'ENTREGADO': return 'Entregado';
      case 'CANCELADO': return 'Cancelado';
      default: return estado || 'Desconocido';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Mis Pedidos</h1>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '1.2rem', color: '#884513', marginBottom: '1rem' }}>
            🔍 Cargando tus pedidos...
          </div>
          <div className="spinner" style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #884513',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Mis Pedidos</h1>
      
      {usuarioInfo && (
        <div style={{ 
          background: '#FFF5E1', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>
            <strong>👤 Usuario:</strong> {usuarioInfo.nombre || usuarioInfo.email}
            {usuarioInfo.mayor50 && ' 🎂 (50% descuento)'}
            {usuarioInfo.esEstudianteDuoc && ' 🎓 (Estudiante Duoc)'}
          </p>
        </div>
      )}
      
      {error && (
        <div style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1.5rem',
          borderLeft: '4px solid #dc3545'
        }}>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}
      
      {pedidos.length === 0 && !error ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <h3 style={{ color: '#5D4037' }}>No tienes pedidos aún</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            ¡Realiza tu primer pedido y aparecerá aquí!
          </p>
          <button 
            className="btn" 
            onClick={() => navigate('/productos')}
            style={{ padding: '0.75rem 2rem' }}
          >
            Ir a Productos
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ margin: 0 }}>Historial de Pedidos</h2>
            <span style={{ 
              background: '#884513', 
              color: 'white', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {pedidos.map(pedido => (
            <div key={pedido.id} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${getEstadoColor(pedido.estado)}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#5D4037' }}>
                    Pedido #{pedido.id.substring(0, 8).toUpperCase()}
                  </h3>
                  <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                    📅 {formatFecha(pedido.fechaPedido)}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    background: getEstadoColor(pedido.estado),
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    display: 'inline-block',
                    marginBottom: '0.5rem'
                  }}>
                    {getEstadoTexto(pedido.estado)}
                  </span>
                  <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 'bold', color: '#884513' }}>
                    ${pedido.total?.toLocaleString('es-CL') || '0'}
                  </p>
                </div>
              </div>
              
              {pedido.items && pedido.items.length > 0 && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                  <h4 style={{ marginBottom: '0.5rem', color: '#5D4037' }}>📋 Productos:</h4>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {pedido.items.map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: index % 2 === 0 ? '#f9f9f9' : 'white',
                        borderRadius: '4px',
                        marginBottom: '0.25rem'
                      }}>
                        <div style={{ flex: 1 }}>
                          <strong>{item.productoNombre || 'Producto'}</strong>
                          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                            <span style={{ fontSize: '0.85rem', color: '#666' }}>
                              Cantidad: {item.cantidad || 1}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#666' }}>
                              Precio: ${item.precioUnitario?.toLocaleString('es-CL') || '0'}
                            </span>
                          </div>
                          {item.personalizacion && (
                            <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: '#1ABC9C' }}>
                              ✏️ <strong>Personalizado:</strong> "{item.personalizacion}"
                            </div>
                          )}
                        </div>
                        <div style={{ fontWeight: 'bold', color: '#884513', minWidth: '80px', textAlign: 'right' }}>
                          ${item.subtotal?.toLocaleString('es-CL') || '0'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {(pedido.direccionEnvio || pedido.telefonoContacto || pedido.notas) && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <h4 style={{ marginBottom: '0.5rem', color: '#5D4037' }}>📦 Información del pedido:</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {pedido.direccionEnvio && (
                      <div>
                        <strong>📍 Dirección:</strong>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>{pedido.direccionEnvio}</p>
                      </div>
                    )}
                    {pedido.telefonoContacto && (
                      <div>
                        <strong>📞 Teléfono:</strong>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>{pedido.telefonoContacto}</p>
                      </div>
                    )}
                    {pedido.notas && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong>📝 Notas:</strong>
                        <p style={{ 
                          margin: '0.25rem 0', 
                          fontSize: '0.9rem', 
                          background: '#f8f8f8', 
                          padding: '0.5rem',
                          borderRadius: '4px'
                        }}>
                          {pedido.notas}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '0.9rem', color: '#666' }}>
                ID completo: <code>{pedido.id}</code>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          className="btn" 
          onClick={() => window.location.reload()}
          style={{ marginRight: '1rem' }}
        >
          🔄 Actualizar
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate('/productos')}
        >
          🛒 Seguir comprando
        </button>
      </div>
    </div>
  );
};

export default MisPedidos;