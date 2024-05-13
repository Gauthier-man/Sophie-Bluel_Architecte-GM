function createModale(data) {

  const modalContent= document.querySelector(".modalContent");
    
    // Nettoyer la galerie avant d'ajouter de nouveaux éléments
    modalContent.innerHTML = '';
  
    // Parcourir les données récupérées depuis l'API pour créer les éléments de la galerie
    for (let i = 0; i < data.length; i++) {
    
      
      const figure = document.createElement("figure"); // Créer un élément "figure" pour chaque image
      figure.classList.add("miniWork");
      modalContent.appendChild(figure);// Ajouter la figure à la galerie
      const img = document.createElement("img");   // Créer un élément "img" pour afficher l'image
      img.src = data[i].imageUrl; // Définir la source de l'image
      img.alt = data[i].title;  // Définir le texte alternatif de l'image
      figure.appendChild(img); // Ajouter l'image à la figure
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid", "fa-trash-can");
      trashIcon.id = data[i].id;
      console.log(trashIcon.id);
      figure.appendChild(trashIcon);
      
      trashIcon.addEventListener("click" , function() { 


        fetch('http://localhost:5678/api/works/' + trashIcon.id, { method: "DELETE", 
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + storageToken 

        },}) 
        
        const stock = data.findIndex(work => work.id == trashIcon.id)
        data.splice(stock, 1)
        console.log(data)
        createGallery(data)
        createModale(data)
      })
      
const storageToken = localStorage.getItem("token");
      

    // Ajout Photo => FormData l'envoi des données, method POST, preview img createObjetUrl, 

    // Envoi des données du formulaire à votre serveur
    fetch('http://localhost:5678/api/works/', {
      method: 'POST',
      body: formData
    })
    .then(response => {
     
      
      console.log('Réponse du serveur : ', response);
    })
  }
  
 



  // Fenêtre Modal :
  
  // Sélection de l'élément avec la classe "cross"
  const crossElement = document.querySelector(".cross");
  
  // Ajout d'un gestionnaire d'événements pour le clic sur la croix
  crossElement.addEventListener("click", function() {
      // Sélection de la fenêtre modale
      const modal = document.querySelector(".modal");
      // Masquer la fenêtre modale en changeant son style d'affichage
      modal.style.display = "none";
  });


}

document.addEventListener("DOMContentLoaded", function() {
const addPictureBtn = document.querySelector(".addPictureBtn")
const modal = document.querySelector(".modal")
const modal2 = document.querySelector(".modal2")

addPictureBtn.addEventListener("click" , function() {
  modal.style.display ="none"
  modal2.style.display ="flex"

})
});

// Sélection de l'élément d'entrée de fichier
const input = document.getElementById('photo');
// Sélection de l'élément img de prévisualisation
const previewImg = document.getElementById('picturePreviewImg');
const preview= document.getElementById('picturePreview');

// Ajout d'un gestionnaire d'événements pour le changement dans le champ de fichier
input.addEventListener('change', function() {
  // Vérifier si un fichier est sélectionné
  if (input.files && input.files[0]) {
    // Créer une URL objet à partir du fichier sélectionné
    const imageUrl = URL.createObjectURL(input.files[0]);
    // Assigner l'URL de l'image à l'attribut src de l'élément img de prévisualisation
    previewImg.src = imageUrl;
    // Afficher l'élément img de prévisualisation
    preview.style.display = 'block';

    // Masquer l'élément avec la classe "labelPhoto"
    const labelPhoto = document.querySelector('.labelPhoto');
    labelPhoto.style.display = 'none';

  }
});