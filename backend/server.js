const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test de route
app.get('/', (req, res) => {
    res.send("Le serveur de location de voiture est opérationnel !");
});
// Import des routes
const authRoutes = require('./routes/auth.routes.js');

// Utilisation des routes
app.use('/api/auth', authRoutes);
// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur : http://localhost:${PORT}`);
});
app.use('/api/vehicles', require('./routes/vehicle.routes'));
app.use('/api/reservations', require('./routes/reservation.routes'));