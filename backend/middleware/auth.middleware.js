const jwt = require('jsonwebtoken');

// Middleware pour vérifier si l'utilisateur est connecté (Token valide)
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "Token requis pour l'authentification" });
    }

    try {
        // On enlève "Bearer " si présent
        const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(bearerToken, 'VOTRE_CLE_SECRETE_TRES_LONGUE');
        req.user = decoded; // On stocke les infos (id, role) dans la requête
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalide ou expiré" });
    }
};

// Middleware pour vérifier si l'utilisateur est un ADMIN
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({ message: "Accès refusé : Réservé aux administrateurs" });
    }
};