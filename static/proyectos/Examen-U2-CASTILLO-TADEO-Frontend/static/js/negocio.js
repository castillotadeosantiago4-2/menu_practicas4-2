// ============================================================
// script.js - Funcionalidad general del sitio web responsivo
// ============================================================

// 🔸 Coloca automáticamente el año actual en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================================
// 🔸 MENÚ RESPONSIVO (botón hamburguesa)
// ============================================================

const btnToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".menu");

btnToggle.setAttribute("aria-expanded", "false");
btnToggle.setAttribute("aria-label", "Abrir menú de navegación");

btnToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("active");
  btnToggle.setAttribute("aria-expanded", String(open));
});

navMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      btnToggle.setAttribute("aria-expanded", "false");
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    btnToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (e) => {
  const clickEnHeader = e.target.closest("header");
  if (!clickEnHeader && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    btnToggle.setAttribute("aria-expanded", "false");
  }
});

// ============================================================
// 🔸 AUDIO CONTROL (testimonio con sonido real y compatibilidad)
// ============================================================

const audio = document.getElementById("bg-music");
const toggle = document.getElementById("toggleAudio");

if (audio && toggle) {
  audio.volume = 0.8;
  audio.muted = true; // inicia silenciado hasta clic del usuario
  toggle.textContent = "▶️ Reproducir testimonio";

  // 🔹 Función principal de alternancia
  const toggleAudio = async () => {
    try {
      if (audio.paused) {
        audio.muted = false; // desmutea
        await audio.play();  // reproduce sonido
        toggle.textContent = "🔊 Pausar testimonio";
        toggle.setAttribute("aria-pressed", "true");
      } else {
        audio.pause();
        toggle.textContent = "▶️ Reproducir testimonio";
        toggle.setAttribute("aria-pressed", "false");
      }
    } catch (err) {
      console.warn("🔇 El navegador bloqueó el audio. Requiere interacción.", err);
      toggle.textContent = "🔇 Haz clic para activar sonido";
    }
  };

  // Evento de clic manual
  toggle.addEventListener("click", toggleAudio);

  // En móviles: primer toque desbloquea audio
  document.body.addEventListener(
    "touchstart",
    async () => {
      if (audio.paused) {
        try {
          audio.muted = false;
          await audio.play();
          toggle.textContent = "🔊 Pausar testimonio";
        } catch (err) {
          console.warn("Audio bloqueado hasta interacción táctil:", err);
        }
      }
    },
    { once: true }
  );

  // 🔹 Reanuda si se vuelve a presionar play del sistema
  audio.addEventListener("play", () => {
    toggle.textContent = "🔊 Pausar testimonio";
  });

  // 🔹 Pausa si el usuario presiona el botón de pausa del sistema
  audio.addEventListener("pause", () => {
    toggle.textContent = "▶️ Reproducir testimonio";
  });
}

// ============================================================
// 🔸 GALERÍA (abrir imagen en modal ampliado)
// ============================================================

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const closeModal = document.querySelector(".modal-close");

if (modal && modalImg && closeModal) {
  document.querySelectorAll(".zoomable").forEach((img) => {
    img.addEventListener("click", () => {
      modal.classList.add("open");
      modalImg.src = img.src;
      modalCaption.textContent = img.alt;
      modal.setAttribute("aria-hidden", "false");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

// ============================================================
// Fin del script
// ============================================================
