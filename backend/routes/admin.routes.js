// Route pour changer le statut d'un utilisateur (Activer/Désactiver)
router.patch('/users/:id/status', async (req, res) => {
    const { active } = req.body; // true ou false
    try {
        await db.execute('UPDATE utilisateur SET telephone = ? WHERE id_utilisateur = ?', [active ? 'ACTIVE' : 'DESACTIVE', req.params.id]);
        res.json({ message: "Statut mis à jour" });
    } catch (error) {
        res.status(500).json({ message: "Erreur" });
    }
});
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Routes pour les véhicules
router.post('/vehicles', adminController.addVehicle);

// Routes pour les réservations
router.get('/reservations', adminController.getAllReservations);

// Routes pour les utilisateurs
router.get('/users', adminController.getAllUsers);

module.exports = router;