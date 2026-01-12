const urlParams = new URLSearchParams(window.location.search);
const vehicleId = urlParams.get('id');
let pricePerDay = 0;

document.addEventListener('DOMContentLoaded', async () => {
    if (!vehicleId) window.location.href = 'dashboard.html';

    // 1. Récupérer les infos de la voiture
    try {
        const response = await fetch(`http://localhost:3000/api/vehicles/${vehicleId}`);
        const car = await response.json();
        pricePerDay = car.prix_par_jour;

        document.getElementById('carDetails').innerHTML = `
            <img src="${car.image || 'https://via.placeholder.com/300'}" style="width: 200px; border-radius: 10px; margin-bottom: 15px;">
            <h2>${car.marque} ${car.modele}</h2>
            <p style="color: var(--primary); font-weight: bold;">${pricePerDay}€ / jour</p>
        `;
    } catch (err) {
        alert("Erreur lors du chargement du véhicule");
    }
});

// 2. Calcul dynamique du prix
const dateDebutInput = document.getElementById('date_debut');
const dateFinInput = document.getElementById('date_fin');

[dateDebutInput, dateFinInput].forEach(input => {
    input.addEventListener('change', () => {
        const start = new Date(dateDebutInput.value);
        const end = new Date(dateFinInput.value);

        if (dateDebutInput.value && dateFinInput.value && end >= start) {
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 car la location est à la journée

            document.getElementById('nbJours').innerText = diffDays;
            document.getElementById('totalPrix').innerText = `${diffDays * pricePerDay}€`;
            document.getElementById('priceSummary').style.display = 'block';
            document.getElementById('confirmBtn').disabled = false;
        } else {
            document.getElementById('priceSummary').style.display = 'none';
            document.getElementById('confirmBtn').disabled = true;
        }
    });
});

// 3. Soumission de la réservation
document.getElementById('reservationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const reservationData = {
        id_voiture: vehicleId,
        id_utilisateur: user.id,
        date_debut: dateDebutInput.value,
        date_fin: dateFinInput.value,
        prix_total: parseInt(document.getElementById('totalPrix').innerText)
    };

    // Note: On simulera le paiement ici pour l'instant avant l'envoi au backend
    alert("Redirection vers le paiement sécurisé...");
    
    // Logique d'envoi au backend à implémenter au prochain commit
});