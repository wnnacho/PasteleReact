import React, { useEffect, useState } from 'react'
import '../../styles/estiloAdmin.css'
import { useNavigate } from 'react-router-dom'

const AdminProductos = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role !== 'admin') navigate('/inicio-sesion')
  }, [navigate])

  const [productos, setProductos] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('productos')
      setProductos(raw ? JSON.parse(raw) : [])
    } catch (e) {
      console.error('Failed to parse productos from localStorage', e)
      setProductos([])
    }
  }, [])

  const eliminar = (id) => {
    const nueva = productos.filter(p => p.id !== id)
    setProductos(nueva)
    localStorage.setItem('productos', JSON.stringify(nueva))
  }

  return (
    <div className="admin-theme admin-page admin-blue">
      <div className="container">
        <h2>Productos (Admin)</h2>
      {productos.length === 0 ? (
        <p>No hay productos en localStorage. Esta es una lista vacía de ejemplo.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => eliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  )
}

export default AdminProductos
