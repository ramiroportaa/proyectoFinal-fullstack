import messagesService from "../services/messages.service.js";
import WSresponse from "../libs/WSresponse.js";

const getMessagesByEmail = async (req, res)=>{
    try {
        const email = req.params.email;
        const data = await messagesService.getMessagesByEmail(email);
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    } 
};

const insertMessage = async (req, res)=>{
    try {
        const email = req.body.email;
        const text = req.body.text;
        const tipo = (req.user.role == "admin") ? "server" : "user";
        const data = await messagesService.insertMessage(email, text, tipo);
        res.status(201).json(new WSresponse(data, "message sent successfully"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const deleteById = async (req, res)=>{
    try {
        const idMessage = req.params.id;
        await messagesService.deleteById(idMessage);
        res.status(200).json(new WSresponse(null, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

export const wsChatController = async (socket) => {
        
    if (!socket.request.isAuthenticated()){
        return socket.emit("server:error", "DEBES INICIAR SESION PARA USAR EL CHAT");
    }

    let email = socket.request.user.email;
    socket.join(`${email}`);

    const messagesLog  = await messagesService.getMessagesByEmail(email);

    socket.emit("server:messages", messagesLog);

    socket.on("client:newMessage", async (data) => {
        data.tipo = (socket.request.user.role == "admin" && socket.request.user.email != email) ? "server" : "user";
        const message = await messagesService.insertMessage(email, data.text, data.tipo);
        socket.to(email).emit("server:NewMessage", message);
        socket.emit("server:NewMessage", message);
    })

    socket.on("client:admin", async (data) => {
        if (!socket.request.user.role == "admin"){
            return socket.emit("server:error", "No eres administrador");
        }
        email = data.customerEmail;
        socket.join(`${email}`);
        const messagesLog = await messagesService.getMessagesByEmail(email);
        socket.emit("server:messages", messagesLog);
        
    })

}

export default {
    getMessagesByEmail,
    insertMessage,
    deleteById
}