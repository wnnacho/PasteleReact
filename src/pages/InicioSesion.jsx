// src/pages/InicioSesion.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

const InicioSesion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Usar el servicio de autenticación
      await AuthService.login(formData.email, formData.password);
      
      // Si "recordar sesión" está marcado, ya se guardó en localStorage
      if (!formData.remember) {
        // Para sesiones no persistentes, podrías usar sessionStorage
        // Por ahora usamos localStorage para simplicidad
      }
      
      // Redirigir al panel de administración
      navigate('/admin');
    } catch (err) {
      setError('Credenciales inválidas. Usa: admin@pasteleriamilsabores.cl / admin123');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>Iniciar Sesión</h1>
      
      <div style={{ maxWidth: '400px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px' }}>
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
          
          <div style={{ marginBottom: '1rem' }}>
            <input 
              type="checkbox" 
              id="remember" 
              name="remember" 
              checked={formData.remember}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="remember" style={{ marginLeft: '0.5rem' }}>
              Recordar mi sesión
            </label>
          </div>
          
          <button 
            type="submit" 
            className="btn" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>¿No tienes cuenta? <a href="/registro" style={{ color: '#884513' }}>Regístrate aquí</a></p>
          <p>
            <button 
              type="button" 
              onClick={() => alert('Funcionalidad de recuperar contraseña no implementada')} 
              style={{ color: '#884513', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </p>
        </div>
        
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FFF5E1', borderRadius: '4px' }}>
          <h3 style={{ color: '#884513', marginBottom: '0.5rem' }}>¿Eres estudiante Duoc?</h3>
          <p style={{ fontSize: '0.9rem' }}>
            Regístrate con tu correo institucional para recibir torta gratis en tu cumpleaños
          </p>
        </div>

        {/* Credenciales de prueba */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#e7f3ff', borderRadius: '4px', fontSize: '0.85rem' }}>
          <strong>Credenciales de prueba:</strong>
          <p>Email: admin@pasteleriamilsabores.cl</p>
          <p>Contraseña: admin123</p>
        </div>
      </div>
    </main>
  );
};

export default InicioSesion;