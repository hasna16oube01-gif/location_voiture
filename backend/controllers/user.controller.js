const db = require('../config/db');

exports.getUserReservations = async (req, res) => {
    try {
        const userId = req.params.userId;
        const query = `
            SELECT r.*, v.marque, v.modele, p.statut as statut_paiement 
            FROM reservation r
            JOIN voiture v ON r.id_voiture = v.id_voiture
            LEFT JOIN paiement p ON r.id_reservation = p.id_reservation
            WHERE r.id_utilisateur = ?
            ORDER BY r.date_debut DESC`;
        
        const [rows] = await db.execute(query, [userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique" });
    }
};