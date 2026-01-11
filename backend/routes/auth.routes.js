const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route pour l'inscription : POST http://localhost:3000/api/auth/register
router.post('/register', authController.register);

// Route pour la connexion : POST http://localhost:3000/api/auth/login
router.post('/login', authController.login);

module.exports = router;