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
    if (!res.ok) throw new Error('Credenciales inválidas')
    const data = await res.json()
    // backend retorna { token: '...' }
    setToken(data.token)
    return data.token
}

export function authHeaders() {
  const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {}
}
