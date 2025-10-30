import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ role: null, email: null, nombre: null });

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    let nombre = null;
    try {
      const usersRaw = localStorage.getItem('users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const found = users.find(u => u.email === email);
      if (found) nombre = found.nombre;
    } catch (err) {
      nombre = null;
    }
    setUser({ role, email, nombre });
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/inicio-sesion');
    setUser({ role: null, email: null, nombre: null });
  };

  // Hide NavBar on admin routes (App also hides it, but double-safeguard)
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <>
      <header>
        Pastelería Mil Sabores
        {user.email && (
          <span style={{ float: 'right', marginRight: '1rem', fontWeight: 'bold' }}>
            Bienvenido{user.nombre ? `, ${user.nombre}` : ''}
          </span>
        )}
      </header>
      <nav>
        <Link to="/" className={isActive('/')}>Home</Link>
        <Link to="/productos" className={isActive('/productos')}>Productos</Link>
        <Link to="/nosotros" className={isActive('/nosotros')}>Nosotros</Link>
        <Link to="/blogs" className={isActive('/blogs')}>Blogs</Link>
        <Link to="/contacto" className={isActive('/contacto')}>Contacto</Link>
      </nav>
      <aside>
        {!user.email ? (
          <>
            <Link to="/inicio-sesion">Inicio de sesión</Link> / <Link to="/registro">Registrar Usuario</Link>
          </>
        ) : (
          <>
            {user.role === 'admin' && <Link to="/admin" style={{ marginRight: '0.5rem' }}>Panel Admin</Link>}
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#884513', cursor: 'pointer' }}>Cerrar sesión</button>
          </>
        )}
      </aside>
    </>
  );
};

export default NavBar;