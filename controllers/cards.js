const Card = require('../models/cards')

//Manejo de errores
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

//Create (POST)
module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
    .then(card => {

      const cardWithLiked = {
        ...card.toObject(),
        isLiked: false
      };
      res.status(201).send({data: cardWithLiked});
    })
    .catch(err => {
      console.log(err.name);

      if(err.name === 'ValidationError'){
        return res.status(BAD_REQUEST).send({message: 'Datos no validos al crear la card'})
      }
      res.status(SERVER_ERROR).send({message: 'Error al crear card :('})
    });
};

//Delete (DELETE)
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(new Error('NOT_FOUND'))
    .then(card => {
     res.send({ data: card, message: 'Card eliminada con exito' });
      })
    .catch(err => {
      if (err.message === 'NOT_FOUND') {
        return res.status(NOT_FOUND).send({ message: "Card no encontrada" });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'ID inválido' });
      }
      res.status(SERVER_ERROR).send({ message: 'Error al eliminar la card' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => {
      // Agregar isLiked basado en el usuario actual
      const cardsWithLiked = cards.map(card => ({
        ...card.toObject(),
        isLiked: card.likes.includes(req.user._id)
      }));
      res.send({ data: cardsWithLiked });
    })
    .catch(err => {
      console.log(err);
      res.status(SERVER_ERROR).send({ message: 'Error al obtener las cards' });
    });
}


module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id} },
    {new: true},
  )
    .then(card => {
      const cardWithLiked = {
        ...card.toObject(),
        isLiked: true
      };
      res.send({data: cardWithLiked});
    })
    .catch(err => res.status(SERVER_ERROR).send({message: "Error al dar like"}))

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
    .then(card => {
      const cardWithLiked = {
        ...card.toObject(),
        isLiked: false // Siempre false después de quitar like
      };
      res.send({data: cardWithLiked});
    })
    .catch(err => res.status(SERVER_ERROR).send({message: "Error al quitar like"}))