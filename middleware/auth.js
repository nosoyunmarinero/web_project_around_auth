const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Se requiere autorización' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    // Primero intentar verificar con tu clave local
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    // Si falla, intentar decodificar sin verificar (para tokens de TripleTen)
    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        return res.status(401).send({ message: 'Token inválido' });
      }

      // Verificar que el token no esté expirado
      if (decoded.exp && decoded.exp < Date.now() / 1000) {

        return res.status(401).send({ message: 'Token expirado' });
      }

      req.user = decoded;
      next();
    } catch (decodeErr) {
      return res.status(401).send({ message: 'Token inválido' });
    }
  }
};