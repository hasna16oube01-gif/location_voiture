const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route pour récupérer toutes les voitures
router.get('/', (req, res) => {
  const query = "SELECT * FROM voiture";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
ggs
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');

router.get('/', vehicleController.getAllAvailableVehicles);
router.get('/:id', vehicleController.getVehicleById);

module.exports = router;