const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  console.log('🔍 AUTH MIDDLEWARE - Todas las headers:', JSON.stringify(req.headers, null, 2));
  console.log('🔍 AUTH MIDDLEWARE - Authorization header específico:', req.headers.authorization);
  console.log('🔍 AUTH MIDDLEWARE - URL solicitada:', req.url);
  console.log('🔍 AUTH MIDDLEWARE - Método:', req.method);

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('❌ AUTH MIDDLEWARE - Falta header authorization o formato incorrecto');
    console.log('❌ AUTH MIDDLEWARE - Valor recibido:', authorization);
    return res.status(401).send({ message: 'Se requiere autorización' });
  }

  const token = authorization.replace('Bearer ', '');
  console.log('✅ AUTH MIDDLEWARE - Token extraído:', token.substring(0, 20) + '...');

  try {
    // Primero intentar verificar con tu clave local
    const payload = jwt.verify(token, JWT_SECRET);
    console.log('✅ AUTH MIDDLEWARE - Token verificado con JWT_SECRET');
    req.user = payload;
    next();
  } catch (err) {
    console.log('⚠️ AUTH MIDDLEWARE - Falló verificación con JWT_SECRET, intentando decode');
    // Si falla, intentar decodificar sin verificar (para tokens de TripleTen)
    try {
      const decoded = jwt.decode(token);
      if (!decoded) {
        console.log('❌ AUTH MIDDLEWARE - No se pudo decodificar el token');
        return res.status(401).send({ message: 'Token inválido' });
      }

      // Verificar que el token no esté expirado
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        console.log('❌ AUTH MIDDLEWARE - Token expirado');
        return res.status(401).send({ message: 'Token expirado' });
      }

      console.log('✅ AUTH MIDDLEWARE - Token decodificado exitosamente');
      req.user = decoded;
      next();
    } catch (decodeErr) {
      console.log('❌ AUTH MIDDLEWARE - Error al decodificar:', decodeErr.message);
      return res.status(401).send({ message: 'Token inválido' });
    }
  }
};