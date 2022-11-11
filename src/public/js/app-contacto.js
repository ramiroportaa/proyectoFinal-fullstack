//Guardamos en variables los nodos a utilizar.
const form = document.querySelector("form");
const inputs = document.querySelectorAll(".iContacto");
//Creamos una variable bandera.
let bandera = false;
//Modificamos el comportamiento tipico del submit del formulario.
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    inputs.forEach((input)=>{
        (input.value != "" ) ? (bandera = true) : (bandera = false);
    })
    //Si todos los campos estan completos, se ejecuta sweet alert y se reseta el formulario.
    if (bandera){
        Swal.fire({
            title: `<strong>¡Gracias por contactarte!</strong>`,
            icon: 'success',
            html:
              `Te responderemos tan pronto como podamos` ,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            timer: 3000
          });
        form.reset();
    }else{
        //Si hay algun input vacio, se coloca el borde rojo.
        inputs.forEach((input)=>{
            if(input.value == ""){
                input.classList.add("border", "border-danger")
            }
        })
        alertaInfo("DEBES COMPLETAR TODOS LOS CAMPOS")
    }
})
//Recorremos cada input del form para escuchar los cambios y en caso de estar vacios, agregar borde rojo.
inputs.forEach((input)=>{
    input.addEventListener("change", ()=>{
        if(input.value != ""){
            input.classList.remove("border", "border-danger")
        }else{
            input.classList.add("border", "border-danger")            
        }
    })
})