// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a Pastelería Mil Sabores</h1>
      
      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img 
          src="../img/logo.png" 
          alt="Pastelería Mil Sabores" 
          style={{ maxWidth: '100%', borderRadius: '8px' }}
        />
      </section>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Celebrando 50 años de dulzura</h2>
        <p>
          Desde 1973, hemos estado creando los mejores postres y tortas para los chilenos. 
          Famosa por nuestro récord Guinness en 1995, continuamos innovando mientras mantenemos 
          nuestras recetas tradicionales.
        </p>
      </section>
      
      <section className="grid">
        <div className="card">
          <h3>Productos Destacados</h3>
          <p>Descubre nuestras tortas, postres individuales y opciones especiales</p>
          <Link to="/productos" className="btn">Ver Productos</Link>
        </div>
        
        <div className="card">
          <h3>Promociones Especiales</h3>
          <p>50% de descuento para mayores de 50 años y 10% de por vida con código FELICES50</p>
          <Link to="/registro" className="btn">Regístrate Ahora</Link>
        </div>
        
        <div className="card">
          <h3>Blog de Repostería</h3>
          <p>Aprende recetas y técnicas de nuestros estudiantes de gastronomía</p>
          <Link to="/blogs" className="btn">Leer Blog</Link>
        </div>
      </section>
    </div>
  );
}