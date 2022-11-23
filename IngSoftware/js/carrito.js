//Traigo los productos del localstorage a la pestaña carrito
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoProductos = document.querySelector('#carrito-productos');
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
const contenedorCarritoComprado = document.querySelector('#carrito-comprado');
let botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');
const botonVaciar = document.querySelector('#carrito-acciones-vaciar');
const botonComprar = document.querySelector("#boton-alerta");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {

    contenedorCarritoVacio.classList.add('disabled');
    contenedorCarritoProductos.classList.remove('disabled');
    contenedorCarritoAcciones.classList.remove('disabled');
    contenedorCarritoComprado.classList.add('disabled');
  
    contenedorCarritoProductos.innerHTML = "";
  
    productosEnCarrito.forEach(producto => {
  
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
      <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
      <div class="carrito-producto-titulo">
        <small>Nombre</small>
        <h3>${producto.titulo}</h3>
      </div>
      <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>
      </div>
      <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>$${producto.precio}</p>
      </div>
      <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
      <p>$${producto.precio * producto.cantidad}</p>
        </div>
      <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
      `;
  
      contenedorCarritoProductos.append(div);
  
    })
    
  } else {
  
    contenedorCarritoVacio.classList.remove('disabled');
    contenedorCarritoProductos.classList.add('disabled');
    contenedorCarritoAcciones.classList.add('disabled');
    contenedorCarritoComprado.classList.add('disabled');
  
  }

  actualizarBotonesEliminar();
  actualizarTotal();
}

cargarProductosCarrito();

//Creo una funcion para los botones eliminar
function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');

  botonesEliminar.forEach(boton => {
      boton.addEventListener("click", eliminarDelCarrito)
  });
}

//Creo la funcion para eliminar los productos del carrito
function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();
  
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);

//Creo la funcion para el boton de VACIAR CARRITO
function vaciarCarrito() {

  productosEnCarrito.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  cargarProductosCarrito();

}

//Funcion para actualizar el precio total que se muestra en el carrito
function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  total.innerText = `$${totalCalculado}`;
}

//Agrego un SweetAlert en el boton comprar ahora
const botonVentas = document.querySelector('#boton-alerta');
botonVentas.addEventListener('click', () => {
    Swal.fire({
        title: 'Desea completar la compra?',  
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Comprar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Compra realizada con éxito!',
            'Gracias por comprar con nosotros.',
            'success'
          )
        }
      })
})

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}