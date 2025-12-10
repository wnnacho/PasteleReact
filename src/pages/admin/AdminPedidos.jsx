import React, { useEffect, useState } from 'react'
import '../../styles/estiloAdmin.css'
import { useNavigate } from 'react-router-dom'

const AdminPedidos = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role !== 'admin') navigate('/inicio-sesion')
  }, [navigate])

  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pedidos')
      setPedidos(raw ? JSON.parse(raw) : [])
    } catch (e) {
      console.error('Failed to parse pedidos from localStorage', e)
      setPedidos([])
    }
  }, [])

  const adminEmail = localStorage.getItem('userEmail')
  return (
    <div className="admin-theme admin-page admin-blue">
      <header>
        Pastelería Mil Sabores - Panel de Administración
        <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{adminEmail}</div>
      </header>
      <nav>
        <button type="button" onClick={() => navigate('/admin')}>Dashboard</button>
        <button type="button" onClick={() => navigate('/admin/productos')}>Productos</button>
        <button type="button" className="active" onClick={() => navigate('/admin/pedidos')}>Pedidos</button>
        <button type="button" onClick={() => navigate('/admin/blogs')}>Blogs</button>
        <button type="button" onClick={() => navigate('/admin/usuarios')}>Usuarios</button>
      </nav>
      <div className="container">
        <h2>Pedidos (Admin)</h2>
        {pedidos.length === 0 ? (
          <p>No hay pedidos registrados.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Email</th><th>Total</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id || JSON.stringify(p)}>
                  <td>{p.id || '-'}</td>
                  <td>{p.email || '-'}</td>
                  <td>{p.total || 0}</td>
                  <td>{p.estado || 'pendiente'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminPedidos
