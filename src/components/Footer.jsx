// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Sección 1: Información de la pastelería */}
          <div className="footer-section">
            <h3>Pastelería Mil Sabores</h3>
            <p>Celebrando 50 años de tradición y sabor</p>
          </div>
          
          {/* Sección 2: Enlaces rápidos */}
          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/productos" className="footer-link">Productos</Link>
            <Link to="/contacto" className="footer-link">Contacto</Link>
          </div>
          
          {/* Sección 3: Contacto */}
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>Av. Dulce 123, Santiago</p>
            <p>+56 2 2345 6789</p>
            <p>info@pasteleriamilsabores.cl</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Pastelería Mil Sabores. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}