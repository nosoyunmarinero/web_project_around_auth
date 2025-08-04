export function registerUser({ email, password }) {
  return fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      name: 'Usuario',
      about: 'Información sobre el usuario',
      avatar: 'https://placeholder.com/user-avatar.jpg'
    }),
  }).then(res => {
    if (!res.ok) throw new Error('Error al registrar');
    return res.json();
  });
}
export function loginUser({ email, password }) {
  return fetch('http://localhost:3000/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(res => {
    if (!res.ok) throw new Error('Credenciales inválidas');
    return res.json();
  });
}
