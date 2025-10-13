import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/estilo1.css'; // Solo importamos el CSS que existe

// Componentes
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import DetalleBlog1 from './pages/DetalleBlog1';
import DetalleBlog2 from './pages/DetalleBlog2';
import Contacto from './pages/Contacto';
import InicioSesion from './pages/InicioSesion';
import RegistroUsuario from './pages/RegistroUsuario';
import HomeAdmin from './pages/HomeAdmin';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/tecnicas-decoracion" element={<DetalleBlog1 />} />
            <Route path="/blogs/recetas-chilenas" element={<DetalleBlog2 />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/inicio-sesion" element={<InicioSesion />} />
            <Route path="/registro" element={<RegistroUsuario />} />
            <Route path="/admin" element={<HomeAdmin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;