const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nom, prenom, email, mot_de_passe, telephone } = req.body;

        // 1. Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // 2. Hasher le mot de passe (sécurité)
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(mot_de_passe, salt);

        // 3. Créer l'utilisateur
        await User.create({
            nom, prenom, email, 
            mot_de_passe: hashedPwd, 
            telephone, 
            role: 'CLIENT'
        });

        res.status(201).json({ message: "Compte créé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscription", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        // 1. Trouver l'utilisateur
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // 2. Vérifier le mot de passe
        const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // 3. Créer un Token de connexion (JWT)
        const token = jwt.sign(
            { id: user.id_utilisateur, role: user.role },
            'VOTRE_CLE_SECRETE_TRES_LONGUE', // Changez ceci par une phrase complexe
            { expiresIn: '24h' }
        );

        res.json({
            message: "Connexion réussie",
            token,
            user: { id: user.id_utilisateur, nom: user.nom, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
};