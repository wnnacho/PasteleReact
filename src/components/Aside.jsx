import React from 'react';
import { Link } from 'react-router-dom';

export default function Aside() {
  return (
    <aside className="aside">
      <Link to="/inicio-sesion" className="aside-link">
        Inicio de sesión
      </Link>
      / 
      <Link to="/registro" className="aside-link">
        Registrar Usuario
      </Link>
    </aside>
  );
}