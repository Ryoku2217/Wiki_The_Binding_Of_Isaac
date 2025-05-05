//añadir audio de glitch

const glitchSound = new Audio("audio/glitch.mp3");

// Bandera de estado para alternar entre Isaac normal y Tainted Isaac

let taintedActivo = false;

// Definición de Isaac normal

const isaacNormal = {
  nombre: "Isaac",
  imagen: "img/isaac.png",
  stats: {
    salud: "3 corazones",
    velocidad: "1.00",
    daño: "3.50",
    lagrimas: "2.73"
  },
  notas: [
    "Personaje inicial del juego.",
    "Desbloquea personajes al avanzar."
  ],
  items: "The D6 (desbloqueable)"
};

// Definición de Tainted Isaac

const taintedIsaac = {
  nombre: "Tainted Isaac",
  imagen: "img/tainted_isaac.png",
  stats: {
    salud: "1 corazón rojo + 1 alma",
    velocidad: "1.00",
    daño: "3.50",
    lagrimas: "2.73",
    pasiva: "Solo puede tener 8 objetos a la vez"
  },
  notas: [
    "Versión alternativa de Isaac.",
    "Su habilidad lo hace versátil."
  ],
  items: "Mom's Box"
};

// Función para alternar entre Isaac normal y Tainted Isaac

function alternarTainted() {
  taintedActivo = !taintedActivo;

  const personaje = taintedActivo ? taintedIsaac : isaacNormal;

  const body = document.body;
  const contenedor = document.querySelector(".contenedor-personaje");

  contenedor.classList.add("fade");

  glitchSound.currentTime = 0;
  glitchSound.play();

  // Añadir efecto glitch visual
  const carta = document.querySelector(".carta");
  carta.classList.add("glitch-efecto");

  // Eliminar clase después del efecto
  setTimeout(() => {
    carta.classList.remove("glitch-efecto");
  }, 1000);

  setTimeout(() => {
    if (taintedActivo) {
      body.classList.add("tainted");
    } else {
      body.classList.remove("tainted");
    }

    document.querySelector(".nombre-personaje").textContent = personaje.nombre;
    document.querySelector(".imagen-personaje").src = personaje.imagen;

    // Actualizar estadísticas

    const statsHTML = Object.entries(personaje.stats).map(([key, value]) => {
      return `<p><strong>${capitalizar(key)}:</strong> ${value}</p>`;
    }).join("");
    document.querySelector(".stats").innerHTML = statsHTML;

    // Actualizar notas y objetos iniciales

    const notasHTML = personaje.notas.map(nota => `<li>${nota}</li>`).join("");
    document.querySelector(".info-extra").innerHTML = `
      <h2>Notas</h2>
      <ul>${notasHTML}</ul>
      <h2>Objetos Iniciales</h2>
      <p>${personaje.items}</p>
    `;

    document.getElementById("botonTainted").textContent = taintedActivo ? "Normal" : "Tainted";
    contenedor.classList.remove("fade");
  }, 500);
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
