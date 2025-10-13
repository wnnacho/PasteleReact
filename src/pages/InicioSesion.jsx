// src/pages/InicioSesion.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function InicioSesion() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Iniciar Sesión</h1>
      
      <div className="card">
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Email *
            </label>
            <input 
              type="email" 
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontFamily: 'inherit'
              }}
              required 
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Contraseña *
            </label>
            <input 
              type="password" 
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontFamily: 'inherit'
              }}
              required 
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" />
              Recordar mi sesión
            </label>
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Iniciar Sesión
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>¿No tienes cuenta? <Link to="/registro" className="aside-link">Regístrate aquí</Link></p>
          <p><a href="#" className="aside-link">¿Olvidaste tu contraseña?</a></p>
        </div>
        
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FFF5E1', borderRadius: '4px' }}>
          <h3 style={{ color: '#884513', marginBottom: '0.5rem' }}>¿Eres estudiante Duoc?</h3>
          <p style={{ fontSize: '0.9rem' }}>
            Regístrate con tu correo institucional para recibir torta gratis en tu cumpleaños
          </p>
        </div>
      </div>
    </div>
  );
}