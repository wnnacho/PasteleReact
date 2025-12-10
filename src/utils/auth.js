// src/utils/auth.js - VERSIÓN COMPLETA
export function backendBase() {
  const { protocol, hostname } = window.location;
  const port = window.location.port === '3000' ? '8080' : window.location.port;
  const p = port ? `:${port}` : '';
  return `${protocol}//${hostname}${p}`;
}

export function getToken() {
  return localStorage.getItem('adminToken');
}

export function setToken(token) {
  localStorage.setItem('adminToken', token);
}

export function clearToken() {
  localStorage.removeItem('adminToken');
}

export async function login(username, password) {
  const res = await fetch(`${backendBase()}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Credenciales inválidas');
  }
  
  const data = await res.json();
  setToken(data.token);
  localStorage.setItem('userEmail', username);
  return data.token;
}

export function authHeaders() {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Para compatibilidad con el código existente
export const AuthService = {
  login,
  logout: () => {
    clearToken();
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  },
  getCurrentUser: () => {
    const token = getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        email: payload.sub,
        role: payload.authorities?.[0]?.replace('ROLE_', '').toLowerCase() || 'admin'
      };
    } catch {
      return null;
    }
  },
  isAuthenticated: () => {
    const token = getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};