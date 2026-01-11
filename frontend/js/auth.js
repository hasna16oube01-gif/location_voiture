document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const mot_de_passe = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, mot_de_passe })
        });

        const data = await response.json();

        if (response.ok) {
            // Sauvegarder le token et les infos utilisateur
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirection selon le rôle
            if (data.user.role === 'ADMIN') {
                window.location.href = 'admin/dashboard.html';
            } else {
                window.location.href = 'client/dashboard.html';
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Erreur de connexion:", error);
        alert("Impossible de contacter le serveur.");
    }
});
// --- LOGIQUE D'INSCRIPTION ---
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,
        mot_de_passe: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
            window.location.href = 'login.html';
        } else {
            alert(data.message || "Erreur lors de l'inscription");
        }
    } catch (error) {
        console.error("Erreur:", error);
        alert("Impossible de contacter le serveur.");
    }
});