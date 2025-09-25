// Interactions globales
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menu burger
const burger = document.querySelector('.burger');
const mobile = document.getElementById('menuMobile');
if (burger && mobile) {
  burger.addEventListener('click', () => {
    const open = !mobile.hasAttribute('hidden');
    if (open) {
      mobile.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', 'false');
    } else {
      mobile.removeAttribute('hidden');
      burger.setAttribute('aria-expanded', 'true');
    }
  });
}

// Formulaire de contact → WhatsApp + confirmation
const formContact = document.getElementById('formContact');
const WHATSAPP_PHONE = "22940813667"; // numéro WhatsApp

if (formContact) {
  formContact.addEventListener("submit", function(e){
    e.preventDefault();

    const nom = formContact.nom.value.trim();
    const tel = formContact.tel.value.trim();
    const message = formContact.message.value.trim();

    if(!nom || !tel || !message){
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const text = `Nouveau message de ${nom} (${tel}):\n\n${message}`;
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

    // Ouvrir WhatsApp avec le message
    window.open(url, "_blank");

    // Confirmation + reset
    alert('Merci ' + nom + ' ! Votre message a été préparé pour WhatsApp.');
    formContact.reset();
  });
}
