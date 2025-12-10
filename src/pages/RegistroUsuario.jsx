// src/pages/RegistroUsuario.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioService } from '../services/UsuarioService';

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
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    setError(''); // Limpiar error al cambiar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    
    // Validar términos
    if (!formData.terminos) {
      setError('Debes aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    try {
      // Preparar datos para el backend
      const usuarioData = {
        email: formData.email,
        nombre: formData.nombre,
        password: formData.password,
        fechaNacimiento: formData.fechaNacimiento || null,
        telefono: formData.telefono || ''
      };

      // Llamar al servicio de registro
      const response = await UsuarioService.registrar(usuarioData);
      
      // Guardar usuario en sesión
      UsuarioService.guardarUsuarioSesion(response.usuario);
      
      // Preparar mensaje con beneficios
      let mensaje = '¡Registro exitoso!';
      let beneficios = [];
      
      if (response.usuario.mayor50) {
        beneficios.push('50% de descuento por ser mayor de 50 años');
      }
      if (response.usuario.esEstudianteDuoc) {
        beneficios.push('Torta gratis en tu cumpleaños');
      }
      if (formData.codigoPromocional?.toUpperCase() === 'FELICES50') {
        beneficios.push('10% de descuento permanente con código FELICES50');
      }
      
      if (beneficios.length > 0) {
        mensaje += '\n\nBeneficios obtenidos:\n• ' + beneficios.join('\n• ');
      }
      
      alert(mensaje);
      navigate('/');
      
    } catch (error) {
      console.error('Error en registro:', error);
      setError(error.response?.data?.error || 'Error en el registro. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Crear Cuenta</h1>
      
      <div style={{ maxWidth: '500px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px' }}>
        
        {error && (
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '0.75rem', 
            borderRadius: '4px', 
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}
        
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
            <label htmlFor="terminos" style={{ marginLeft: '0.5rem' }}>
              Acepto los términos y condiciones *
            </label>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <input 
              type="checkbox" 
              id="newsletter" 
              name="newsletter" 
              checked={formData.newsletter}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="newsletter" style={{ marginLeft: '0.5rem' }}>
              Deseo recibir newsletter y promociones
            </label>
          </div>
          
          <button 
            type="submit" 
            className="btn" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
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
  );
};

export default RegistroUsuario;