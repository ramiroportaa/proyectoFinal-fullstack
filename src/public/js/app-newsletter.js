const newsletter = document.querySelector("#newsletter");
const inputNewsletter = document.querySelector("#inputNewsletter");
newsletter.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (inputNewsletter.value != ""){
        Swal.fire({
          title: `<strong>Suscripcion exitosa</strong>`,
          icon: 'success',
          html:
            `Gracias por suscribirte!` ,
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: false,
          focusConfirm: false,
          timer: 2000
        });
    newsletter.reset();
    }
})