// DOM
const body = document.body;
const botonModo = document.getElementById('modoToggle');
const botonDetenerLluvia = document.getElementById('detenerLluvia');
const lluvia = document.getElementById('lluvia');
const audioTema = document.getElementById('audioTema');

// Cambiar modo (evento)
botonModo.addEventListener('click', () => {
  const modoNuevo = body.classList.contains('dark') ? 'light' : 'dark';
  body.classList.remove('dark', 'light'); /* eliminamos anteriores modos, para evitar problemas */
  body.classList.add(modoNuevo);
  botonModo.textContent = modoNuevo === 'dark' ? "Modo Claro" : "Modo Oscuro";
  sessionStorage.setItem('modo', modoNuevo);

  audioTema.src = modoNuevo === 'light' ? 'audio/lluvia.mp3' : 'audio/TERROR.mp3';

  // .play devuelve una promesa y con catch podemos tomar medidas
  if (lluviaActiva) {
  audioTema.play().catch(() => {
    console.warn("Autoplay bloqueado por el navegador.");
  });
  }
});

// Aplicar modo guardado
const modoGuardado = sessionStorage.getItem('modo') || 'light';
body.classList.add(modoGuardado);
botonModo.textContent = modoGuardado === 'dark' ? "Modo Claro" : "Modo Oscuro";

// Iniciar/detener lluvia (evento)
botonDetenerLluvia.addEventListener('click', () => {
  lluviaActiva = !lluviaActiva;
  botonDetenerLluvia.textContent = lluviaActiva ? "Detener Lluvia" : "Reanudar Lluvia";
  sessionStorage.setItem('lluviaActiva', lluviaActiva);
  if (lluviaActiva) {
    intervaloLluvia = setInterval(crearGota, 100);
     // .play devuelve una promesa y con catch podemos tomar medidas
    audioTema.play().catch(() => {
    console.warn("Autoplay bloqueado por el navegador.");
    });
    sessionStorage.setItem('audioReproduciendo', 'true'); // Guardamos el audio que está sonando
  } else {
    clearInterval(intervaloLluvia);
    audioTema.pause();
    sessionStorage.setItem('audioReproduciendo', 'false'); // Guardamos el audio que está pausado
  }
});

// Aplicar lluvia guardada
let lluviaActiva = sessionStorage.getItem('lluviaActiva') === 'true'; /* Como la primera vez que abrimos la pagina tiene un null */
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
  // .play devuelve una promesa y con catch podemos tomar medidas
  audioTema.play().catch(() => {
    console.warn("Autoplay bloqueado por el navegador.");
  });
}

// Crear una gota
function crearGota() {
  const gota = document.createElement('div');
  gota.className = 'gota';
  /* Aqui hacemos que aparezca en una zona aleatoria de manera horizontal */
  gota.style.left = `${Math.random() * 100}vw`;
  gota.style.backgroundColor = body.classList.contains('dark') ? 'crimson' : '#4aa3df';
  /* agregamoscon append al contenedor de div lluvia */
  lluvia.appendChild(gota);
  /* le asignamos un tiempo de vida de 1.5 s */ 
  setTimeout(() => gota.remove(), 1500);
}

/* Creacion de gotas, cada 100 milisegundos (.1s) se crea una gota y cada 1500 milisegundos (1.5s) se elimina una gota */
/* si cada 1.5s se eliminan entonces se crean 15 gotas cada vez que se elimina */
/* 600s / 0.1 = 600 gotas creadas en un minuto */
/* primera gota se crea en el segundo 0 -> se elimina en el segundo 1.5  */
/* segundo gota se crea en el segundo 0.1 -> se elimina en el segundo 1.6  */
/* Gota numero 15 se crea en el segundo 1.4 -> se elimina en el segundo 2.9  */