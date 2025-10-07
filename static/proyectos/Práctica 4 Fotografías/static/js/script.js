
document.getElementById('year').textContent = new Date().getFullYear();


const header = document.querySelector('.site-header .nav');
const toggle = document.querySelector('.menu-toggle');

toggle.addEventListener('click', () => {
    
    const isOpen = header.classList.toggle('open');
    
    toggle.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', (e) => {
    
    const inside = e.target.closest('.site-header');
    if (!inside) {
        header.classList.remove('open');
    }
});


const visor = document.getElementById('visor');
const visorImg = document.getElementById('visorImg');
const btnClose = document.getElementById('closeVisor');
const btnPrev = document.getElementById('prevVisor');
const btnNext = document.getElementById('nextVisor');


const allGalleries = [...document.querySelectorAll('.galeria')];
const images = allGalleries.flatMap(g => [...g.querySelectorAll('img')]);
let currentIndex = -1;


function openVisor(index) {
    if (index < 0 || index >= images.length) return;

    currentIndex = index;
    visorImg.src = images[currentIndex].src;
    visor.classList.add('open');
    visor.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; 
}


function closeVisor() {
    visor.classList.remove('open');
    visor.setAttribute('aria-hidden', 'true');
    visorImg.removeAttribute('src');
    document.body.style.overflow = 'auto'; 
}


function showPrev() {
    currentIndex = (currentIndex <= 0) ? images.length - 1 : currentIndex - 1;
    visorImg.src = images[currentIndex].src;
}

function showNext() {
    currentIndex = (currentIndex >= images.length - 1) ? 0 : currentIndex + 1;
    visorImg.src = images[currentIndex].src;
}

images.forEach((img, idx) => {
    img.addEventListener('click', () => openVisor(idx));
});


btnClose.addEventListener('click', closeVisor);
btnPrev.addEventListener('click', showPrev);
btnNext.addEventListener('click', showNext);

visor.addEventListener('click', (e) => {
    if (e.target === visor) {
        closeVisor();
    }
});


document.addEventListener('keydown', (e) => {
    if (!visor.classList.contains('open')) return;

    if (e.key === 'Escape') closeVisor();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});
document.getElementById('year').textContent = new Date().getFullYear();