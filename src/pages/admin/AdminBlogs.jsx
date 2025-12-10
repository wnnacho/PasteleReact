import React, { useEffect, useState } from 'react'
import '../../styles/estiloAdmin.css'
import { useNavigate } from 'react-router-dom'

const AdminBlogs = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role !== 'admin') navigate('/inicio-sesion')
  }, [navigate])

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('blogs')
      setBlogs(raw ? JSON.parse(raw) : [])
    } catch (e) {
      console.error('Failed to parse blogs from localStorage', e)
      setBlogs([])
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
        <button type="button" onClick={() => navigate('/admin/pedidos')}>Pedidos</button>
        <button type="button" className="active" onClick={() => navigate('/admin/blogs')}>Blogs</button>
        <button type="button" onClick={() => navigate('/admin/usuarios')}>Usuarios</button>
      </nav>
      <div className="container">
        <h2>Blogs (Admin)</h2>
        {blogs.length === 0 ? (
          <p>No hay entradas de blog registradas.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Título</th><th>Categoría</th><th>Fecha</th></tr>
            </thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b.id || b.titulo}>
                  <td>{b.titulo}</td>
                  <td>{b.categoria || '-'}</td>
                  <td>{b.fecha || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminBlogs
