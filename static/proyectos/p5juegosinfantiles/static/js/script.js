// menú responsivo y accesible
const btnToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.menu');

if (btnToggle && navMenu) {
  btnToggle.setAttribute('aria-expanded', 'false');
  btnToggle.addEventListener('click', () => {
    const opened = navMenu.classList.toggle('active');
    btnToggle.setAttribute('aria-expanded', String(opened));
  });

  // cerrar al hacer click en enlace
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        btnToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      btnToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // cerrar al clicar fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('header') && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      btnToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// control de audio
const audio = document.getElementById('bg-music');
const toggleAudio = document.getElementById('toggleAudio') || document.getElementById('toggle-music');

if (audio && toggleAudio) {
  // iniciar en mute para evitar bloqueo de autoplay
  audio.muted = true;
  toggleAudio.textContent = audio.muted ? '🔈 Activar sonido' : '🔊 Desactivar sonido';
  toggleAudio.setAttribute('aria-pressed', String(!audio.muted));

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

// año automático
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
