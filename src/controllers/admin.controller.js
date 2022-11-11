import logger from "../utils/logger.js";


const getPanel = (req, res)=>{
    try {
        const user = req.user;
        res.render("admin.ejs", user);
    } catch (error) {
        logger.warn(error);
    }

}

const getProducts = (req, res)=>{
    try {
        const user = req.user;
        res.render("admin-productos.ejs", user);
    } catch (error) {
        logger.warn(error);
    }

}

const getForm = (req, res)=>{
    try {
        const user = req.user;
        res.render("admin-form.ejs", user);
    } catch (error) {
        logger.warn(error);
    }
}

const getChat = (req, res)=>{
    try {
        const user = req.user;
        res.render("admin-chat.ejs", user);
    } catch (error) {
        logger.warn(error);
    }

}

export default {
    getPanel,
    getProducts,
    getForm,
    getChat
}