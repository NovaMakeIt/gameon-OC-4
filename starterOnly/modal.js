function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");

// Éléments du formulaire
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationInputs = document.querySelectorAll('input[name="location"]');
const terms = document.getElementById("checkbox1");

// Messages d'erreur
const errorMessages = {
  firstName: "Le prénom doit contenir au moins 2 caractères",
  lastName: "Le nom doit contenir au moins 2 caractères",
  email: "Veuillez entrer une adresse email valide",
  birthdate: "Veuillez entrer une date de naissance",
  quantity: "Veuillez entrer un nombre",
  location: "Veuillez sélectionner un tournoi",
  terms: "Vous devez accepter les conditions d'utilisation"
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
closeBtn.addEventListener("click", closeModal);

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Afficher un message d'erreur
function showError(element, message) {
  // Trouver le parent .formData
  const formDataElement = element.closest(".formData");
  
  // Ajouter l'attribut data-error avec le message d'erreur
  formDataElement.setAttribute("data-error", message);
  
  // Rendre l'erreur visible
  formDataElement.setAttribute("data-error-visible", "true");
  
  return false;
}

// Enlever un message d'erreur
function removeError(element) {
  const formDataElement = element.closest(".formData");
  formDataElement.removeAttribute("data-error-visible");
  return true;
}

// Valider le prénom
function validateFirstName() {
  if (firstName.value.trim().length < 2) {
    return showError(firstName, errorMessages.firstName);
  }
  return removeError(firstName);
}

// Valider le nom
function validateLastName() {
  if (lastName.value.trim().length < 2) {
    return showError(lastName, errorMessages.lastName);
  }
  return removeError(lastName);
}

// Valider l'email avec une expression régulière
function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    return showError(email, errorMessages.email);
  }
  return removeError(email);
}

// Valider la date de naissance
function validateBirthdate() {
  if (birthdate.value === "") {
    return showError(birthdate, errorMessages.birthdate);
  }
  return removeError(birthdate);
}

// Valider la quantité
function validateQuantity() {
  if (quantity.value === "" || isNaN(quantity.value)) {
    return showError(quantity, errorMessages.quantity);
  }
  return removeError(quantity);
}

// Valider qu'un tournoi a été sélectionné
function validateLocation() {
  let locationSelected = false;
  
  // Vérifier si au moins un bouton radio est sélectionné
  locationInputs.forEach((input) => {
    if (input.checked) {
      locationSelected = true;
    }
  });
  
  if (!locationSelected) {
    // Trouver le parent .formData pour le premier bouton radio
    const formDataElement = locationInputs[0].closest(".formData");
    formDataElement.setAttribute("data-error", errorMessages.location);
    formDataElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    const formDataElement = locationInputs[0].closest(".formData");
    formDataElement.removeAttribute("data-error-visible");
    return true;
  }
}

// Valider les conditions d'utilisation
function validateTerms() {
  if (!terms.checked) {
    // Trouver le parent .formData
    const formDataElement = terms.closest(".formData");
    formDataElement.setAttribute("data-error", errorMessages.terms);
    formDataElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    const formDataElement = terms.closest(".formData");
    formDataElement.removeAttribute("data-error-visible");
    return true;
  }
}

// Fonction de validation principale appelée lors de la soumission du formulaire
function validate() {
  // Appeler toutes les fonctions de validation
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isBirthdateValid = validateBirthdate();
  const isQuantityValid = validateQuantity();
  const isLocationValid = validateLocation();
  const isTermsValid = validateTerms();
  
  // Retourner true seulement si tous les champs sont valides
  return isFirstNameValid && isLastNameValid && isEmailValid 
      && isBirthdateValid && isQuantityValid && isLocationValid 
      && isTermsValid;
}

// Ajouter des écouteurs d'événements pour la validation en temps réel
firstName.addEventListener("input", validateFirstName);
lastName.addEventListener("input", validateLastName);
email.addEventListener("input", validateEmail);
birthdate.addEventListener("input", validateBirthdate);
quantity.addEventListener("input", validateQuantity);
locationInputs.forEach(input => {
  input.addEventListener("change", validateLocation);
});
terms.addEventListener("change", validateTerms);

// Attacher la fonction de validation au formulaire
form.addEventListener("submit", function(event) {
  // Si la validation échoue, empêcher la soumission du formulaire
  if (!validate()) {
    event.preventDefault();
  }
});