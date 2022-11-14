//Almacenamos nodos a utuilizar.
const formulario = document.getElementById("form-checkout");
const inputOtroDomicilio = document.getElementById("alternateAddressCheckbox");
const otroDomicilio = document.getElementById("alternateAddress");
const iNombre = document.getElementById("nombre");
const iApellido = document.getElementById("apellido");
const iEmail = document.getElementById("email");
const iTel = document.getElementById("tel");
const iDni = document.getElementById("dni");
const iDomicilio = document.getElementById("domicilio");
const iCiudad = document.getElementById("ciudad");
const iProvincia = document.getElementById("provincia");
const iNombreEnvio = document.getElementById("nombreEnvio");
const iApellidoEnvio = document.getElementById("apellidoEnvio");
const iEmailEnvio = document.getElementById("emailEnvio");
const iTelEnvio = document.getElementById("telEnvio");
const iDniEnvio = document.getElementById("dniEnvio");
const iDomicilioEnvio = document.getElementById("domicilioEnvio");
const iCiudadEnvio = document.getElementById("ciudadEnvio");
const iProvinciaEnvio = document.getElementById("provinciaEnvio");
const orden = document.getElementById("productos");
const infoPost = [];
//Bandera para el evento submit del formulario validado.
let bandera = false;

//======= RESUMEN DE ORDEN ========
const renderOrden = async ()=>{
    //Agregamos al DOM cada producto en la orden.
    await getProductsCartFromAPI();
    let total = 0;
    cart.forEach(producto =>{
        total += (producto.precio * producto.quantity);
        let liProducto = document.createElement("li");
        liProducto.className = "d-flex align-items-center justify-content-between";
        let liSeparador = document.createElement("li");
        liSeparador.className = "border-bottom my-2";
        liProducto.innerHTML = `<strong class="small font-weight-bold">(${producto.quantity})-${producto.nombre}</strong><span class="text-muted small">$${producto.precio*producto.quantity}</span>`;
        orden.appendChild(liProducto);
        orden.appendChild(liSeparador);
    });
    //Recuperamos existencia de descuento desde localSotrage.
    let porcentaje = parseInt(localStorage.getItem("desc"));
    let desc = total*porcentaje/100;
    //Si existe descuento, se calcula y muestra.
    if (porcentaje > 0) {
        let descuento = document.createElement("li");
        descuento.className = "d-flex align-items-center justify-content-between mt-2";
        descuento.innerHTML = `<strong class="text-uppercase small font-weight-bold">Descuento ${porcentaje}%</strong><span>$(${desc})</span>`;
        orden.appendChild(descuento);
    }
    //Se muestra el total.
    let totalLi = document.createElement("li");
    totalLi.className = "d-flex align-items-center justify-content-between mt-2 p-2 bg-dark text-white";
    totalLi.innerHTML = `<strong class="text-uppercase small font-weight-bold">Total</strong><span>$${total-desc}</span>`;
    orden.appendChild(totalLi);
}

//======= FORMULARIO ========
//Mostramos la parte del formulario para envio a otro domicilio en caso de estar activado el checkbox.
(inputOtroDomicilio.checked) ? otroDomicilio.classList.remove("d-none") : otroDomicilio.classList.add("d-none");
inputOtroDomicilio.addEventListener("change",()=>{
    otroDomicilio.classList.toggle("d-none");
});
//Evento submit del formulario.
formulario.addEventListener("submit", async function (e){
    e.preventDefault();
    validarForm();
    if (bandera) {
        await pushDatos();
        postOrden();
        //finalizarOrden();
    };
});
//Funcion de validacion del formulario
function validarForm () {
    //Almacenamos html colection de inputs con la clase "form-input".
    let inputs = document.getElementsByClassName("form-input");
    //Revisamos la primera parte del formulario (los 1ros 8 inputs).
    for (let input = 0; input < 8; input++){
        if (inputs[input].value == ""){
            bandera = false;
            inputs[input].classList.add("border-danger");
            Swal.fire({
                title: '<strong>Hay campos <u>vacios</u></strong>',
                icon: 'info',
                html:
                  `Revise los campos en rojo` ,
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
              });
        } else{
            bandera = true;
        };
        //Borramos la clase border-danger cuando el input tenga algun value.
        inputs[input].addEventListener("change",()=>{
            if (inputs[input].value != ""){
                inputs[input].classList.remove("border-danger");
            }else{
                inputs[input].classList.add("border-danger");
            }
        })
    }
    //Si el checkbox de "enviar a domicilio distinto al de facturacion" esta activo, validamos la 2da parte tambien (los otros 8 campos).
    if (inputOtroDomicilio.checked){
        for (let input = 8; input < 16; input++){
            if (inputs[input].value == ""){
                bandera = false;
                inputs[input].classList.add("border-danger");
                Swal.fire({
                    title: '<strong>Hay campos <u>vacios</u></strong>',
                    icon: 'info',
                    html:
                      `Revise los campos en rojo` ,
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                  });
            }else{
                bandera = true;
            };
            //Borramos la clase border-danger cuando el input tenga algun value.
            inputs[input].addEventListener("change",()=>{
                if (inputs[input].value != ""){
                    inputs[input].classList.remove("border-danger");
                }else{
                    inputs[input].classList.add("border-danger");
                }
            })
        }
    }
    
}
//funcion para pushear los datos de la orden al array "infoPost" que luego sera enviado al servidor.
async function pushDatos(){
    infoPost.push({
        fac_nombre: iNombre.value,
        fac_apellido: iApellido.value,
        fac_email: iEmail.value,
        fac_tel: iTel.value,
        fac_dni: iDni.value,
        fac_domicilio: iDomicilio.value,
        fac_ciudad: iCiudad.value,
        fac_provincia: iProvincia.value,
        envio_nombre: iNombreEnvio.value,
        envio_apellido: iApellidoEnvio.value,
        envio_email: iEmailEnvio.value,
        envio_tel: iTelEnvio.value,
        envio_dni: iDniEnvio.value,
        envio_domicilio: iDomicilioEnvio.value,
        envio_ciudad: iCiudadEnvio.value,
        envio_provincia: iProvinciaEnvio.value
    })
}
//Funcion de POST usando JQUERY.
function postOrden () {
    $.post("/api/order", infoPost[0] , (response, state)=>{
    if (state === "success"){
        Swal.fire({
            title: `<strong>Orden #${response.data._id} enviada</strong>`,
            icon: 'success',
            html: response.message,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            timer: 10000
          }).then(()=>{
              location.href = "/tienda.html";
          });
    }
}).catch(err => alertaInfo(err.responseJSON.message))
}

getUserDataFromAPI().then(res =>{
    renderPerfilUsuario(currentUser);
    renderOrden();
    });