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

  return (
    <div className="admin-theme admin-page admin-blue">
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
