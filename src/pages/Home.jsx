import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import tcchocolate from '../assets/tcchocolate.webp';

const Home = () => {
  return (
    <div className="container">
      <h1>Bienvenido a Pastelería Mil Sabores</h1>
      
      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src={logo} alt="Pasteleria Mil Sabores" style={{ maxWidth: '260px', marginBottom: '1rem' }} />
        <div style={{ 
          height: '300px', 
          backgroundImage: `url(${tcchocolate})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '1.2rem'
        }}>
          Nuestros mejores sabores
        </div>
      </section>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Celebrando 50 años de dulzura</h2>
        <p>Desde 1973, hemos estado creando los mejores postres y tortas para los chilenos. 
           Famosa por nuestro récord Guinness en 1995, continuamos innovando mientras mantenemos 
           nuestras recetas tradicionales.</p>
      </section>
      
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Productos Destacados</h3>
          <p>Descubre nuestras tortas, postres individuales y opciones especiales</p>
          <Link to="/productos" className="btn">Ver Productos</Link>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Promociones Especiales</h3>
          <p>50% de descuento para mayores de 50 años y 10% de por vida con código FELICES50</p>
          <Link to="/registro" className="btn">Regístrate Ahora</Link>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Blog de Repostería</h3>
          <p>Aprende recetas y técnicas de nuestros estudiantes de gastronomía</p>
          <Link to="/blogs" className="btn">Leer Blog</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;