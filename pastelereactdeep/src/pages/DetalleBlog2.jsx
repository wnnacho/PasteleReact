import React from 'react'
import { Link } from 'react-router-dom'

const DetalleBlog2 = () => {
  return (
    <main className="container">
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Recetas Chilenas que no Pueden Faltar</h1>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <img 
            src="https://www.gourmet.cl/wp-content/uploads/2017/04/CHILENAS.jpg" 
            alt="Recetas chilenas tradicionales" 
            style={{ maxWidth: '100%', borderRadius: '8px' }} 
          />
        </div>
        
        <div style={{ background: '#f8f8f8', padding: '1rem', borderLeft: '4px solid #884513', margin: '2rem 0' }}>
          <p><strong>Publicado:</strong> 22 de Noviembre, 2023</p>
          <p><strong>Autor:</strong> Carlos Méndez - Chef Instructor Duoc UC</p>
        </div>
        
        <h2>Introducción</h2>
        <p>La repostería chilena es rica en tradición y sabor. En este artículo, exploramos las recetas que han pasado de generación en generación y cómo las hemos modernizado en Pastelería Mil Sabores.</p>
        
        <h2>1. Torta de Mil Hojas</h2>
        <p>Un clásico indiscutido. En nuestra versión, usamos hojaldre artesanal y manjar de la más alta calidad.</p>
        
        <h2>2. Berlín</h2>
        <p>El berlín tradicional relleno de crema pastelera o manjar. Nuestro secreto: la masa es leudada por 24 horas.</p>
        
        <h2>3. Alfajores Chilenos</h2>
        <p>Dulces, suaves y rellenos de manjar. Hemos creado versiones con harina de almendras para nuestros clientes celíacos.</p>
        
        <h2>4. Torta Tres Leches</h2>
        <p>Aunque de origen extranjero, se ha convertido en un favorito chileno. Nuestra versión incluye leche de cabra local.</p>
        
        <h2>5. Empanadas de Manzana</h2>
        <p>Un favorito de la zona sur. Usamos manzanas reineta de Chiloé para autenticidad y sabor.</p>
        
        <h2>Modernizando la Tradición</h2>
        <p>En Pastelería Mil Sabores, respetamos las recetas tradicionales pero incorporamos técnicas modernas e ingredientes de mejor calidad. También creamos versiones sin gluten, sin azúcar y veganas de estos clásicos.</p>
        
        <div style={{ background: '#FFF5E1', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
          <h3>¿Quieres probar estas delicias?</h3>
          <p>Visita nuestra sección de <Link to="/productos" style={{ color: '#884513' }}>productos</Link> y descubre nuestras versiones de estos clásicos chilenos.</p>
        </div>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link to="/blogs" className="btn">Volver al Blog</Link>
        </div>
      </article>
    </main>
  )
}

export default DetalleBlog2