// src/pages/Blogs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Blogs() {
  const blogs = [
    {
      id: 1,
      title: "5 Técnicas de Decoración para Principiantes",
      description: "Aprende las técnicas básicas para decorar tus tortas como un profesional. Desde el manejo de manga pastelera hasta el uso de colorantes.",
      image: "https://proingra.com/wp-content/uploads/2021/11/04-NOV-BRAHMAN-C.png",
      link: "/detalle-blog-1"
    },
    {
      id: 2,
      title: "Recetas Chilenas que no Pueden Faltar",
      description: "Descubre las recetas más tradicionales de la repostería chilena y cómo hemos modernizado estas delicias.",
      image: "https://www.gourmet.cl/wp-content/uploads/2017/04/CHILENAS.jpg",
      link: "/detalle-blog-2"
    },
    {
      id: 3,
      title: "Postres Sin Azúcar: Mitos y Realidades",
      description: "Exploramos las opciones de postres sin azúcar y cómo mantener el sabor sin comprometer la salud.",
      image: "https://via.placeholder.com/400x250/FFC0CB/5D4037?text=Postres+Saludables",
      link: "#"
    },
    {
      id: 4,
      title: "El Valor de los Ingredientes Locales",
      description: "Cómo apoyamos a productores locales y la diferencia que hace en el sabor de nuestros productos.",
      image: "https://via.placeholder.com/400x250/FFC0CB/5D4037?text=Ingredientes+Locales",
      link: "#"
    },
    {
      id: 5,
      title: "Organizando la Mesa Dulce Perfecta",
      description: "Consejos para crear una mesa de postres memorable para tus eventos especiales.",
      image: "https://via.placeholder.com/400x250/FFC0CB/5D4037?text=Eventos+Especiales",
      link: "#"
    },
    {
      id: 6,
      title: "Tendencias en Repostería para 2024",
      description: "Las tendencias que marcarán la pauta en el mundo de la repostería este año.",
      image: "https://via.placeholder.com/400x250/FFC0CB/5D4037?text=Tendencias+2024",
      link: "#"
    }
  ];

  return (
    <div>
      <h1>Blog de Repostería</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Descubre tips, recetas y técnicas de nuestros estudiantes de gastronomía
      </p>
      
      {/* Grid de blogs - igual que en el HTML original */}
      <div className="blog-grid">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <img 
              src={blog.image} 
              alt={blog.title}
            />
            <div className="blog-card-content">
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <Link to={blog.link}>Leer más →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}