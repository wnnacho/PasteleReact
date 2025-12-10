import React from 'react';
import { Link } from 'react-router-dom';

// Usar imágenes servidas por el backend desde /img
const getBackendBase = () => {
  try {
    const u = new URL(window.location.href);
    const port = u.port === '3000' ? '8080' : (u.port || '8080');
    return `${u.protocol}//${u.hostname}:${port}`;
  } catch {
    return 'http://localhost:8080';
  }
};
const BACKEND = getBackendBase();

const Blogs = () => {
  return (
    <div className="container">
      <h1>Blog de Repostería</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Descubre tips, recetas y técnicas de nuestros estudiantes de gastronomía
      </p>
      
      <div className="blog-grid">
        <div className="blog-card">
          <div style={{ height: '200px', overflow: 'hidden', borderRadius: 6 }}>
            <img src={`${BACKEND}/img/tccfrutas.jpg`} alt="Técnicas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="blog-card-content">
            <h3>5 Técnicas de Decoración para Principiantes</h3>
            <p>Aprende las técnicas básicas para decorar tus tortas como un profesional. Desde el manejo de manga pastelera hasta el uso de colorantes.</p>
            <Link to="/blogs/tecnicas-decoracion">Leer más →</Link>
          </div>
        </div>
        
        <div className="blog-card">
          <div style={{ height: '200px', overflow: 'hidden', borderRadius: 6 }}>
            <img src={`${BACKEND}/img/tiramisu.jpg`} alt="Recetas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="blog-card-content">
            <h3>Recetas Chilenas que no Pueden Faltar</h3>
            <p>Descubre las recetas más tradicionales de la repostería chilena y cómo hemos modernizado estas delicias.</p>
            <Link to="/blogs/recetas-chilenas">Leer más →</Link>
          </div>
        </div>
        
        <div className="blog-card">
          <div style={{ height: '200px', overflow: 'hidden', borderRadius: 6 }}>
            <img src={`${BACKEND}/img/cheesecake.jpg`} alt="Saludables" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="blog-card-content">
            <h3>Postres Sin Azúcar: Mitos y Realidades</h3>
            <p>Exploramos las opciones de postres sin azúcar y cómo mantener el sabor sin comprometer la salud.</p>
            <Link to="#">Leer más →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;