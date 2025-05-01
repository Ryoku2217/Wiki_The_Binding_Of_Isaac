// Lista vacía que actuará como el carrito de compras
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
  // Buscamos si ya existe el producto
  let producto = carrito.find(item => item.nombre === nombre);

  if (producto) {
    producto.cantidad += 1;
  } else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });
  }

  console.log("Producto agregado:", nombre);
  console.log("Carrito actual:", carrito);
}

// Esta función devuelve el carrito (para otras páginas)
function obtenerCarrito() {
  return carrito;
}

// Esta función la usaremos si queremos vaciar el carrito al finalizar compra
function vaciarCarrito() {
  carrito = [];
}
