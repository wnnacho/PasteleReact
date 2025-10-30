import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Pastelería Mil Sabores</h3>
            <p>Celebrando 50 años de tradición y sabor</p>
          </div>
          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <Link to="/">Home</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>Av. Dulce 123, Santiago</p>
            <p>+56 2 2345 6789</p>
            <p>info@pasteleriamilsabores.cl</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Pastelería Mil Sabores. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;