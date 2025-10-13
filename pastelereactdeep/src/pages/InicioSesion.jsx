import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InicioSesion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Credenciales de administrador
    const adminCredentials = {
      email: 'admin@pasteleriamilsabores.cl',
      password: 'admin123'
    }
    
    // Validar credenciales
    if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
      localStorage.setItem('userRole', 'admin')
      localStorage.setItem('userEmail', formData.email)
      alert('Inicio de sesión como administrador exitoso')
      navigate('/admin')
    } else {
      localStorage.setItem('userRole', 'user')
      localStorage.setItem('userEmail', formData.email)
      
      if (formData.email.includes('@duoc.cl') || formData.email.includes('@duocuc.cl')) {
        alert('¡Hola estudiante Duoc! Tienes beneficios especiales')
      }
      
      alert('Inicio de sesión exitoso')
      navigate('/')
    }
  }

  return (
    <main className="container">
      <h1>Iniciar Sesión</h1>
      
      <div style={{ maxWidth: '400px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña *</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <input 
              type="checkbox" 
              id="remember" 
              name="remember" 
              checked={formData.remember}
              onChange={handleChange}
            />
            <label htmlFor="remember">Recordar mi sesión</label>
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Iniciar Sesión
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>¿No tienes cuenta? <a href="/registro" style={{ color: '#884513' }}>Regístrate aquí</a></p>
          <p><a href="#" style={{ color: '#884513' }}>¿Olvidaste tu contraseña?</a></p>
        </div>
        
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FFF5E1', borderRadius: '4px' }}>
          <h3 style={{ color: '#884513', marginBottom: '0.5rem' }}>¿Eres estudiante Duoc?</h3>
          <p style={{ fontSize: '0.9rem' }}>Regístrate con tu correo institucional para recibir torta gratis en tu cumpleaños</p>
        </div>
      </div>
    </main>
  )
}

export default InicioSesion