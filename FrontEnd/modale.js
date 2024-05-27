function createModale(data) {
  const modalContent = document.querySelector(".modalContent");

  // Nettoyer la galerie avant d'ajouter de nouveaux éléments
  modalContent.innerHTML = '';

  // Parcourir les données récupérées depuis l'API pour créer les éléments de la galerie
  data.forEach(item => {
      const figure = document.createElement("figure");
      figure.classList.add("miniWork");
      modalContent.appendChild(figure);

      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title;
      figure.appendChild(img);

      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid", "fa-trash-can");
      trashIcon.id = item.id;
      figure.appendChild(trashIcon);

      trashIcon.addEventListener("click", async function () {
          try {
              const response = await fetch(`http://localhost:5678/api/works/${trashIcon.id}`, {
                  method: "DELETE",
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${localStorage.getItem("token")}`
                  },
              });

              if (response.ok) {
                  const index = data.findIndex(work => work.id === parseInt(trashIcon.id));
                  if (index !== -1) {
                      data.splice(index, 1);
                      figure.remove(); // Supprimer l'élément du DOM
                      createGallery(data); // Mettre à jour la galerie
                  }
              } else {
                  console.error("Erreur lors de la suppression de l'élément :", response.statusText);
              }
          } catch (error) {
              console.error('Erreur lors de la suppression de l\'élément :', error);
          }
      });
  });

  // Gestion du formulaire d'ajout de photo
  const form = document.querySelector("#addPictureForm");
  const photoInput = document.querySelector("#photo");
  const photoInputValue = () => photoInput.files[0];

  form.addEventListener("submit", async function (event) {
      event.preventDefault();
      try {
          const storageToken = localStorage.getItem("token");

          const formData = new FormData();
          formData.append("title", document.querySelector("#title").value);
          formData.append("category", document.querySelector("#selectCategory").value);
          formData.append("image", photoInputValue());

          const response = await fetch('http://localhost:5678/api/works/', {
              method: 'POST',
              body: formData,
              headers: {
                  "Authorization": `Bearer ${storageToken}`
              }
          });

          if (response.ok) {
              alert("Envoyé avec succès !");
              const newData = await response.json();
              data.push(newData);
              createGallery(data);
              createModale(data);
              form.reset();
              document.querySelector('#picturePreview').style.display = 'none';
              document.querySelector('.labelPhoto').style.display = 'flex';
              modal2.style.display = "none";
              checkFormValidity();
          } else {
              console.error("Erreur lors de l'envoi des données :", response.statusText);
              
          }
      } catch (error) {
          console.error('Erreur lors de l\'envoi des données :', error);
      }
  }, { once: true });


// Condition pour le bouton "Valider"

  const titleInput = document.getElementById('title');
  const categorySelect = document.getElementById('selectCategory')
  const submitButton = document.getElementById('valider');



  function checkFormValidity() {
    const isTitleFilled = titleInput.value.trim() !== '';
    const isCategorySelected = categorySelect.value !== '';
    const isPhotoAdded = previewImg.src !== '#';

    if (isTitleFilled && isCategorySelected && isPhotoAdded) {
      submitButton.style.backgroundColor = '#1D6154';
    } else {
      submitButton.style.backgroundColor = '';
    }
  }

  titleInput.addEventListener('input', checkFormValidity);
  categorySelect.addEventListener('change', checkFormValidity);
  photoInput.addEventListener('change', function () {
    if (photoInput.files && photoInput.files[0]) {
      const imageUrl = URL.createObjectURL(photoInput.files[0]);
      previewImg.src = imageUrl;
      preview.style.display = 'block';
      document.querySelector('.labelPhoto').style.display = 'none';
      checkFormValidity();
    } else {
      preview.style.display = 'none';
      document.querySelector('.labelPhoto').style.display = 'flex';
      checkFormValidity();
    }
  });


  // Gestion des fenêtres modales
  const crossElement = document.querySelector(".cross");
  crossElement.addEventListener("click", function () {
      modal.style.display = "none";
  }, );

  const crossElement2 = document.querySelector(".cross2");
  crossElement2.addEventListener("click", function () {
      modal2.style.display = "none";
  }, );
}

const addPictureBtn = document.querySelector(".addPictureBtn");
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal2");
const backButton = document.getElementById('backButton');

backButton.addEventListener('click', () => {
    modal2.style.display = 'none';
    modal.style.display = 'flex';
  });

addPictureBtn.addEventListener("click", function () {
  modal.style.display = "none";
  modal2.style.display = "flex";
});

// Gestion de la prévisualisation des images
const input = document.getElementById('photo');
const previewImg = document.getElementById('picturePreviewImg');
const preview = document.getElementById('picturePreview');

input.addEventListener('change', function () {
  if (input.files && input.files[0]) {
      const imageUrl = URL.createObjectURL(input.files[0]);
      previewImg.src = imageUrl;
      preview.style.display = 'block';
      document.querySelector('.labelPhoto').style.display = 'none';
  }
});

//Condition Ajout (Titre, catégorie) 
// Login revoir (Message)