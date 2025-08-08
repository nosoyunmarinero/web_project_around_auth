const express = require("express");
const router = express.Router();

// Importar middleware de autenticación
const auth = require('../middleware/auth');

// Controllers
const {createCard, getCards, deleteCard, likeCard, dislikeCard} = require('../controllers/cards');

// Aplicar auth a todas las rutas
router.get("/", auth, getCards);
router.post("/", auth, createCard);
router.delete("/:cardId", auth, deleteCard);
router.put("/:cardId/likes", auth, likeCard);
router.delete("/:cardId/likes", auth, dislikeCard);

module.exports = router;