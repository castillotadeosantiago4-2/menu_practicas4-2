// ────────── Menú responsivo y accesible ──────────
const btnToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.menu');

if (btnToggle && navMenu) {
  btnToggle.setAttribute('aria-expanded', 'false');

  btnToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const opened = navMenu.classList.toggle('active');
    btnToggle.setAttribute('aria-expanded', String(opened));
  });

  // Cerrar al hacer click en enlace
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        btnToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      btnToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar al clicar fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('header') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      btnToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ────────── Control de audio ──────────
const audio = document.getElementById('bg-music');
const toggleAudio = document.getElementById('toggleAudio');

if (audio && toggleAudio) {
  audio.muted = true;
  toggleAudio.textContent = '🔈 Activar sonido';
  toggleAudio.setAttribute('aria-pressed', 'false');

  toggleAudio.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false;
      audio.play().catch(() => {});
      toggleAudio.textContent = '🔊 Desactivar sonido';
      toggleAudio.setAttribute('aria-pressed', 'true');
    } else {
      audio.muted = true;
      toggleAudio.textContent = '🔈 Activar sonido';
      toggleAudio.setAttribute('aria-pressed', 'false');
    }
  });
}

// ────────── Año automático ──────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ────────── Lightbox / Visor de evidencias (FUNCIONAL) ──────────
const evidencias = document.querySelectorAll('#galeria-evidencias img');

// Crear visor automáticamente si no existe
let visor = document.getElementById('visor');

if (!visor && evidencias.length > 0) {
  visor = document.createElement('div');
  visor.id = 'visor';
  visor.innerHTML = `
    <button id="cerrarVisor">✖</button>
    <button id="prevVisor">◀</button>
    <img id="visorImg" src="">
    <button id="nextVisor">▶</button>
  `;
  document.body.appendChild(visor);

  const style = document.createElement('style');
  style.textContent = `
    #visor {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.85);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    #visor.active {
      display: flex;
    }

    #visorImg {
      max-width: 90%;
      max-height: 90%;
      border-radius: 8px;
      box-shadow: 0 0 20px black;
    }

    #cerrarVisor, #prevVisor, #nextVisor {
      position: absolute;
      background: white;
      border: none;
      padding: 10px 15px;
      font-size: 18px;
      cursor: pointer;
      border-radius: 6px;
    }

    #cerrarVisor { top: 20px; right: 30px; }
    #prevVisor { left: 30px; }
    #nextVisor { right: 30px; }
  `;
  document.head.appendChild(style);
}

const visorImg = document.getElementById('visorImg');
const cerrarVisor = document.getElementById('cerrarVisor');
const prevVisor = document.getElementById('prevVisor');
const nextVisor = document.getElementById('nextVisor');

let indexActual = 0;

if (evidencias.length > 0 && visor && visorImg) {

  function mostrarVisor(idx) {
    indexActual = idx;
    visorImg.src = evidencias[idx].src;
    visor.classList.add('active');
  }

  function cerrar() {
    visor.classList.remove('active');
  }

  function prev() {
    indexActual = (indexActual - 1 + evidencias.length) % evidencias.length;
    visorImg.src = evidencias[indexActual].src;
  }

  function next() {
    indexActual = (indexActual + 1) % evidencias.length;
    visorImg.src = evidencias[indexActual].src;
  }

  // Click en imágenes
  evidencias.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => mostrarVisor(index));
  });

  // Botones
  if (cerrarVisor) cerrarVisor.addEventListener('click', cerrar);
  if (prevVisor) prevVisor.addEventListener('click', prev);
  if (nextVisor) nextVisor.addEventListener('click', next);

  // Cerrar al hacer clic fuera
  visor.addEventListener('click', (e) => {
    if (e.target === visor) cerrar();
  });

  // Teclas
  document.addEventListener('keydown', (e) => {
    if (!visor.classList.contains('active')) return;

    if (e.key === 'Escape') cerrar();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

}
