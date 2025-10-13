// src/pages/RegistroUsuario.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function RegistroUsuario() {
  return (
    <div>
      <h1>Crear Cuenta</h1>
      
      <div style={{ maxWidth: '500px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px' }}>
        <form>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nombre completo *
            </label>
            <input 
              type="text" 
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
          
          <div style={{ marginBottom: '1.5rem' }}>
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
          
          <div style={{ marginBottom: '1.5rem' }}>
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
              <input type="checkbox" required />
              Acepto los términos y condiciones *
            </label>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" defaultChecked />
              Deseo recibir newsletter y promociones
            </label>
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Crear Cuenta
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>¿Ya tienes cuenta? <Link to="/inicio-sesion" className="aside-link">Inicia sesión aquí</Link></p>
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
    </div>
  );
}