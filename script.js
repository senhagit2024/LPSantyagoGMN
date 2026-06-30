const topbar = document.querySelector(".topbar");
const menuButton = document.querySelector(".menu-button");
const leadForm = document.querySelector(".lead-form");
const formNote = document.querySelector(".form-note");
const heroImageCard = document.querySelector(".hero-image-card");
const profileActions = document.querySelectorAll(".profile-action");
const solutionMap = document.querySelector(".solution-map");
const contatoTitle = document.querySelector("#contato-title");

menuButton?.addEventListener("click", () => {
  const isOpen = topbar.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a, .nav-cta").forEach((link) => {
  link.addEventListener("click", () => {
    topbar.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Recebido. Vamos retornar para avaliar seu perfil.";
  leadForm.reset();
});

heroImageCard?.addEventListener("pointerup", (event) => {
  event.stopPropagation();
  heroImageCard.classList.toggle("is-active");
});

document.addEventListener("pointerup", (event) => {
  if (!heroImageCard?.contains(event.target)) {
    heroImageCard?.classList.remove("is-active");
  }

  if (![...profileActions].some((action) => action.contains(event.target))) {
    profileActions.forEach((action) => action.classList.remove("is-active"));
  }
});

profileActions.forEach((action) => {
  action.addEventListener("pointerup", (event) => {
    event.stopPropagation();
    profileActions.forEach((item) => {
      if (item !== action) {
        item.classList.remove("is-active");
      }
    });
    action.classList.toggle("is-active");
  });
});

const updateSolutionParallax = () => {
  if (!solutionMap) {
    return;
  }

  const rect = solutionMap.parentElement.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;
  const sectionCenter = rect.top + rect.height / 2;
  const offset = Math.max(-34, Math.min(34, (viewportCenter - sectionCenter) * 0.08));
  solutionMap.style.setProperty("--solution-map-y", `${offset}px`);
};

window.addEventListener("scroll", updateSolutionParallax, { passive: true });
window.addEventListener("resize", updateSolutionParallax);
updateSolutionParallax();

contatoTitle?.addEventListener(
  "pointerenter",
  () => {
    contatoTitle.classList.remove("light-sweep");
    void contatoTitle.offsetWidth;
    contatoTitle.classList.add("light-sweep");
  },
  { once: true },
);
