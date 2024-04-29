
document.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Récupérer les valeurs de l'email et du mot de passe du formulaire
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;




  // Effectuer une requête POST vers l'endpoint de connexion
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data)
      // Deco clear localStorage (logout)
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
      
      alert("Vous êtes maintenant connecté !");
  }
  // Comparaison avec les informations de connexion de Sophie Bluel
        if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
            // Redirection vers la page d'accueil
            window.location.href = 'index.html';
        } else {
            // Affichage d'un message d'erreur
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Email ou mot de passe incorrect';
            errorMessage.style.color = 'purple';
            const form = document.getElementById('login-form');
            form.appendChild(errorMessage);
        }
    // Vérifier si la réponse est un succès
 
      // Si la réponse n'est pas OK, afficher une alerte
     
    
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire :", error);
  }
});