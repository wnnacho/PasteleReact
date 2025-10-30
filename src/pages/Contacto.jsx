import React, { useState } from 'react'

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Mensaje enviado correctamente')
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    })
  }

  return (
    <main className="container">
      <h1>Contáctanos</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Estamos aquí para ayudarte. Escríbenos y te responderemos a la brevedad.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>📍 Dirección</h3>
          <p>Av. Dulce 123<br />Santiago, Chile</p>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>📞 Teléfono</h3>
          <p>+56 2 2345 6789</p>
          <p>Lunes a Sábado: 9:00 - 20:00</p>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>✉️ Email</h3>
          <p>info@pasteleriamilsabores.cl</p>
          <p>pedidos@pasteleriamilsabores.cl</p>
        </div>
      </div>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Envíanos un Mensaje</h2>
        
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
            <label htmlFor="asunto">Asunto *</label>
            <select 
              id="asunto" 
              name="asunto" 
              value={formData.asunto}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un asunto</option>
              <option value="consulta">Consulta general</option>
              <option value="pedido">Pedido especial</option>
              <option value="queja">Reclamo o queja</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje *</label>
            <textarea 
              id="mensaje" 
              name="mensaje" 
              rows="5" 
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <button type="submit" className="btn">Enviar Mensaje</button>
        </form>
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h2>También puedes encontrarnos en:</h2>
        <div style={{ margin: '1rem 0' }}>
          <a href="#" style={{ margin: '0 1rem', color: '#884513', textDecoration: 'none' }}>Facebook</a>
          <a href="#" style={{ margin: '0 1rem', color: '#884513', textDecoration: 'none' }}>Instagram</a>
          <a href="#" style={{ margin: '0 1rem', color: '#884513', textDecoration: 'none' }}>Twitter</a>
        </div>
      </div>
    </main>
  )
}

export default Contacto