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

  return (
    <div className="admin-theme admin-page admin-blue">
      <div className="container">
        <h2>Pedidos (Admin)</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <ul>
          {pedidos.map((p) => {
            const key = p.id || JSON.stringify(p)
            return <li key={key}>{p.id || key} - {p.email || 'sin email'} - {p.total || 0}</li>
          })}
        </ul>
      )}
      </div>
    </div>
  )
}

export default AdminPedidos
