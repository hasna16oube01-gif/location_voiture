const db = require('../config/db');

exports.createReservation = async (req, res) => {
    const { id_utilisateur, id_voiture, date_debut, date_fin, prix_total } = req.body;

    try {
        // 1. Vérifier si la voiture est déjà réservée sur cette période
        const checkQuery = `
            SELECT * FROM reservation 
            WHERE id_voiture = ? 
            AND statut != 'ANNULEE'
            AND (
                (date_debut <= ? AND date_fin >= ?) OR
                (date_debut <= ? AND date_fin >= ?) OR
                (? <= date_debut AND ? >= date_fin)
            )`;
        
        const [existing] = await db.execute(checkQuery, [
            id_voiture, 
            date_debut, date_debut, 
            date_fin, date_fin,
            date_debut, date_fin
        ]);

        if (existing.length > 0) {
            return res.status(400).json({ message: "Ce véhicule est déjà réservé pour ces dates." });
        }

        // 2. Créer la réservation (Statut 'EN_ATTENTE' avant paiement)
        const [result] = await db.execute(
            `INSERT INTO reservation (date_reservation, date_debut, date_fin, prix_total, statut, id_utilisateur, id_voiture) 
             VALUES (NOW(), ?, ?, ?, 'PAYEE', ?, ?)`, 
            [date_debut, date_fin, prix_total, id_utilisateur, id_voiture]
        );

        const id_reservation = result.insertId;

        // 3. Créer le paiement (Simulation de validation immédiate selon le cahier des charges)
        await db.execute(
            `INSERT INTO paiement (montant, date_paiement, mode_paiement, statut, id_reservation) 
             VALUES (?, NOW(), 'CARTE_BANCAIRE', 'VALIDE', ?)`,
            [prix_total, id_reservation]
        );

        res.status(201).json({ message: "Réservation et paiement validés avec succès !", id_reservation });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la réservation", error });
    }
};