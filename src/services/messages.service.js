import config from "../config/config.js";
import DAOFactory from "../models/daos/DAOFactory.js";

const messagesDAO = DAOFactory.createDao("message", config.DATABASE);

const getMessagesByEmail = async (email)=>{
    try {
        const messages = await messagesDAO.getByEmail(email);

        return messages;
        
    } catch (error) {
        throw error;
    }
};

const insertMessage = async (email, text, tipo)=>{
    try {
        const data = await messagesDAO.add({email, text, tipo});
        return data;

    } catch (error) {
        throw error;
    }
};

const deleteById = async (idMessage)=>{
    try {
        await messagesDAO.deleteById(idMessage);
    } catch (error) {
        throw error;
    }
};



export default {
    getMessagesByEmail,
    insertMessage,
    deleteById
}