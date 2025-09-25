// ====== ANNEE DANS LE FOOTER ======
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== MENU BURGER MOBILE ======
const burger = document.querySelector(".burger");
const menuMobile = document.querySelector(".menu-mobile");

if (burger && menuMobile) {
  burger.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
  });
}

// ====== FORMULAIRE DE CONTACT ======
const formContact = document.getElementById('formContact');
const WHATSAPP_PHONE = "22940813667"; // Remplace par ton numéro WhatsApp

if (formContact) {
  formContact.addEventListener("submit", function(e){
    e.preventDefault(); // Empêche l'envoi classique

    const nom = formContact.nom.value.trim();
    const tel = formContact.tel.value.trim();
    const message = formContact.message.value.trim();

    if(!nom || !tel || !message){
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Ouvre WhatsApp avec le message prêt à envoyer
    const text = `Nouveau message de ${nom} (${tel}):\n\n${message}`;
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    // Confirmation à l'utilisateur et reset du formulaire
    alert(`Merci ${nom} ! Votre message a été bien reçu. Nous vous contactons très vite.`);
    formContact.reset();
  });
}
