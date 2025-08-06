const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Agregar esta línea

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    validate: {
      validator: function(v){
        return /https?:\/\/(www\.)?[\w\-]+\.\w+(\/[A-Za-z0-9._~:/?%#\[\]@!$&'()*+,;=-]*)?/.test(v);
      },
      message: props => `${props.value} no es una direccion URL válida`
    },
    required: [true, 'Se requiere una URL válida']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  }
});

// Agregar este método estático
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Credenciales incorrectas'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Credenciales incorrectas'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
