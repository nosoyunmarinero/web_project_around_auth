const Users = require ('../models/users')

//Manejo de errores
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

//Get
module.exports.getUsers = (req, res) => {
  Users.find({})
  .then(users => res.send({data: users}))
  .catch(() => res.status(SERVER_ERROR).send({message: 'Error al obtener Usuarios'}))
}

//GET by ID
module.exports.getUserById = (req, res) => {
  Users.findById(req.params.id)
    .orFail(() => {
      const error = new Error('NOT_FOUND');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.statusCode === 404) {
        return res.status(NOT_FOUND).send({ message: 'Usuario no encontrado' });
      }
      res.status(500).send({ message: 'Error en el servidor' });
    });
};

//Create User
module.exports.createUser = (req, res) => {
  console.log('Body recibido:', req.body);
  const {name, about, avatar, email, password} = req.body;

  // Verificar si falta la contraseña
  if (!password) {
    return res.status(400).send({message: 'La contraseña es requerida'});
  }

  // Hashear la contraseña antes de guardar
  const bcrypt = require('bcryptjs');
  bcrypt.hash(password, 10)
    .then(hash => {
      return Users.create({name, about, avatar, email, password: hash});
    })
    .then(user => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send({data: userResponse});
    })
    .catch(err =>{
      console.log('Error completo:', err.message);
      console.log('Errores de validación:', err.errors);

      if(err.name === "ValidationError"){
        return res.status(400).send({message: 'Datos no válidos'});
      }
      if(err.code === 11000){
        return res.status(409).send({message: 'El email ya está registrado'});
      }
      res.status(500).send({message: 'Error del servidor'});
    });
};

//PATCH User/me
module.exports.updateProfile = (req, res) => {
  const {name, about, email} = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    {name, about, email},
    {new: true, runValidators: true}
  )
    .then(user => {
      if (!user) return res.status(NOT_FOUND).send({message: "Usuario no encontrado"});
      res.send({data:user});
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({message: "Datos no Validos"});
      }
    });
};

//PATCH Avatar

//PATCH Avatar
module.exports.updateAvatar = (req, res) => {
  // Cambiar de {link} a {avatar} para que coincida con el frontend
  const {avatar} = req.body;

  Users.findByIdAndUpdate(
    req.user._id,
    {avatar: avatar},  // o simplemente {avatar}
    {new: true, runValidators: true}
  )
    .then(user => {
      if (!user) return res.status(NOT_FOUND).send({message: "Usuario no encontrado"});
      res.send({data:user});
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({message: "URL no valida"})
      }
      res.status(SERVER_ERROR).send({message: "Error del servidor"});
    })
}

//GET current user
module.exports.getCurrentUser = (req, res) => {
  console.log('🎯 CONTROLLER getCurrentUser - Usuario decodificado:', req.user);
  console.log('🎯 CONTROLLER getCurrentUser - ID que se busca:', req.user._id);

  // Primero vamos a listar TODOS los usuarios para ver qué hay en la DB
  Users.find({})
    .then((allUsers) => {
      console.log('🎯 CONTROLLER getCurrentUser - TODOS los usuarios en DB:', allUsers.length);
      allUsers.forEach((user, index) => {
        console.log(`  Usuario ${index + 1}: ID = ${user._id}, Email = ${user.email}`);
      });

      // Ahora intentamos buscar el usuario específico
      return Users.findById(req.user._id);
    })
    .then((user) => {
      if (!user) {
        console.log('🎯 CONTROLLER getCurrentUser - Usuario NO encontrado con findById');
        throw new Error('NOT_FOUND');
      }
      console.log('🎯 CONTROLLER getCurrentUser - Usuario SÍ encontrado:', user);
      res.send({ data: user });
    })
    .catch(err => {
      console.log('🎯 CONTROLLER getCurrentUser - Error:', err);
      if (err.message === 'NOT_FOUND') {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.status(500).send({ message: 'Error en el servidor' });
    });
};

//BORAR USUARIO (TEST TOOL)
module.exports.deleteUser = (req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) return res.status(NOT_FOUND).send({ message: 'Usuario no encontrado' });
      res.send({ message: 'Usuario eliminado' });
    })
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Error del servidor' }));
};