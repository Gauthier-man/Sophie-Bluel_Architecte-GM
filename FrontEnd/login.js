
document.addEventListener("submit", async (e) => {
  e.preventDefault();

  // const errorMessage = document.getElementById('error-message');
  // errorMessage.style.display = 'none';

  function MessageError() {
    document.getElementById("error-message").style.display = "block";
    document.querySelector(".hidden").style.display = "block";
  }

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
  else {
    // Affichage d'un message d'erreur
    const existingErrorMessage = document.getElementById('error-message');
    if (!existingErrorMessage) {
      const errorMessage = document.createElement('p');
      errorMessage.id = 'error-message';
      errorMessage.textContent = 'Email ou mot de passe incorrect';
      errorMessage.style.color = 'purple';
      errorMessage.style.marginTop = '20px';
      const form = document.getElementById('login-form');
      const passwordInput = document.getElementById('password');
      form.appendChild(errorMessage);
    }
  }
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire :", error);
  } 

  
});