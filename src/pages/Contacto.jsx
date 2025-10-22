// src/pages/Contacto.jsx - VERSIÓN MEJORADA
import React, { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setEnviado(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email no válido';
    }

    if (!formData.asunto) {
      newErrors.asunto = 'Debes seleccionar un asunto';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log('Datos del formulario:', formData);
    setEnviado(true);
    
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
    setErrors({});
  };

  return (
    <div>
      <h1>Contáctanos</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Estamos aquí para ayudarte. Escríbenos y te responderemos a la brevedad.
      </p>
      
      {/* Información de contacto */}
      <div className="grid">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#884513' }}>📍 Dirección</h3>
          <p>Av. Dulce 123<br />Santiago, Chile</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#884513' }}>📞 Teléfono</h3>
          <p>+56 2 2345 6789</p>
          <p>Lunes a Sábado: 9:00 - 20:00</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#884513' }}>✉️ Email</h3>
          <p>info@pasteleriamilsabores.cl</p>
          <p>pedidos@pasteleriamilsabores.cl</p>
        </div>
      </div>
      
      {/* Formulario de contacto */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Envíanos un Mensaje</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre completo *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`form-input ${errors.nombre ? 'error' : ''}`}
              placeholder="Ingresa tu nombre completo"
            />
            {errors.nombre && <div className="error-message">{errors.nombre}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="tu@email.com"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Teléfono (opcional)</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="form-input"
              placeholder="+56 9 1234 5678"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Asunto *</label>
            <select
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              className={`form-select ${errors.asunto ? 'error' : ''}`}
            >
              <option value="">Selecciona un asunto</option>
              <option value="consulta">Consulta general</option>
              <option value="pedido">Pedido especial</option>
              <option value="queja">Reclamo o queja</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="otros">Otros</option>
            </select>
            {errors.asunto && <div className="error-message">{errors.asunto}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Mensaje *</label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows="5"
              className={`form-textarea ${errors.mensaje ? 'error' : ''}`}
              placeholder="Escribe tu mensaje aquí..."
            />
            {errors.mensaje && <div className="error-message">{errors.mensaje}</div>}
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Enviar Mensaje
          </button>

          {enviado && <div className="success-message">¡Mensaje enviado correctamente! Te contactaremos pronto.</div>}
        </form>
      </div>
      
      {/* Redes sociales */}
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2>También puedes encontrarnos en:</h2>
        <div className="social-links">
          <a href="#" className="social-link">📘 Facebook</a>
          <a href="#" className="social-link">📷 Instagram</a>
          <a href="#" className="social-link">🐦 Twitter</a>
        </div>
      </div>

      {/* Mapa de ubicación */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Nuestra Ubicación</h2>
        <div className="map-placeholder">
          <p>
            🗺️ Mapa de ubicación<br />
            <small>Av. Dulce 123, Santiago</small>
          </p>
        </div>
      </div>
    </div>
  );
}