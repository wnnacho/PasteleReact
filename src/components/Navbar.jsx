// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/productos" className="nav-link">Productos</NavLink>
      <NavLink to="/nosotros" className="nav-link">Nosotros</NavLink>
      <NavLink to="/blogs" className="nav-link">Blogs</NavLink>
      <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
    </nav>
  );
}