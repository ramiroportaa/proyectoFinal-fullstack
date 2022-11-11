//Funcion para Escribir por DOM el codigo html de los items en el sidebar del carrito.
//Tambien se incluye el evento de borrar producto del carrito.
const barraCarritoListaItems = document.getElementById("barraCarrito-listaItems");

async function escribirProductosCarrito () {
    const bandera = await getProductsCartFromAPI();
    if (!bandera){
        barraCarritoListaItems.innerHTML = `
        <p>Debes iniciar sesión para comprar</p>
        <a class="btn btn-primary text-white" href="/login.html" role="button">Login</a>
        `;
        return;
    };
    barraCarritoListaItems.innerHTML = "";
    let total = 0;
    cart.forEach((producto) =>{
        total += (producto.precio * producto.quantity);
        let contenedor = document.createElement("div");
        contenedor.className = "row mb-2 barraCarrito-item align-items-center";
        contenedor.innerHTML = `
        <div class="col-4">
        <img class="img-fluid rounded mx-auto d-block" src="${producto.foto}" alt="${producto.nombre}">
        </div>
        <div class="col-6">
        <p>${producto.nombre} x ${producto.quantity}</p>
        <p>$${producto.precio}.-</p>
        </div>
        <button id="barraCarrito-borrarItem-${producto._id}" class="btn col-2" type="button"><i class="fas fa-trash-alt"></i></button>
        `
        barraCarritoListaItems.appendChild(contenedor);
        //Almacenamos en constante el nodo de cada boton de borrar Item.
        const borrarProducto = document.getElementById(`barraCarrito-borrarItem-${producto._id}`);
        //Añadimos manejador de evento click a dicho nodo.
        borrarProducto.addEventListener("click", async () => {
            await deleteProductCartAPI(producto._id);
            await renderSidebarCart();
        });
    })
    let contenedor = document.createElement("div");
    contenedor.className = "row h5";
    if (!cart.length) {
        contenedor.innerHTML = `<p>El carrito está vacío</p>`
    }
    else{
        contenedor.innerHTML = `<p>TOTAL ${total}.-</p>`
    }
    barraCarritoListaItems.appendChild(contenedor);
}

async function renderSidebarCart() {
    await getProductsCartFromAPI();
    await escribirProductosCarrito();
     //Escribo por DOM la cantidad de productos en el carrito.
    navCarrito.innerHTML = `Carrito (${cart.length})`;
}

 //Sidebar del carrito.
 const navCarrito = document.getElementById("nav-carrito");
 //Mostramos la orden cada vez que hacemos click en el carrito...
 navCarrito.addEventListener("click", async () => {
     await escribirProductosCarrito();
     barraCarritoContainer.classList.toggle("barraCarrito-active");
})

//Evento para abrir y cerrar SideBar del carrito.
const barraCarritoContainer = document.getElementById("barraCarrito-container");
const barraCarrito = document.getElementById("barraCarrito");
const barraCarritoCerrar = document.getElementById("barraCarrito-cerrar");
barraCarritoCerrar.addEventListener("click", ()=>{
    barraCarritoContainer.classList.toggle("barraCarrito-active");
});
barraCarritoContainer.addEventListener("click", ()=>{
    barraCarritoContainer.classList.toggle("barraCarrito-active");
});
barraCarrito.addEventListener("click", (e)=>{
    e.stopPropagation();
});

setTimeout(renderSidebarCart, 1000);