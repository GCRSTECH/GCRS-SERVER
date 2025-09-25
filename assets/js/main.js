// Interactions globales
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menu burger
const burger = document.querySelector('.burger');
const mobile = document.getElementById('menuMobile');
if (burger && mobile) {
  burger.addEventListener('click', () => {
    const open = mobile.hasAttribute('hidden') ? false : true;
    if (open) {
      mobile.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', 'false');
    } else {
      mobile.removeAttribute('hidden');
      burger.setAttribute('aria-expanded', 'true');
    }
  });
}

// Formulaire de contact (démo)
const formContact = document.getElementById('formContact');
const WHATSAPP_PHONE = "22940813667"; // ← Remplace par le numéro WhatsApp du propriétaire

formContact.addEventListener("submit", function(e){
  e.preventDefault(); // empêche l'envoi classique

  const nom = formContact.nom.value.trim();
  const tel = formContact.tel.value.trim();
  const message = formContact.message.value.trim();

  if(!nom || !tel || !message){
    alert("Veuillez remplir tous les champs !");
    return;
  }

  const text = `Nouveau message de ${nom} (${tel}):\n\n${message}`;
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank"); // ouvre WhatsApp avec le message prêt à envoyer
});
if (formContact) {
  formContact.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formContact).entries());
    alert('Merci ' + (data.nom || '') + ' ! Votre message a été bien reçu. Nous vous contactons très vite.');
    formContact.reset();
  });
}
