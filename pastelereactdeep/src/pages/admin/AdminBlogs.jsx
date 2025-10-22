import React, { useEffect, useState } from 'react'
import '../../styles/estiloAdmin.css'
import { useNavigate } from 'react-router-dom'

const AdminBlogs = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role !== 'admin') navigate('/inicio-sesion')
  }, [navigate])

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('blogs')
      setBlogs(raw ? JSON.parse(raw) : [])
    } catch (e) {
      console.error('Failed to parse blogs from localStorage', e)
      setBlogs([])
    }
  }, [])

  return (
    <div className="admin-theme admin-page admin-blue">
      <div className="container">
        <h2>Blogs (Admin)</h2>
      {blogs.length === 0 ? (
        <p>No hay entradas de blog registradas.</p>
      ) : (
        <ul>
          {blogs.map(b => <li key={b.id || b.titulo}>{b.titulo}</li>)}
        </ul>
      )}
      </div>
    </div>
  )
}

export default AdminBlogs
