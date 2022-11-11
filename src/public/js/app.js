//Creamos un array para agrupar todos los productos que se ofrecen.
let productos = [];

//Creamos un array para agrupar todos los productos que se añaden al carrito.
let cart = [];

let currentUser;

//Funciones de inteaccion con la API
//Fetch para obtener datos del usuario logueado.
const getUserDataFromAPI = async () => {
  let res = await fetch('/api/user/current');
  res = await res.json();
  if (res.error) return alertaInfo(res.message);
  currentUser = res.data;
};

//Fetchs a /api/productos
//Obtener todos los productos y pushearlos al array de productos.
const getProductsFromAPI = async () => {
  let res = await fetch("/api/productos");
  res = await res.json();
  productos = res.data;
};
//Obtener un solo producto por su ID.
const getProductByIdFromAPI = async (id) => {
  let res = await fetch(`/api/productos/${id}`);
  res = await res.json();
  if (res.error) return alertaInfo(res.message);
  return res.data;
};
//Actualizar un producto pasandole un objeto con las propiedades a cambiar.
const updateProductAPI = async (id, obj) => {
  const productUpdateData = JSON.stringify(obj);
  let res = await fetch(`/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: productUpdateData,
  });
  res = await res.json();
  if (res.error) return alertaInfo(res.message);
  alertaInfo("producto actualizado exitosamente");
};
//crear un producto pasandole un objeto con las propiedades del mismo.
const addProductAPI = async (obj) => {
  const productAddData = JSON.stringify(obj);
  let res = await fetch(`/api/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: productAddData,
  });
  res = await res.json();
  if (res.error) return alertaInfo(res.message);
  alertaInfo("Producto creado exitosamente");
};
//Eliminar un producto por id.
const deleteProductAPI = async (id) => {
  let res = await fetch(`/api/productos/${id}`, {
    method: "DELETE",
  });
  res = await res.json();
  if (res.error) return alertaInfo(res.message);
  alertaInfo("Producto eliminado exitosamente");
};

//Fetchs a /api/carrito
//Obtener los productos existentes en el carrito del usuario y pushearlos al array de cart.
const getProductsCartFromAPI = async () => {
  const id = currentUser.currentCart;
  let res = await fetch(`/api/carrito/${id}/productos`);
  if (res.status == 404 || res.status == 401) {
    await createCartAPI();
    return false;
  }
  res = await res.json();
  if (res.error) {
    alertaInfo(res.message);
    return false;
  }
  cart = res.data;
  return true;
};
//Crear un carrito en la API y obtener su ID.
const createCartAPI = async () => {
  let res = await fetch("/api/carrito", {
    method: "POST",
  });
  res = await res.json();
  if (res.error) return alertaInfo(res.message);
  return res.data;
};
//Eliminar un carrito completo de la API.
const deleteCartAPI = async () => {
  const id = currentUser.currentCart;
  let res = await fetch(`/api/carrito/${id}`, {
    method: "DELETE",
  });
  res = await res.json();
  if (res.error) return alertaInfo(res.message);
  alertaInfo("Carrito eliminado exitosamente");
};
//Agregar un producto al carrito en la API.
const addProductCartAPI = async (idProd, quantity = 1) => {
  try {
    const idC = currentUser.currentCart;
    const obj = {
      idProd: idProd,
      quantity: quantity,
    };
    let res = await fetch(`/api/carrito/${idC}/productos`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    if (res.error) return alertaInfo(res.message);
    alertaInfo("Producto agregado al carrito exitosamente");
  } catch (error) {
    alertaInfo(error.message);
  }
};
//Eliminar un producto de un carrito en la API.
const deleteProductCartAPI = async (idP) => {
  const idC = currentUser.currentCart;
  let res = await fetch(`/api/carrito/${idC}/productos/${idP}`, {
    method: "DELETE",
  });
  res = await res.json();
  if (res.error) return alertaInfo(res.message);
  alertaInfo("Producto eliminado exitosamente del carrito");
};

const renderPerfilUsuario = (user)=>{
  const html = `
  <div class="ms-4 d-flex flex-column" style="width: 150px;">
  <img src="${user.avatar}"
    alt="${user.firstName}" class="img-fluid img-thumbnail mt-4 mb-2"
    style="width: 150px; z-index: 1">
  <!-- <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
    style="z-index: 1;">
    Edit profile
  </button> -->
</div>
<div class="ms-4">
  <h5> ${user.firstName} ${user.lastName}</h5>
  <p> ${user.email} </p>
  <p>ROL: ${user.role} </p>
</div>
<div class="d-block m-auto me-0"></div>
<a class="btn btn-success text-white me-3" href="/chat.html" role="button">CHAT!</a>
  ${(user.role == "invitado") ? `<a class="btn btn-primary text-white" href="/login.html" role="button">Login</a>` 
  : `<a class="btn btn-warning text-white" href="/logout.html" role="button">Desloguear</a>`
  }
</div>`

perfilUsuario.innerHTML = html;
}

//Funciones para cambiar la clase del dialogoInfo luego de 2 segundos... Estas funciones son llamadas al hacer ejecutar la funcion "comprar".
const dialogoInfo = document.getElementById("dialogoInfo");
function verAlerta() {
  dialogoInfo.classList.toggle("dialogoInfo-active");
}
let identificadorDeTemporizador;
function temporizadorAlerta() {
  identificadorDeTemporizador = setTimeout(verAlerta, 2000);
}
function alertaInfo(contenidoHTML) {
  dialogoInfo.innerHTML = contenidoHTML;
  verAlerta();
  temporizadorAlerta();
}
