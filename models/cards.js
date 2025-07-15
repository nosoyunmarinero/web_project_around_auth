const mongoose = require('mongoose');
const { Types } = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type:String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type:String,
    validate: {
      validator: function(v){
      return /https?:\/\/(www\.)?[\w\-]+\.\w+(\/[A-Za-z0-9._~:/?%#\[\]@!$&'()*+,;=-]*)?/.test(v);
      },
      message: props => `${props.value} no es una direccion URL válida`
    },
    required: [true, 'Se requiere una URL válida']
  },
  owner: {
    type: Types.ObjectId,
    required: true
  },
  likes: {
    type: [Types.ObjectId],  // Array de ObjectId
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);