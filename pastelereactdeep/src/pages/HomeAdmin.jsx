import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <>
      <header style={{ backgroundColor: '#2C3E50', color: 'white', padding: '1.5rem 0', textAlign: 'center', fontFamily: 'Pacifico, cursive', fontSize: '2rem' }}>
        Pastelería Mil Sabores - Panel de Administración
        <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{adminEmail}</div>
      </header>
      <nav style={{ backgroundColor: '#3498DB', padding: '1rem 0', textAlign: 'center' }}>
        <button type="button" onClick={() => navigate('/admin')} style={{ background: 'transparent', border: 'none', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }} className="active">Dashboard</button>
        <button type="button" onClick={() => {}} style={{ background: 'transparent', border: 'none', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Productos</button>
        <button type="button" onClick={() => {}} style={{ background: 'transparent', border: 'none', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Pedidos</button>
        <button type="button" onClick={() => {}} style={{ background: 'transparent', border: 'none', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Usuarios</button>
        <button type="button" onClick={() => {}} style={{ background: 'transparent', border: 'none', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Blogs</button>
        <button type="button" onClick={cerrarSesion} style={{ background: 'transparent', border: 'none', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Cerrar Sesión</button>
      </nav>
      
      <main className="container">
        <h1>Panel de Administración</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
            <h3>Total de Pedidos</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2C3E50', margin: '1rem 0' }}>42</div>
            <p>+5 desde la semana pasada</p>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
            <h3>Ingresos Totales</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2C3E50', margin: '1rem 0' }}>$1.250.000</div>
            <p>+15% desde el mes pasado</p>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
            <h3>Usuarios Registrados</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2C3E50', margin: '1rem 0' }}>{users.length}</div>
            <p>{users.length > 0 ? `Último: ${users.at(-1).email}` : 'Sin registros'}</p>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
            <h3>Productos Activos</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2C3E50', margin: '1rem 0' }}>16</div>
            <p>Todos disponibles</p>
          </div>
        </div>

        <section style={{ marginTop: '2rem', background: 'white', padding: '1rem', borderRadius: 8 }}>
          <h2>Gestión de Usuarios</h2>
          {users.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Nombre</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.email}>
                    <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{u.email}</td>
                    <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>{u.nombre}</td>
                    <td style={{ padding: '8px', borderTop: '1px solid #eee' }}>
                      <button onClick={() => eliminarUsuario(u.email)} className="btn btn-secondary">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </>
  )
}

export default HomeAdmin