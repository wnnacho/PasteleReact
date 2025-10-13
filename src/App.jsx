// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import Contacto from "./pages/Contacto";
import InicioSesion from "./pages/InicioSesion";
import RegistroUsuario from "./pages/RegistroUsuario";
import "./styles/global.css"; // Importar estilos globales

// Crear páginas placeholder temporales
const PlaceholderPage = ({ title, children }) => (
  <div>
    <h1>{title}</h1>
    <p>Esta página está en desarrollo. Pronto estará disponible.</p>
    {children}
  </div>
);

export default function App() {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<PlaceholderPage title="Productos" />} />
            <Route path="/nosotros" element={<PlaceholderPage title="Nosotros" />} />
            <Route path="/blogs" element={<PlaceholderPage title="Blogs" />} />
            <Route path="/contacto" element={<PlaceholderPage title="Contacto" />} />
            <Route path="/inicio-sesion" element={<PlaceholderPage title="Iniciar Sesión" />} />
            <Route path="/registro" element={<PlaceholderPage title="Registro" />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}