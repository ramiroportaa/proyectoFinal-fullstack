const socket = io();
const chatBox = document.getElementById("chatBox");
const chatLog = document.getElementById("chatLog");

const initial = async ()=>{
    await getUserDataFromAPI();
    renderPerfilUsuario(currentUser);
}
initial();

const render = (data)=>{
    const div = document.createElement("div");
    const p = document.createElement("p");
    const span = document.createElement("span");
    const spanHour = document.createElement("span");
    div.className = "d-block border border-white mt-1 py-1 px-2 rounded bg-dark";
    div.style.boxShadow = "0 0 5px gray";
    div.style.width = "max-content";
    div.style.maxWidth = "80%";
    span.className = "fw-bold text-decoration-underline";
    p.className = "text-break ps-1";
    spanHour.className = "d-flex justify-content-end fw-light";
    if (data.tipo == "user"){
        div.classList.add("align-self-end");
        span.textContent = `${data.email}: `;
    }else{
        span.textContent = "Server: ";
    }
    p.textContent = `${data.text}`;
    const date = new Date(data.timestamp);
    spanHour.textContent = `${date.getHours()}:${date.getMinutes()<10 ?'0':''}${date.getMinutes()}`;
    div.appendChild(span);
    div.appendChild(p);
    div.appendChild(spanHour);
    chatLog.appendChild(div);
    div.scrollIntoView();
};

socket.on("server:messages", (log)=>{
    log.forEach(data => {
        render(data);
    });
});

socket.on("server:NewMessage", (data)=>{
    render(data);
});

socket.on("server:error", (data)=>{
    Swal.fire({
        title: `<strong>${data}</strong>`,
        icon: 'error',
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ir al login!'
      }).then((res)=>{
        if(res.isConfirmed){
            location.href = "/login.html";
        }
      })
});

chatBox.addEventListener("keyup", (e)=>{
    if (e.key == "Enter" && chatBox.value.trim()){
        const message = chatBox.value;
        socket.emit("client:newMessage", {text: message});
        chatBox.value = "";
        chatBox.focus();
    }
})