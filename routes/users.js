const express = require("express");
//const fs = require('fs');

const router = express.Router();

//Controllers
const {getUsers, getUserById, createUser, updateProfile, updateAvatar, getCurrentUser, deleteUser} = require('../controllers/users')


router.get("/", getUsers);
router.get('/me', getCurrentUser)
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch('/me',updateProfile );
router.patch('/me/avatar', updateAvatar);
router.delete('/:id', deleteUser); // TEST TOOL


module.exports = router;