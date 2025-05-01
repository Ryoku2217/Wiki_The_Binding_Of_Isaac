const body = document.body;
const botonModo = document.getElementById('modoToggle');
const lluvia = document.getElementById('lluvia');

// Inicialmente en modo claro
body.classList.add('light');

botonModo.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
  }
});

// Función para generar gotas
function crearGota() {
  const gota = document.createElement('div');
  gota.classList.add('gota');

  // Detecta modo para el color
  if (body.classList.contains('dark')) {
    gota.style.backgroundColor = 'crimson';
  } else {
    gota.style.backgroundColor = '#4aa3df';
  }

  gota.style.left = `${Math.random() * 100}vw`;
  lluvia.appendChild(gota);

  setTimeout(() => {
    gota.remove();
  }, 1500);
}

// Generar gotas continuamente
setInterval(crearGota, 100);

