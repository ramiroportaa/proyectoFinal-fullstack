const renderDetalle = (producto)=>{
  //Referencia al nodo de detalle
  const detalle = document.getElementById("detalle");
  detalle.innerHTML = `
            <div class="col-lg-6">
              <!-- PRODUCT SLIDER-->
              <div class="row m-sm-0">
                <div class="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0">
                  <div class="owl-thumbs d-flex flex-row flex-sm-column" data-slider-id="1">
                    <div class="owl-thumb-item flex-fill mb-2 me-2 me-sm-0"><img class="w-100" src="${producto.foto}" alt="${producto.nombre}"></div>
                  </div>
                </div>
                <div class="col-sm-10 order-1 order-sm-2">
                  <div><a class="d-block" href="${producto.foto}" data-lightbox="product-${producto._id}" title="${producto.nombre}"><img class="img-fluid" src="${producto.foto}" alt="${producto.nombre}"></a></div>
                </div>
              </div>
            </div>
            <!-- DETALLES DE PRODUCTOS -->
            <div class="col-lg-6">
              <ul class="list-inline mb-2">
                <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star-half-alt small text-warning"></i></li>
              </ul>
              <h1>${producto.nombre}</h1>
              <p class="text-muted lead">$${producto.precio}.-</p>
              <p class="text-small mb-4">${producto.descripcion}</p>
              <div class="row align-items-stretch mb-4">
                <div class="col-sm-5 pr-sm-0">
                  <div class="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white"><span class="small text-uppercase text-gray me-4 no-select">CANTIDAD</span>
                    <div class="quantity">
                      <button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>
                      <input id="cantidad-detalle-${producto._id}" class="form-control border-0 shadow-0 p-0" type="text" value="1">
                      <button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
                    </div>
                  </div>
                </div>
                <div class="col-sm-3 pl-sm-0"><a id="agregarProducto-${producto._id}-detalle" class="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0">Agregar al carrito</a></div>
              </div><a class="btn btn-link text-dark p-0 mb-4" href="#"><i class="far fa-star me-2"></i>Añadir a favoritos</a><br>
              <ul class="list-unstyled small d-inline-block">
                <li class="px-3 py-2 mb-1 bg-white"><strong class="text-uppercase">id: </strong><span class="ms-2 text-muted">${producto._id}</span></li>
                <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">Categoria: </strong><a class="reset-anchor ms-2" href="#">${producto.categoria}</a></li>
              </ul>
            </div>`;

        //Selector de cantidades.
        QuantityEvent(detalle);
    //Asociamos el evento a botón recién creado.
    document.querySelector(`#agregarProducto-${producto._id}-detalle`).addEventListener("click", async ()=>{
      const cantidad = parseInt(document.querySelector(`#cantidad-detalle-${producto._id}`).value);
      await addProductCartAPI(producto._id, cantidad);
      await renderSidebarCart();
  })
}

const getData = async ()=>{
  //Obtenemos por LocalStorage del ultimo producto clickeado...
  let idProd = localStorage.getItem("detalle-id");
  let producto = await getProductByIdFromAPI(idProd);
  renderDetalle(producto);
}

getUserDataFromAPI().then(res => {
  renderPerfilUsuario(currentUser);
  getData();
});