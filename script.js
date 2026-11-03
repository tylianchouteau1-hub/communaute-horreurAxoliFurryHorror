const dialog = document.getElementById("accountDialog");
const nicknameInput = document.getElementById("nickname");
const memberTitle = document.getElementById("memberTitle");
const memberText = document.getElementById("memberText");
const memberAction = document.getElementById("memberAction");
const logout = document.getElementById("logout");
const accountOpen = document.getElementById("accountOpen");
const formError = document.getElementById("formError");

function updateMemberView() {
  const nickname = localStorage.getItem("horrorDemoNickname");
  if (nickname) {
    memberTitle.textContent = `Bienvenue, ${nickname}`;
    memberText.textContent = "Ton profil démo est actif sur cet appareil.";
    memberAction.classList.add("hidden");
    logout.classList.remove("hidden");
    accountOpen.textContent = nickname;
  } else {
    memberTitle.textContent = "Tu es un visiteur";
    memberText.textContent = "Connecte-toi pour personnaliser ton espace local.";
    memberAction.classList.remove("hidden");
    logout.classList.add("hidden");
    accountOpen.textContent = "Connexion";
  }
}
function openProfile() {
  formError.textContent = "";
  nicknameInput.value = localStorage.getItem("horrorDemoNickname") || "";
  dialog.showModal();
}
accountOpen.addEventListener("click", openProfile);
memberAction.addEventListener("click", openProfile);
document.getElementById("saveProfile").addEventListener("click", (event) => {
  event.preventDefault();
  const nickname = nicknameInput.value.trim();
  if (nickname.length < 2) {
    formError.textContent = "Choisis un pseudo d'au moins 2 caractères.";
    return;
  }
  localStorage.setItem("horrorDemoNickname", nickname.slice(0, 20));
  dialog.close();
  updateMemberView();
});
logout.addEventListener("click", () => {
  localStorage.removeItem("horrorDemoNickname");
  updateMemberView();
});
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => document.getElementById("nav").classList.remove("open"));
});
updateMemberView();
