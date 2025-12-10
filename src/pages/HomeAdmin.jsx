import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/estiloAdmin.css'

const HomeAdmin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    if (userRole !== 'admin') {
      navigate('/inicio-sesion')
    }
  }, [navigate])

  const cerrarSesion = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    navigate('/inicio-sesion')
  }

  const [users, setUsers] = React.useState([])

  useEffect(() => {
    const usersRaw = localStorage.getItem('users')
    if (usersRaw) {
      try {
        setUsers(JSON.parse(usersRaw))
      } catch (err) {
        console.error('Failed to parse users from localStorage', err)
        setUsers([])
      }
    } else {
      setUsers([])
    }
  }, [])

  const eliminarUsuario = (email) => {
    const nueva = users.filter(u => u.email !== email)
    setUsers(nueva)
    localStorage.setItem('users', JSON.stringify(nueva))
  }

  const adminEmail = localStorage.getItem('userEmail')

  return (
    <div className="admin-theme">
      <header>
        Pastelería Mil Sabores - Panel de Administración
        <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{adminEmail}</div>
      </header>

      <nav>
        <button type="button" className="active" onClick={() => navigate('/admin')}>Dashboard</button>
        <button type="button" onClick={() => navigate('/admin/productos')}>Productos</button>
        <button type="button" onClick={() => navigate('/admin/pedidos')}>Pedidos</button>
        <button type="button" onClick={() => navigate('/admin/blogs')}>Blogs</button>
        <button type="button" onClick={() => navigate('/admin/usuarios')}>Usuarios</button>
        <button type="button" onClick={cerrarSesion} style={{ float: 'right' }}>Cerrar Sesión</button>
      </nav>

      <main className="container">
        <h1>Panel de Administración</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total de Pedidos</h3>
            <div className="number">42</div>
            <p>+5 desde la semana pasada</p>
          </div>

          <div className="dashboard-card">
            <h3>Ingresos Totales</h3>
            <div className="number">$1.250.000</div>
            <p>+15% desde el mes pasado</p>
          </div>

          <div className="dashboard-card">
            <h3>Usuarios Registrados</h3>
            <div className="number">{users.length}</div>
            <p>{users.length > 0 ? `Último: ${users.at(-1).email}` : 'Sin registros'}</p>
          </div>

          <div className="dashboard-card">
            <h3>Productos Activos</h3>
            <div className="number">16</div>
            <p>Todos disponibles</p>
          </div>
        </div>

        <section className="admin-panel">
          <h2>Gestión de Usuarios</h2>
          {users.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.email}>
                    <td>{u.email}</td>
                    <td>{u.nombre}</td>
                    <td>
                      <button onClick={() => eliminarUsuario(u.email)} className="btn btn-secondary">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  )
}

export default HomeAdmin