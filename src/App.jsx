// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import Contacto from "./pages/Contacto";
import InicioSesion from "./pages/InicioSesion";
import RegistroUsuario from "./pages/RegistroUsuario";
import DetalleBlog1 from "./pages/DetalleBlog1";
import DetalleBlog2 from "./pages/DetalleBlog2";
import DetalleProducto from "./pages/DetalleProducto";
import "./styles/global.css";

// Páginas placeholder mejoradas
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
      <Aside /> {/* ✅ Aside agregado aquí */}
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos/>} />
            <Route path="/nosotros" element={<Nosotros/>} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contacto" element={<Contacto/>} />
            <Route path="/inicio-sesion" element={<InicioSesion />} />
            <Route path="/registro" element={<RegistroUsuario />} />
            <Route path="/detalle-blog-1" element={<DetalleBlog1 />} />
            <Route path="/detalle-blog-2" element={<DetalleBlog2 />} />
            <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}