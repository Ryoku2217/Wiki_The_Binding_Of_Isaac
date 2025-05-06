//añadir audio de glitch

const glitchSound = new Audio("audio/glitch.mp3");

// Bandera de estado para alternar entre Isaac normal y Tainted Isaac

let taintedActivo = false;

// Definición de iconos de estadísticas

const iconosStats = {
  salud: "icons/heart.webp",
  velocidad: "icons/speed.webp",
  daño: "icons/damage.webp",
  lagrimas: "icons/tears.webp",
  bomba: "icons/bomb.webp"
};

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
  items: "The D6 (desbloqueable)",
  descripcion: "Isaac es el personaje principal de The Binding of Isaac. Es el único personaje desbloqueado por defecto. Es un niño que vive con su madre, quien lo encierra en su habitación y le prohíbe salir. Un día, su madre escucha una voz que le dice que debe sacrificar a Isaac para demostrar su fe. Isaac escapa al sótano y se enfrenta a monstruos y jefes en su camino. Isaac comienza con 3 corazónes rojos  y una bomba . También comenzara con el D6 una vez lo hayas desbloqueado.",
  logros: [
    "Isaac's Head - Completa Boss Rush",
    "Lost Baby - Derrota a Mom's Heart en modo difícil",
    "Isaac's Tears - Derrota a Isaac",
    "Mom's Knife - Derrota a Satan",
    "Missing Poster - Derrota a The Lamb",
    "The D20 - Derrota a ???",
    "Lil' Chest - Derrota a Ultra Greed",
    "D1 - Derrota a Ultra Greedier",
    "Fart Baby - Derrota a Hush",
    "Cry Baby - Derrota a Mega Satan",
    "D infinity - Derrota a Delirium",
    "Meat Cleaver - Derrota a Mother",
    "Options? - Derrota a The Beast",
    "The Broken - Usa la Red Key para abrir el cuarto oculto en Casa",
    "Buddy Baby - Completa todas las marcas en modo dificil"
  ],
  trivia: [
    "Isaac hace referencia a la historia bíblica de la unión de Isaac, en la que Dios le ordenó a Abraham sacrificar a su único hijo, Isaac, para demostrar su lealtad y amor. \"Entonces Dios le dijo: 'Toma a tu hijo, tu único hijo, a quien amas, Isaac, y ve a la región de Moriah. Sacrifícalo allí como holocausto en el monte que yo te mostraré'\" (Génesis 22:2).",
    "Edmund ha declarado que Isaac es zurdo, pero en la escena inicial, Isaac sostiene un lápiz con la mano derecha. Esto podría ser una referencia al prejuicio católico contra la zurdera, derivado de Mateo 25:33, que proclama que Dios pondrá a los que merecen ascender al Cielo a su derecha y a los que merecen descender al Infierno a su izquierda. La madre de Isaac podría haberlo obligado a trabajar con la mano derecha. La práctica general de obligar a los zurdos a usar la mano derecha también ha sido una práctica desde hace mucho tiempo, y la aceptación de los zurdos solo comenzó a notarse en 1971.",
    "Isaac es calvo porque su mamá lo rapo.",
    "El nombre completo de Isaac es Isaac Moriah, el lugar donde Abraham toma a su hijo Isaac para sacrificarlo, en el Libro de Genesis."
  ]
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
  items: "Mom's Box",
  descripcion: "Tainted Isaac es un personaje añadido en The Binding of Isaac: Repentance. Es la versión alternativa de Isaac. Se desbloquea al llegar a Casa y usar la Llave Roja, la Llave Rota o el Alma de Caín para acceder a una habitación especial en una de las paredes mientras juegas con Isaac.",
  notas2: [
    "Tainted Isaac solo puede llevar 8 objetos pasivos a la vez. Sus 8 objetos pasivos actuales se ven en la esquina superior izquierda de la pantalla, y uno de ellos está resaltado con un cuadrado blanco. Al recoger un noveno objeto pasivo, el objeto seleccionado, o mejor dicho, el que se encuentra en el cuadrado blanco, se colocará en un pedestal frente a Isaac Corrupto. Puedes pulsar la tecla de intercambio para alternar entre los objetos seleccionados.",
    "Ten cuidado al usar a Tainted Isaac mientras desbloqueas The Forgotten, ya que la segunda pieza de la pala se puede volver a enrollar."
  ],
  logros: [
    "Mom's Lock - Derrota a Isaac, ???, Satan y The Lamb con Tainted Isaac.",
    "The Stars? - Derrota a Ultra Greedier con Tainted Isaac.",
    "Soul of Isaac - Derrota a Hush y a la Boss Rush con Tainted Isaac.",
    "Mega Chest - Derrota a Mega Satan con Tainted Isaac.",
    "Spindow Dice - Derrota a Delirium con Tainted Isaac.",
    "Dice Bag - Derrota a Mother con Tainted Isaac.",
    "Glitched Crown - Derrota a The Beast con Tainted Isaac."
  ],
  trivia: [
   "El logro por desbloquear a Tainted Isaac es `El Roto`. Este es el nombre que se usa en The Binding of Isaac: Four Souls.",
   "El desbloqueo de Tainted Isaac para Ultra Greedier es la XVII - The Stars?. Normalmente, esta carta simboliza la falta de fe y la desesperación. Probablemente se refiere a que Isaac se considera malvado y cree que su única salida es suicidarse."
  ]
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
      const icon = iconosStats[key] || "";
      return `
        <p>
          ${icon ? `<img src="${icon}" alt="${key}" class="stat-icon">` : ""}
          <strong>${capitalizar(key)}:</strong> ${value}
        </p>
      `;
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

    // Actualizar descripción

    const descripcion = document.getElementById("descripcion-contenido");
    descripcion.textContent = personaje.descripcion;
    
    // Actualizar logros

    const logrosHTML = Object.entries(personaje.logros).map(([key, value]) => {
      const icon = iconosStats[key] || "";
      return `
        <p>
          ${icon ? `<img src="${icon}" alt="${key}" class="stat-icon">` : ""}
          <strong>${capitalizar(key)}:</strong> ${value}
        </p>
      `;
    }).join("");
    
    document.querySelector(".stats").innerHTML = statsHTML;

    // Actualizar trivia

    const triviaLista = document.getElementById("trivia-contenido");
    triviaLista.innerHTML = "";
    personaje.trivia.forEach(dato => {
      const li = document.createElement("li");
      li.textContent = dato;
      triviaLista.appendChild(li);
    });


    // Actualizar clases CSS para el efecto de "tainted"
    
    const nombreElemento = document.querySelector(".nombre-personaje");
    nombreElemento.textContent = personaje.nombre;
    nombreElemento.classList.toggle("tainted", taintedActivo);
    document.querySelector(".imagen-personaje").classList.toggle("tainted", taintedActivo);

    document.getElementById("botonTainted").textContent = taintedActivo ? "Normal" : "Tainted";
    contenedor.classList.remove("fade");
  }, 500);
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
