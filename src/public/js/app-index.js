//Animacion de bienvenida
function fadeOutEffect(fadeTarget, ms) {
    const fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            fadeTarget.classList.add("d-none");
            clearInterval(fadeEffect);
        }
    }, ms);
}
document.addEventListener("DOMContentLoaded", ()=>{
    const fadeTarget = document.getElementById("bienvenida");
    fadeOutEffect(fadeTarget, 100);
})