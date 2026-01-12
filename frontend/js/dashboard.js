document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) window.location.href = '../login.html';

    document.getElementById('userInfo').innerText = `Bonjour, ${user.nom}`;

    const carGrid = document.getElementById('carGrid');

    try {
        const response = await fetch('http://localhost:3000/api/vehicles');
        const vehicles = await response.json();

        carGrid.innerHTML = vehicles.map(car => `
            <div class="glass-container" style="padding: 20px; transition: 0.3s;">
                <img src="${car.image || 'https://via.placeholder.com/300x180'}" alt="${car.marque}" style="width: 100%; border-radius: 10px; margin-bottom: 15px;">
                <h3 style="margin-bottom: 5px;">${car.marque} ${car.modele}</h3>
                <p style="color: #ddd; font-size: 0.9rem; margin-bottom: 15px;">Immatriculation: ${car.immatriculation}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold; color: var(--primary); font-size: 1.2rem;">${car.prix_par_jour}€ <small style="font-weight: 300; font-size: 0.7rem; color: white;">/jour</small></span>
                    <button onclick="reserver(${car.id_voiture})" class="btn-primary" style="width: auto; padding: 8px 15px;">Réserver</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        carGrid.innerHTML = "<p>Erreur lors du chargement des véhicules.</p>";
    }
});

// Fonction de déconnexion
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '../login.html';
});

function reserver(id) {
    window.location.href = `reserver.html?id=${id}`;
}