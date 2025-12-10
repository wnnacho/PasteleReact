import axios from 'axios'
import { backendBase, getToken, clearToken } from './auth'

// Cliente Axios con baseURL dinámica y soporte de JWT
const http = axios.create({
  baseURL: backendBase()
})

// Interceptor de request: adjunta Authorization si hay token
http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Interceptor de response: ante 401 limpiar token y redirigir
http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken()
      // redirección suave: solo si estamos en admin
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/inicio-sesion'
      }
    }
    return Promise.reject(error)
  }
)

export default http
