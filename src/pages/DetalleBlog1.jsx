import React from 'react'
import { Link } from 'react-router-dom'

const DetalleBlog1 = () => {
  return (
    <main className="container">
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>5 Técnicas de Decoración para Principiantes</h1>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <img 
            src="https://proingra.com/wp-content/uploads/2021/11/04-NOV-BRAHMAN-C.png" 
            alt="Técnicas de decoración" 
            style={{ maxWidth: '100%', borderRadius: '8px' }} 
          />
        </div>
        
        <div style={{ background: '#f8f8f8', padding: '1rem', borderLeft: '4px solid #884513', margin: '2rem 0' }}>
          <p><strong>Publicado:</strong> 15 de Noviembre, 2023</p>
          <p><strong>Autor:</strong> María González - Estudiante de Gastronomía Duoc UC</p>
        </div>
        
        <h2>Introducción</h2>
        <p>Decorar tortas puede parecer intimidante al principio, pero con las técnicas adecuadas, cualquiera puede crear hermosos diseños. En este artículo, te enseñamos 5 técnicas básicas que todo principiante debería conocer.</p>
        
        <h2>1. Uso de la Manga Pastelera</h2>
        <p>La manga pastelera es tu mejor aliada. Comienza con boquillas básicas como la redonda (para puntos y líneas) y la estrellada (para bordes y rosetas).</p>
        
        <h2>2. Cubierta con Espátula</h2>
        <p>Aprende a cubrir tu torta con buttercream usando una espátula. El secreto está en girar la torta mientras mantienes la espátula fija.</p>
        
        <h2>3. Colorantes en Gel</h2>
        <p>Usa colorantes en gel instead de líquidos para no alterar la consistencia de tu buttercream. Comienza con colores primarios y aprende a mezclarlos.</p>
        
        <h2>4. Técnica de Transferencia</h2>
        <p>Aprende a transferir diseños usando papel de arroz o acetato. Perfecto para cuando quieres replicar un diseño específico.</p>
        
        <h2>5. Texturas con Utensilios</h2>
        <p>Crea texturas interesantes con utensilios comunes como peines, esponjas o incluso tenedores.</p>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link to="/blogs" className="btn">Volver al Blog</Link>
        </div>
      </article>
    </main>
  )
}

export default DetalleBlog1