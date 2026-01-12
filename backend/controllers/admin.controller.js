const db = require('../config/db');

// Ajouter un nouveau véhicule
exports.addVehicle = async (req, res) => {
    const { marque, modele, immatriculation, prix_par_jour, image } = req.body;
    try {
        await db.execute(
            `INSERT INTO voiture (marque, modele, immatriculation, prix_par_jour, statut, image) 
             VALUES (?, ?, ?, ?, 'DISPONIBLE', ?)`,
            [marque, modele, immatriculation, prix_par_jour, image]
        );
        res.status(201).json({ message: "Véhicule ajouté avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout" });
    }
};

// Consulter toutes les réservations (pour le suivi complet)
exports.getAllReservations = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT r.*, u.nom, u.prenom, v.marque, v.modele 
            FROM reservation r
            JOIN utilisateur u ON r.id_utilisateur = u.id_utilisateur
            JOIN voiture v ON r.id_voiture = v.id_voiture
            ORDER BY r.date_reservation DESC`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
// Récupérer tous les utilisateurs pour la gestion admin
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT id_utilisateur, nom, prenom, email, role FROM utilisateur'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
};
exports.getStats = async (req, res) => {
    try {
        const [cars] = await db.execute('SELECT COUNT(*) as total FROM voiture');
        const [reserves] = await db.execute('SELECT COUNT(*) as total FROM reservation');
        const [revenue] = await db.execute('SELECT SUM(prix_total) as total FROM reservation WHERE statut = "PAYEE"');

        res.json({
            totalCars: cars[0].total,
            totalReservations: reserves[0].total,
            totalRevenue: revenue[0].total || 0
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur stats" });
    }
};