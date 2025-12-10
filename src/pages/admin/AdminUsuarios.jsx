import React, { useEffect, useState } from 'react'
import '../../styles/estiloAdmin.css'
import { useNavigate } from 'react-router-dom'

const AdminUsuarios = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role !== 'admin') navigate('/inicio-sesion')
  }, [navigate])

  const [users, setUsers] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('users')
      setUsers(raw ? JSON.parse(raw) : [])
    } catch (e) {
      console.error('Failed to parse users from localStorage', e)
      setUsers([])
    }
  }, [])

  const eliminar = (email) => {
    const nueva = users.filter(u => u.email !== email)
    setUsers(nueva)
    localStorage.setItem('users', JSON.stringify(nueva))
  }

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
        <button type="button" onClick={() => navigate('/admin/blogs')}>Blogs</button>
        <button type="button" className="active" onClick={() => navigate('/admin/usuarios')}>Usuarios</button>
      </nav>
      <div className="container">
        <h2>Usuarios (Admin)</h2>
      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr><th>Email</th><th>Nombre</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.email}>
                <td>{u.email}</td>
                <td>{u.nombre}</td>
                <td><button className="btn btn-secondary" onClick={() => eliminar(u.email)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  )
}

export default AdminUsuarios
