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
  const {name, about, avatar} = req.body;

  Users.create({name, about, avatar})
  .then(user => res.status(201).send({data: user}))
  .catch(err =>{
    console.log(err.name)

    return err.name === "ValidationError"
    ? res.status(BAD_REQUEST).send({message: 'Datos no validos'})
    : res.status(SERVER_ERROR).send({message: 'Se producio un Error interno :c'})})
}

//PATCH User/me
module.exports.updateProfile = (req, res) => {
  const {name, about} = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    {name, about},
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

module.exports.updateAvatar = (req, res) => {
  const {link} = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    {avatar: link},
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
    })
}
