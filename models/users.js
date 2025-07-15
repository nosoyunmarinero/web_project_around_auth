const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    require: true,
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
  }
});

module.exports = mongoose.model('user', userSchema);
