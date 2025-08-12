const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Clave secreta para JWT
const { JWT_SECRET = 'dev-secret' } = process.env;

// Errores
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

// Login
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Crear token
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      // Enviar token
      res.send({ token });
    })
    .catch(() => {
      res.status(UNAUTHORIZED).send({ message: 'Credenciales incorrectas' });
    });
};

// Registro
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  // Verificar si el usuario ya existe
  User.findOne({email})
    .then((user) => {
      if (user) {
        return res.status(CONFLICT).send({ message: 'El usuario ya existe' });
      }

      // Hash de la contraseña
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name: name || 'Usuario', // Valor por defecto
          about: about || 'Nuevo usuario', // Valor por defecto
          avatar: avatar || 'https://via.placeholder.com/150', // Avatar por defecto
          email,
          password: hash,
        }))
        .then((newUser) => {
          // Excluir password del resultado
          const userResponse = newUser.toObject();
          delete userResponse.password;
          res.status(201).send({ data: userResponse });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res.status(BAD_REQUEST).send({ message: 'Datos no válidoooooss' });
          }
          return res.status(SERVER_ERROR).send({ message: 'Error del servidor' });
        });
    })
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Error del servidor' }));
};