/* ------------------- MENU BURGER ------------------- */
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

/* ------------------- MACHINE À ÉCRIRE ------------------- */
const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");
const words = ["Développeur Web", "Freelance", "Créatif", "Passionné"];
let wordIndex = 0;
let charIndex = 0;
let typing = true;

function type() {
  if (typing) {
    if (charIndex < words[wordIndex].length) {
      typedText.textContent += words[wordIndex][charIndex];
      charIndex++;
      setTimeout(type, Math.random() * 120 + 50); // vitesse variable
    } else {
      typing = false;
      setTimeout(type, 1200);
    }
  } else {
    if (charIndex > 0) {
      typedText.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, 40);
    } else {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    }
  }
}
type();

// Curseur clignotant
setInterval(() => {
  cursor.classList.toggle("active");
}, 400);

/* ------------------- LIGHTBOX ------------------- */
const projects = document.querySelectorAll(".project");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector("#lightbox img");
const closeBtn = document.getElementById("close");

projects.forEach(project => {
  project.addEventListener("click", () => {
    const imgSrc = project.dataset.image;
    lightboxImg.src = imgSrc;
    lightbox.style.display = "flex";
  });
});

function closeLightbox() {
  lightbox.style.display = "none";
}

closeBtn.addEventListener("click", closeLightbox);

// Fermer avec ESC
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

// Fermer si clic extérieur
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

/* ------------------- ANIMATIONS SCROLL ------------------- */
const revealElements = document.querySelectorAll("section, .card, .skill, .project, blockquote");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el, index) => {
    const position = el.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      setTimeout(() => {
        el.classList.add("reveal");
      }, index * 80); // délai progressif
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ------------------- ENVOI FORMULAIRE (Formspree) ------------------- */
const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert("✅ Merci ! Votre message a bien été envoyé.");
      form.reset();
    } else {
      alert("❌ Oups, une erreur est survenue. Réessayez plus tard.");
    }
  } catch (error) {
    alert("⚠️ Impossible d’envoyer le message (connexion perdue).");
  }
});


/* ------------------- BOUTON SCROLL TO TOP ------------------- */
const scrollTopBtn = document.createElement("button");
scrollTopBtn.id = "scrollTop";
scrollTopBtn.innerHTML = "⬆";
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ------------------- PARTICLES.JS ------------------- */
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 90 },
    "color": { "value": "#64ffda" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.6, "random": true },
    "size": { "value": 3, "random": true },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#64ffda",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "push" }
    },
    "modes": {
      "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});
