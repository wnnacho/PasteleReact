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

  return (
    <>
      <header style={{ backgroundColor: '#2C3E50', color: 'white', padding: '1.5rem 0', textAlign: 'center', fontFamily: 'Pacifico, cursive', fontSize: '2rem' }}>
        Pastelería Mil Sabores - Panel de Administración
      </header>
      <nav style={{ backgroundColor: '#3498DB', padding: '1rem 0', textAlign: 'center' }}>
        <a href="/admin" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }} className="active">Dashboard</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Productos</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Pedidos</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Usuarios</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Blogs</a>
        <a href="#" onClick={cerrarSesion} style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', margin: '0 0.5rem' }}>Cerrar Sesión</a>
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
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2C3E50', margin: '1rem 0' }}>156</div>
            <p>+12 este mes</p>
          </div>
          
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
            <h3>Productos Activos</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2C3E50', margin: '1rem 0' }}>16</div>
            <p>Todos disponibles</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomeAdmin