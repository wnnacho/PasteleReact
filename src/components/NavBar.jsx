// src/components/NavBar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthService } from '../utils/auth';
import { UsuarioService } from '../services/UsuarioService';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Estado para usuario
  const [userInfo, setUserInfo] = useState({
    role: null,
    email: null,
    nombre: null,
    isAdmin: false,
    isUser: false
  });

  useEffect(() => {
    // Verificar si es ADMIN (JWT)
    const adminToken = localStorage.getItem('adminToken');
    const adminEmail = localStorage.getItem('userEmail');
    
    // Verificar si es USUARIO normal
    const usuarioData = UsuarioService.obtenerUsuarioActual();
    
    if (adminToken && adminEmail) {
      // Es administrador
      setUserInfo({
        role: 'admin',
        email: adminEmail,
        nombre: 'Administrador',
        isAdmin: true,
        isUser: false
      });
    } else if (usuarioData) {
      // Es usuario normal
      setUserInfo({
        role: 'user',
        email: usuarioData.email,
        nombre: usuarioData.nombre,
        isAdmin: false,
        isUser: true
      });
    } else {
      // No está logueado
      setUserInfo({
        role: null,
        email: null,
        nombre: null,
        isAdmin: false,
        isUser: false
      });
    }
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    // Cerrar sesión según el tipo de usuario
    if (userInfo.isAdmin) {
      // Logout de admin
      AuthService.logout();
    } else if (userInfo.isUser) {
      // Logout de usuario normal
      UsuarioService.logout();
    }
    
    // Redirigir al home
    navigate('/');
    // Forzar recarga del estado
    window.location.reload();
  };

  // Hide NavBar on admin routes
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <>
      <header>
        Pastelería Mil Sabores
        {userInfo.email && (
          <span style={{ 
            float: 'right', 
            marginRight: '1rem', 
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            👤 {userInfo.nombre || userInfo.email}
          </span>
        )}
      </header>
      
      <nav>
        <Link to="/" className={isActive('/')}>Home</Link>
        <Link to="/productos" className={isActive('/productos')}>Productos</Link>
        <Link to="/nosotros" className={isActive('/nosotros')}>Nosotros</Link>
        <Link to="/blogs" className={isActive('/blogs')}>Blogs</Link>
        <Link to="/contacto" className={isActive('/contacto')}>Contacto</Link>
        
        {/* Enlace a Mis Pedidos si es usuario normal */}
        {userInfo.isUser && (
          <Link to="/mis-pedidos" className={isActive('/mis-pedidos')}>Mis Pedidos</Link>
        )}
      </nav>
      
      <aside>
        {!userInfo.email ? (
          <>
            <Link to="/inicio-sesion">Inicio de sesión</Link> / 
            <Link to="/registro" style={{ marginLeft: '0.25rem' }}>Registrar Usuario</Link>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {userInfo.isAdmin && (
              <Link to="/admin" style={{ 
                marginRight: '0.5rem',
                background: '#1ABC9C',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                textDecoration: 'none'
              }}>
                🔧 Panel Admin
              </Link>
            )}
            
            {userInfo.isUser && (
              <span style={{ 
                color: '#884513',
                fontSize: '0.9rem'
              }}>
                Cliente
              </span>
            )}
            
            <button 
              onClick={handleLogout} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#884513', 
                cursor: 'pointer',
                fontSize: '0.9rem',
                textDecoration: 'underline'
              }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default NavBar;