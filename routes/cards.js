const express = require("express");
//const fs = require('fs');

const router = express.Router();

//Controllers
const {createCard, getCards, deleteCard, likeCard, dislikeCard} = require('../controllers/cards');

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard)

module.exports = router;