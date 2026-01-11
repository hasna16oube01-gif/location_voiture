CREATE DATABASE location_voiture;
USE location_voiture;

-- =========================
-- UTILISATEUR
-- =========================
CREATE TABLE utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    mot_de_passe VARCHAR(255),
    telephone VARCHAR(20),
    role ENUM('CLIENT', 'ADMIN') NOT NULL
);

-- =========================
-- VOITURE
-- =========================
CREATE TABLE voiture (
    id_voiture INT AUTO_INCREMENT PRIMARY KEY,
    marque VARCHAR(50),
    modele VARCHAR(50),
    immatriculation VARCHAR(50) UNIQUE,
    prix_par_jour DOUBLE,
    statut ENUM('DISPONIBLE', 'INDISPONIBLE'),
    image VARCHAR(255)
);

-- =========================
-- RESERVATION
-- =========================
CREATE TABLE reservation (
    id_reservation INT AUTO_INCREMENT PRIMARY KEY,
    date_reservation DATE,
    date_debut DATE,
    date_fin DATE,
    prix_total DOUBLE,
    statut ENUM('EN_ATTENTE', 'PAYEE', 'ANNULEE'),

    id_utilisateur INT,
    id_voiture INT,

    FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
    FOREIGN KEY (id_voiture) REFERENCES voiture(id_voiture)
);

-- =========================
-- PAIEMENT
-- =========================
CREATE TABLE paiement (
    id_paiement INT AUTO_INCREMENT PRIMARY KEY,
    montant DOUBLE,
    date_paiement DATETIME,
    mode_paiement VARCHAR(50),
    statut ENUM('VALIDE', 'REFUSE'),

    id_reservation INT UNIQUE,
    FOREIGN KEY (id_reservation) REFERENCES reservation(id_reservation)
);
-- Insertion des utilisateurs (Admin et Clients)
INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, telephone, role) VALUES
('Dupont', 'Jean', 'admin@location.fr', 'admin123', '0102030405', 'ADMIN'),
('Martin', 'Alice', 'alice@gmail.com', 'client123', '0607080910', 'CLIENT'),
('Bernard', 'Lucas', 'lucas.b@yahoo.fr', 'password456', '0708091011', 'CLIENT');
-- Insertion du catalogue de voitures
INSERT INTO voiture (marque, modele, immatriculation, prix_par_jour, statut, image) VALUES
('Peugeot', '208', 'AA-123-BB', 45.0, 'DISPONIBLE', 'peugeot_208.jpg'),
('Tesla', 'Model 3', 'EV-555-ZZ', 120.0, 'DISPONIBLE', 'tesla_m3.jpg'),
('Renault', 'Clio 5', 'CC-987-DD', 40.0, 'INDISPONIBLE', 'clio5.jpg'),
('BMW', 'Série 1', 'BM-111-WW', 85.0, 'DISPONIBLE', 'bmw_s1.jpg');
-- Insertion des premières réservations
INSERT INTO reservation (date_reservation, date_debut, date_fin, prix_total, statut, id_utilisateur, id_voiture) VALUES
(CURDATE(), '2024-06-01', '2024-06-05', 180.0, 'PAYEE', 2, 1),
(CURDATE(), '2024-06-10', '2024-06-12', 240.0, 'EN_ATTENTE', 3, 2);
-- Insertion des paiements liés aux réservations
INSERT INTO paiement (montant, date_paiement, mode_paiement, statut, id_reservation) VALUES
(180.0, NOW(), 'CARTE_BANCAIRE', 'VALIDE', 1);