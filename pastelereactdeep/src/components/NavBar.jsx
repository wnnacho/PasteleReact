import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <header>
        Pastelería Mil Sabores
      </header>
      <nav>
        <Link to="/" className={isActive('/')}>Home</Link>
        <Link to="/productos" className={isActive('/productos')}>Productos</Link>
        <Link to="/nosotros" className={isActive('/nosotros')}>Nosotros</Link>
        <Link to="/blogs" className={isActive('/blogs')}>Blogs</Link>
        <Link to="/contacto" className={isActive('/contacto')}>Contacto</Link>
      </nav>
      <aside>
        <Link to="/inicio-sesion">Inicio de sesión</Link> / <Link to="/registro">Registrar Usuario</Link>
      </aside>
    </>
  );
};

export default NavBar;