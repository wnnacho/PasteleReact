import React from 'react';
import arbolito from '../assets/arbolito.png';

const Nosotros = () => {
  return (
    <div className="container">
      <h1>Sobre Nosotros</h1>
      
      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src={arbolito} alt="Historia" style={{ maxWidth: '320px', marginBottom: '1rem' }} />
      </section>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Nuestra Historia</h2>
        <p>Pastelería Mil Sabores nació en 1973 con el sueño de llevar la mejor repostería a los hogares chilenos. 
           Desde nuestros humildes comienzos en un pequeño local en Santiago, hemos crecido manteniendo siempre 
           nuestro compromiso con la calidad y el sabor auténtico.</p>
        
        <p>En 1995, alcanzamos un hito histórico al participar en la creación de la torta más grande del mundo, 
           estableciendo un récord Guinness que nos llena de orgullo hasta el día de hoy.</p>
      </section>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Misión y Visión</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
            <h3>Misión</h3>
            <p>Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos 
               de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces 
               históricas y fomentamos la creatividad en la repostería.</p>
          </div>
          
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
            <h3>Visión</h3>
            <p>Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra 
               innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos 
               talentos en gastronomía.</p>
          </div>
        </div>
      </section>
      
      <section>
        <h2>Nuestros Valores</h2>
        <ul style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
          <li style={{ marginBottom: '1rem' }}><strong>Calidad:</strong> Utilizamos solo los mejores ingredientes</li>
          <li style={{ marginBottom: '1rem' }}><strong>Tradición:</strong> Respetamos las recetas clásicas</li>
          <li style={{ marginBottom: '1rem' }}><strong>Innovación:</strong> Creamos nuevos sabores constantemente</li>
          <li style={{ marginBottom: '1rem' }}><strong>Comunidad:</strong> Apoyamos a estudiantes de gastronomía</li>
          <li><strong>Sostenibilidad:</strong> Nos preocupamos por el medio ambiente</li>
        </ul>
      </section>
    </div>
  );
};

export default Nosotros;