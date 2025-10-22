// src/pages/BlogDetail.jsx (para rutas futuras)
import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogDetail() {
  const { id } = useParams();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/blogs" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
        ← Volver al Blog
      </Link>
      
      <h1>Detalle del Blog #{id}</h1>
      <p>Esta página mostrará el contenido completo del artículo del blog.</p>
    </div>
  );
}