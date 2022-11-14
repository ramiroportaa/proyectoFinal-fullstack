const getOrdersFromAPI = async()=>{
    let res = await fetch("/api/order/" + currentUser.email);
    res = await res.json();
    return res.data;
}

function renderModalesOrders (orders){
    const modales = document.getElementById("modalesOrdenes");
    if (!orders.length) return;
    orders.forEach((order) => {
        let contenedor = document.createElement("div");
        contenedor.className = "modal fade";
        contenedor.id = `#orderView-${order._id}`;
        contenedor.tabIndex = "-1";
        contenedor.role = "dialog";
        contenedor.ariaHidden = "true";
        //Definimos el innerHTML del elemento con una plantilla de texto
        contenedor.innerHTML = `<!-- modal order-${order._id}-->
                                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <div class="row align-items-stretch">
                                                <div class="">
                                                    <button class="btn-close p-4" type="button" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                                                        <div class="p-5 my-md-4">
                                                            <h2 class="h4">Orden #${order._id}</h2>
                                                            <p class="text-muted">Total de la orden $${order.productos.reduce((acc, act) => acc + act.precio * act.quantity, 0)}.-</p>
                                                            <p class="text-small mb-4">Fecha: ${new Date(order.timestamp).toLocaleString()}</p>
                                                            <ul>
                                                            <h5>Detalle: </h5>
                                                            ${order.productos.map(prod =>{
                                                                return `<li>Nombre: ${prod.nombre} | Precio unitario: ${prod.precio} | Cantidad: ${prod.quantity} | Total: ${prod.precio * prod.quantity}</li>
                                                                `
                                                              }).join("")}
                                                            </ul>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        modales.appendChild(contenedor);
    })
}

const renderOrders = async()=>{
    const ordersHTML = document.getElementById("orders"); 
    ordersHTML.innerHTML = "";
    const orders = await getOrdersFromAPI();

    //Si el array de productos en la ultima orden se encuentra vacio...
    if (!orders?.length){
        ordersHTML.innerHTML = `<p>NO HAY ORDENES ANTERIORES</p>`;
    }else{
    //Agregamos cada Orden por DOM.
    orders.forEach(order => {
        const total = order.productos.reduce((acc, act) => acc + act.precio * act.quantity, 0)
        ordersHTML.innerHTML += `<tr>
                                <th class="pl-0 border-0" scope="row">
                                <div class="media align-items-center">
                                    <div class="ms-3"><strong class="h6"><a class="reset-anchor" href="#orderView-${order._id}" data-bs-toggle="modal">Orden #${order._id}</a></strong></div>
                                    <a class="btn btn-sm btn-outline-dark ms-3" href="#orderView-${order._id}" data-bs-toggle="modal">VER</a>
                                </div>
                                </th>
                                <td class="align-middle border-0">
                                    <p class="mb-0 small">${new Date(order.timestamp).toLocaleString()}</p>
                                </td>
                                <td class="align-middle border-0">
                                    <p class="mb-0 small">${order.state}</p>
                                </td>
                                <td class="align-middle border-0">
                                    <p class="mb-0 small">$${total}</p>
                                </td>
                            </tr>
                            `;                   
    });

    renderModalesOrders(orders);
    };
}

getUserDataFromAPI().then(res => {
    renderPerfilUsuario(currentUser);
    renderOrders();
});