const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Votre utilisateur MySQL
    password: '',      // Votre mot de passe MySQL
    database: 'location_voiture',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
    } else {
        console.log("Connecté à la base de données MySQL !");
        connection.release();
    }
});

module.exports = db.promise();