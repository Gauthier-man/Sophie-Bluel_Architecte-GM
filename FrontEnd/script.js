let worksData; // Variable globale pour stocker les données des travaux

// Récupérer dynamiquement les projets de l’architecte
// Définition de la fonction pour créer la galerie

// Fonction pour créer une galerie d'images à partir des données fournies
function createGallery(data) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ''; // Nettoyer la galerie avant d'ajouter de nouveaux éléments

  data.forEach(work => {
    const figure = document.createElement("figure");
    gallery.appendChild(figure);

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = work.title;
    figure.appendChild(figcaption); //TEST
  });
}

// Effectuer une requête fetch pour récupérer les données des travaux depuis l'API
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    worksData = data; // Stocker les données des travaux dans la variable globale
    createGallery(data); // Créer la galerie en utilisant les données récupérées
    galleryModal(data);
    AddPictures(data);
    console.log(data); // Pour vérifier les données récupérées dans la console


    // Charger les catégories après avoir récupéré les travaux
    loadFilters();

  })
  .catch(error => console.error('Erreur lors de la récupération des données :', error));

// Fonction pour récupérer les catégories depuis l'API
function loadFilters() {
  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(apiCategories => {
      const btnCenterContainer = document.querySelector('.btn-center');

      // Ajouter le bouton "Tous" en tant que premier bouton
      const allButton = document.createElement('div');
      allButton.textContent = 'Tous';
      allButton.classList.add('btn', 'btn-active');
      allButton.dataset.categoryId = 0;
      allButton.addEventListener('click', handleButtonClick);
      btnCenterContainer.appendChild(allButton);

      // Utiliser forEach pour créer un bouton pour chaque catégorie de l'API
      apiCategories.forEach(category => {
        const btn = document.createElement('div');
        btn.textContent = category.name;
        btn.classList.add('btn');
        btn.dataset.categoryId = category.id;
        btn.addEventListener('click', handleButtonClick);
        btnCenterContainer.appendChild(btn);
      });
    })
    .catch(error => console.error('Erreur lors de la récupération des catégories :', error));
}

// Fonction pour gérer le clic sur chaque bouton
function handleButtonClick(event) {
  const categoryId = parseInt(event.target.dataset.categoryId);

  // Retirer la classe 'btn-active' de tous les boutons de catégorie
  document.querySelectorAll('.btn-center .btn').forEach(btn => {
    btn.classList.remove('btn-active');
  });

  // Ajouter la classe 'btn-active' au bouton cliqué pour indiquer qu'il est actif
  event.target.classList.add('btn-active');

  // Filtrer les travaux en fonction du bouton sélectionné
  let filteredWorks;
  if (categoryId === 0) {
    filteredWorks = worksData;
  } else {
    filteredWorks = worksData.filter(work => work.categoryId === categoryId);
  }
  createGallery(filteredWorks);
}

// Appel de la fonction pour charger les catégories au chargement de la page

// Ajout du code existant pour la gestion de la fenêtre modale, etc.
// Fonction pour afficher la fenêtre modale et la section de mode édition
function openModal() {
  document.getElementById("modeEdition").style.display = "block";
  document.querySelector(".hidden").style.display = "block";
}

if (localStorage.getItem("token")){
  document.getElementById("modeEdition").classList.remove("hidden");
  modifier();
  document.getElementById("logoutButton").href = "index.html";
  checkAndHideButton();
}

function checkAndHideButton() {
  const token = localStorage.getItem("token");
  if (token) {
    const btnCenter = document.querySelector(".btn-center");
    if (btnCenter) {
      btnCenter.style.display = "none";
    }
  }
}

// Fonction pour déconnecter l'utilisateur
function logout() {
  localStorage.removeItem("token");
}

document.getElementById("logoutButton").addEventListener("click", logout);

window.onload = function() {
  if (localStorage.getItem("token")) {
    document.getElementById("logoutButton").textContent = "logout";
    logoutButton.classList.add("nav-li");
  }
};

function modifier() {
  const portfolioSection = document.getElementById("portfolio");

  const iconElement = document.createElement("i");
  iconElement.className = "fa-regular fa-pen-to-square";

  const textElement = document.createElement("p");
  textElement.textContent = "modifier";

  const portfolioModifyDiv = portfolioSection.querySelector(".portfolio-modify");
  portfolioModifyDiv.appendChild(iconElement);
  portfolioModifyDiv.appendChild(textElement);

  textElement.addEventListener("click", function() {
    const modal = document.querySelector(".modal");
    modal.style.display = "flex";
  });
}
