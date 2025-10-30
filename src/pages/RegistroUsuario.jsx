import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    codigoPromocional: '',
    terminos: false,
    newsletter: true
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
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }
    
    // Validar edad para descuento
    const fechaNacimiento = new Date(formData.fechaNacimiento)
    const hoy = new Date()
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    
    // Validar código promocional
    if (formData.codigoPromocional && formData.codigoPromocional.toUpperCase() === 'FELICES50') {
      alert('¡Código FELICES50 aplicado! Obtendrás 10% de descuento permanente')
    }
    
    // Validar si es estudiante Duoc
    if (formData.email.includes('@duoc.cl') || formData.email.includes('@duocuc.cl')) {
      alert('¡Estudiante Duoc detectado! Recibirás torta gratis en tu cumpleaños')
    }
    
    // Validar si es mayor de 50 años
    if (edad > 50) {
      alert('¡Obtendrás 50% de descuento por ser mayor de 50 años!')
    }
    
    // Simulación de registro exitoso
    // Guardar usuario en localStorage (simulación simple) con validación de email duplicado
    try {
      const usersRaw = localStorage.getItem('users')
      const users = usersRaw ? JSON.parse(usersRaw) : []
      const exists = users.find(u => u.email === formData.email)
      if (exists) {
        alert('Ya existe una cuenta con ese email. Por favor inicia sesión o usa otro email.')
        return
      }
      users.push({ email: formData.email, password: formData.password, nombre: formData.nombre })
      localStorage.setItem('users', JSON.stringify(users))
    } catch (err) {
      console.error('Error guardando usuario', err)
    }

    alert('Registro exitoso')
    navigate('/')
  }

  return (
    <main className="container">
      <h1>Crear Cuenta</h1>
      
      <div style={{ maxWidth: '500px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo *</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              value={formData.nombre}
              onChange={handleChange}
              required 
            />
          </div>
          
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
            <label htmlFor="fechaNacimiento">Fecha de nacimiento *</label>
            <input 
              type="date" 
              id="fechaNacimiento" 
              name="fechaNacimiento" 
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input 
              type="tel" 
              id="telefono" 
              name="telefono" 
              value={formData.telefono}
              onChange={handleChange}
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
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña *</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="codigoPromocional">Código promocional (opcional)</label>
            <input 
              type="text" 
              id="codigoPromocional" 
              name="codigoPromocional" 
              value={formData.codigoPromocional}
              onChange={handleChange}
              placeholder="Ej: FELICES50" 
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <input 
              type="checkbox" 
              id="terminos" 
              name="terminos" 
              checked={formData.terminos}
              onChange={handleChange}
              required 
            />
            <label htmlFor="terminos">Acepto los términos y condiciones *</label>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <input 
              type="checkbox" 
              id="newsletter" 
              name="newsletter" 
              checked={formData.newsletter}
              onChange={handleChange}
            />
            <label htmlFor="newsletter">Deseo recibir newsletter y promociones</label>
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Crear Cuenta
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>¿Ya tienes cuenta? <a href="/inicio-sesion" style={{ color: '#884513' }}>Inicia sesión aquí</a></p>
        </div>
        
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FFF5E1', borderRadius: '4px' }}>
          <h3 style={{ color: '#884513', marginBottom: '0.5rem' }}>Beneficios exclusivos</h3>
          <ul style={{ fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
            <li>50% de descuento si eres mayor de 50 años</li>
            <li>10% de descuento permanente con código FELICES50</li>
            <li>Torta gratis en tu cumpleaños si eres estudiante Duoc</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default RegistroUsuario