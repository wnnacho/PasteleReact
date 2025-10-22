// src/pages/Nosotros.jsx - VERSIÓN MEJORADA
import React from 'react';

export default function Nosotros() {
  return (
    <div>
      <h1>Sobre Nosotros</h1>
      
      {/* Imagen de la historia */}
      <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img 
          src="../img/arbolito.png" 
          alt="Nuestra historia" 
          style={{ maxWidth: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'cover' }}
        />
      </section>
      
      {/* Nuestra Historia */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Nuestra Historia</h2>
        <div style={{ lineHeight: '1.8' }}>
          <p>
            Pastelería Mil Sabores nació en <strong>1973</strong> con el sueño de llevar la mejor repostería 
            a los hogares chilenos. Desde nuestros humildes comienzos en un pequeño local 
            en Santiago, hemos crecido manteniendo siempre nuestro compromiso con la calidad 
            y el sabor auténtico.
          </p>
          
          <p>
            En <strong>1995</strong>, alcanzamos un hito histórico al participar en la creación de la torta 
            más grande del mundo, estableciendo un <strong>récord Guinness</strong> que nos llena de orgullo 
            hasta el día de hoy.
          </p>
        </div>
      </section>
      
      {/* Misión y Visión */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Misión y Visión</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          <div className="mission-card">
            <h3>Misión</h3>
            <p>
              Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando 
              tortas y productos de repostería de alta calidad para todas las ocasiones, 
              mientras celebramos nuestras raíces históricas y fomentamos la creatividad 
              en la repostería.
            </p>
          </div>
          
          <div className="mission-card">
            <h3>Visión</h3>
            <p>
              Convertirnos en la tienda online líder de productos de repostería en Chile, 
              conocida por nuestra innovación, calidad y el impacto positivo en la comunidad, 
              especialmente en la formación de nuevos talentos en gastronomía.
            </p>
          </div>
        </div>
      </section>
      
      {/* Nuestros Valores */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Nuestros Valores</h2>
        <ul className="values-list">
          <li>
            <strong>Calidad:</strong> Utilizamos solo los mejores ingredientes en todos nuestros productos
          </li>
          <li>
            <strong>Tradición:</strong> Respetamos y preservamos las recetas clásicas chilenas
          </li>
          <li>
            <strong>Innovación:</strong> Creamos nuevos sabores y técnicas constantemente
          </li>
          <li>
            <strong>Comunidad:</strong> Apoyamos y formamos a estudiantes de gastronomía
          </li>
          <li>
            <strong>Sostenibilidad:</strong> Nos preocupamos por el medio ambiente y trabajamos con productores locales
          </li>
        </ul>
      </section>

      {/* Logros destacados */}
      <section style={{ 
        background: '#FFF5E1', 
        padding: '2rem', 
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h2 style={{ textAlign: 'center', color: '#884513' }}>Logros Destacados</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          textAlign: 'center',
          marginTop: '1.5rem'
        }}>
          <div>
            <h3 style={{ color: '#884513', fontSize: '2.5rem', margin: '0' }}>50+</h3>
            <p>Años de experiencia</p>
          </div>
          <div>
            <h3 style={{ color: '#884513', fontSize: '2.5rem', margin: '0' }}>1</h3>
            <p>Récord Guinness</p>
          </div>
          <div>
            <h3 style={{ color: '#884513', fontSize: '2.5rem', margin: '0' }}>1000+</h3>
            <p>Clientes satisfechos</p>
          </div>
          <div>
            <h3 style={{ color: '#884513', fontSize: '2.5rem', margin: '0' }}>50+</h3>
            <p>Estudiantes formados</p>
          </div>
        </div>
      </section>
    </div>
  );
}