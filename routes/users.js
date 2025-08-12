const express = require("express");
const router = express.Router();

// ← ¿ESTA LÍNEA ESTÁ?
const auth = require('../middleware/auth');

const {getUsers, getUserById, createUser, updateProfile, updateAvatar, getCurrentUser, deleteUser} = require('../controllers/users')

router.post("/", createUser);
router.get('/me', auth, getCurrentUser);
router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.patch('/me', auth, updateProfile);
router.patch('/me/avatar', auth, updateAvatar);
router.delete('/:id', auth, deleteUser);

module.exports = router;