const express = require('express');
const router = express.Router();
const resController = require('../controllers/reservation.controller');

// Route : POST http://localhost:3000/api/reservations
router.post('/', resController.createReservation);

module.exports = router;