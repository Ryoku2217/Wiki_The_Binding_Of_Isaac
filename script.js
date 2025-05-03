const body = document.body;
const botonModo = document.getElementById('modoToggle');
const botonDetenerLluvia = document.getElementById('detenerLluvia');
const lluvia = document.getElementById('lluvia');
const audioTema = document.getElementById('audioTema');

// Aplicar modo guardado
const modoGuardado = localStorage.getItem('modo') || 'light';
body.classList.add(modoGuardado);
botonModo.textContent = modoGuardado === 'dark' ? "Modo Claro" : "Modo Oscuro";


// Aplicar lluvia guardada
let lluviaActiva = localStorage.getItem('lluviaActiva') === 'true';
let intervaloLluvia = null;

// Cambiar el texto del botón según el estado guardado
if (botonDetenerLluvia) {
  botonDetenerLluvia.textContent = lluviaActiva ? "Detener Lluvia" : "Reanudar Lluvia";
}

if (lluviaActiva) {
  intervaloLluvia = setInterval(crearGota, 100);
}

// Aplicar sonido guardado
audioTema.src = modoGuardado === 'light' ? 'audio/Lluvia.mp3' : 'audio/TERROR.mp3';
if (lluviaActiva) {
  audioTema.play().catch(() => {
    console.warn("Autoplay bloqueado por el navegador.");
  });
}

// Cambiar modo
botonModo.addEventListener('click', () => {
  const modoNuevo = body.classList.contains('dark') ? 'light' : 'dark';
  body.classList.remove('dark', 'light');
  body.classList.add(modoNuevo);
  botonModo.textContent = modoNuevo === 'dark' ? "Modo Claro" : "Modo Oscuro";
  localStorage.setItem('modo', modoNuevo);

  audioTema.src = modoNuevo === 'light' ? 'audio/lluvia.mp3' : 'audio/TERROR.mp3';
  if (lluviaActiva) {
  audioTema.play().catch(() => {
    console.warn("Autoplay bloqueado por el navegador.");
  });
  }
});

// Crear una gota
function crearGota() {
  const gota = document.createElement('div');
  gota.className = 'gota';
  gota.style.left = `${Math.random() * 100}vw`;
  gota.style.backgroundColor = body.classList.contains('dark') ? 'crimson' : '#4aa3df';
  lluvia.appendChild(gota);
  setTimeout(() => gota.remove(), 1500);
}

// Iniciar/detener lluvia
botonDetenerLluvia.addEventListener('click', () => {
  lluviaActiva = !lluviaActiva;
  botonDetenerLluvia.textContent = lluviaActiva ? "Detener Lluvia" : "Reanudar Lluvia";
  localStorage.setItem('lluviaActiva', lluviaActiva);
  if (lluviaActiva) {
    intervaloLluvia = setInterval(crearGota, 100);
    audioTema.play().catch(() => {
    console.warn("Autoplay bloqueado por el navegador.");
    });
    localStorage.setItem('audioReproduciendo', 'true'); // Guardamos el audio que está sonando
  } else {
    clearInterval(intervaloLluvia);
    audioTema.pause();
    localStorage.setItem('audioReproduciendo', 'false'); // Guardamos el audio que está pausado
  }
});
