export function registerUser({ email, password }) {
  console.log('Datos enviados al registro:', { email, password }); // Debug
  return fetch('https://se-register-api.en.tripleten-services.com/v1/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    }),
  }).then(res => {
    console.log('Respuesta del servidor:', res.status, res.statusText); // Debug
    if (!res.ok) {
      return res.json().then(errorData => {
        console.log('Error del servidor:', errorData); // Debug
        throw new Error(`Error al registrar: ${errorData.message || res.statusText}`);
      }).catch(() => {
        throw new Error(`Error al registrar: ${res.status} ${res.statusText}`);
      });
    }
    return res.json();
  });
}

export function loginUser({ email, password }) {
  return fetch('https://se-register-api.en.tripleten-services.com/v1/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(res => {
    if (!res.ok) throw new Error('Credenciales inválidas');
    return res.json();
  });
}
