fetch('/data.json')
    .then( (res) => {
        return res.json();
    }).then( (productos) => {

        // Creo una función para cargar todos los juegos del array
        function cargarProductos(productosElegidos) {

            contenedorProductos.innerHTML = "";
        
            productosElegidos.forEach(producto => {
                //Creo un div con la clase producto con sus elementos de HTML
                const div = document.createElement('div');
                div.classList.add('productos');
                div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
                `;
        
                contenedorProductos.append(div);
            });
        
            actualizarBotonesAgregar();
        }
        
        cargarProductos(productos);

        // Creo un evento para todos los botones
        botonesCategorias.forEach(boton => {
            boton.addEventListener("click", (e) => {
        
                botonesCategorias.forEach(boton => boton.classList.remove("active"));
                e.currentTarget.classList.add("active");
        
                //Cargo los productos por categorias
                if (e.currentTarget.id != "todos") {
                    const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                    tituloPrincipal.innerText = productoCategoria.categoria.nombre;
        
                    const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
                    cargarProductos(productosBoton);
                } else { //Vuelvo a cargar todos los productos
                    tituloPrincipal.innerText = "Todos los Juegos";
                    cargarProductos(productos);
                }
            })
        });

        // Creo una función para los botones agregar
        function actualizarBotonesAgregar() {
            botonesAgregar = document.querySelectorAll('.producto-agregar');
        
            botonesAgregar.forEach(boton => {
                boton.addEventListener("click", agregarAlCarrito)
            });
        }
        
        let productosEnCarrito;
        
        let productosEnCarritoLs = localStorage.getItem("productos-en-carrito");
        
        //Devuelvo un array vacio dependiendo de la condición
        if (productosEnCarritoLs) {
            productosEnCarrito = JSON.parse(productosEnCarritoLs);
            actualizarNumeroCarrito();
        } else {
            productosEnCarrito = [];
        }
        
        
        function agregarAlCarrito(e) {
        
            const idBoton = e.currentTarget.id;
            const productoAgregado = productos.find(producto => producto.id === idBoton);
        
            //Creo un if para saber si se agrega un producto repetido o no
            if (productosEnCarrito.some(producto => producto.id === idBoton)) {
                const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
                productosEnCarrito[index].cantidad++;
            } else {
                productoAgregado.cantidad = 1;
                productosEnCarrito.push(productoAgregado);
            }
        
            actualizarNumeroCarrito();
        
            //Una vez que guardo los productos em el carrito, los guardo tambien en el localstorage
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        }
        
        //Creo una funcion para actualizar el numero de productos que se muestra en el carrito
        function actualizarNumeroCarrito() {
            let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
            numero.innerText = nuevoNumero;
        }

    });

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numero = document.querySelector('#numero');