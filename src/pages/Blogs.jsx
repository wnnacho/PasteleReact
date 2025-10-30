import React from 'react';
import { Link } from 'react-router-dom';
import tccfrutas from '../assets/tccfrutas.jpg';
import tiramisu from '../assets/tiramisu.jpg';
import cheesecake from '../assets/cheesecake.jpg';

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
            <img src={tccfrutas} alt="Técnicas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="blog-card-content">
            <h3>5 Técnicas de Decoración para Principiantes</h3>
            <p>Aprende las técnicas básicas para decorar tus tortas como un profesional. Desde el manejo de manga pastelera hasta el uso de colorantes.</p>
            <Link to="/blogs/tecnicas-decoracion">Leer más →</Link>
          </div>
        </div>
        
        <div className="blog-card">
          <div style={{ height: '200px', overflow: 'hidden', borderRadius: 6 }}>
            <img src={tiramisu} alt="Recetas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="blog-card-content">
            <h3>Recetas Chilenas que no Pueden Faltar</h3>
            <p>Descubre las recetas más tradicionales de la repostería chilena y cómo hemos modernizado estas delicias.</p>
            <Link to="/blogs/recetas-chilenas">Leer más →</Link>
          </div>
        </div>
        
        <div className="blog-card">
          <div style={{ height: '200px', overflow: 'hidden', borderRadius: 6 }}>
            <img src={cheesecake} alt="Saludables" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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