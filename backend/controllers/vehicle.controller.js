const db = require('../config/db');

// Récupérer uniquement les véhicules disponibles
exports.getAllAvailableVehicles = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM voiture WHERE statut = "DISPONIBLE"');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des véhicules", error });
    }
};

// Récupérer les détails d'un véhicule spécifique
exports.getVehicleById = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM voiture WHERE id_voiture = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Véhicule non trouvé" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};