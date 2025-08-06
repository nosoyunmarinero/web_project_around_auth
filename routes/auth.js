const express = require("express");
const router = express.Router();
const { login, createUser } = require('../controllers/auth');

router.post("/signin", login);
router.post("/signin", createUser);

module.exports = router;