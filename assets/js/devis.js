// Devis : résumé + envoi WhatsApp
// Remplacez ce numéro par celui du gérant AU FORMAT INTERNATIONAL sans espaces ni + (ex: 22997000000).
const WHATSAPP_PHONE = '22940813667'; // TODO: <- METTRE LE VRAI NUMÉRO ICI

const form = document.getElementById('formDevis');
const resumeSection = document.getElementById('resumeSection');
const resumeText = document.getElementById('resumeText');
const btnModifier = document.getElementById('btnModifier');
const btnEnvoyer = document.getElementById('btnEnvoyer');

function buildResumeText(fields) {
  let texte = `Bonjour BHPR ELEC, je me nomme ${fields.nom}. Je vous écris du numéro ${fields.tel} depuis ${fields.adresse}. `;
  texte += `Je voudrais un service en ${fields.service}. `;
  texte += `Mon problème est le suivant : ${fields.description}. `;

  if (fields.dateSouhaitee) {
    texte += `Je souhaiterais que l’intervention se fasse le ${fields.dateSouhaitee} `;
    if (fields.horaire) {
      texte += `aux environs de ${fields.horaire}. `;
    } else {
      texte += `. `;
    }
  } else if (fields.horaire) {
    texte += `Je souhaiterais que l’intervention se fasse aux environs de ${fields.horaire}. `;
  }

  texte += `Quelles seront les besoins spécifiques à mon problème et quel serait le coût de cette intervention ? Merci bien, en attente de votre réponse.`;

  return texte;
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  // Validation simple
  const required = ['nom','tel','adresse','service','description'];
  for (const field of required) {
    if (!data[field] || String(data[field]).trim()==='') {
      alert('Veuillez remplir le champ : ' + field);
      return;
    }
  }

  const resume = buildResumeText(data);
  resumeText.textContent = resume;
  resumeSection.hidden = false;
  resumeSection.scrollIntoView({behavior:'smooth', block:'start'});
});

btnModifier.addEventListener('click', () => {
  resumeSection.hidden = true;
  window.scrollTo({top: 0, behavior:'smooth'});
});

btnEnvoyer.addEventListener('click', () => {
  const message = resumeText.textContent || '';
  if (!message.trim()) return;

  const encoded = encodeURIComponent(message);
  // Utilise wa.me si WhatsApp est installé, sinon api.whatsapp.com fonctionne (desktop & web).
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
  // Fallback desktop
  const fallback = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`;

  // Ouvre d'abord wa.me ; si bloqué, propose l'autre
  window.open(url, '_blank');
  // Optionnel: also open fallback in case first is blocked by browser popup settings
  setTimeout(() => {
    try {
      window.open(fallback, '_blank');
    } catch (e) {}
  }, 400);
});
