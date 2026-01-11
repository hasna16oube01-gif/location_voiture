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
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ton utilisateur MySQL
  password: '',   // Ton mot de passe MySQL
  database: 'location_voiture'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL "location_voiture"');
});

module.exports = connection;