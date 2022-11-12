import config from "../config/config.js";
import DAOFactory from "../models/daos/DAOFactory.js";

const categoriesDAO = DAOFactory.createDao("category", config.DATABASE);

const createCategory = async (name)=>{
    try {
        if (typeof(name) != "string") throw {message: `${name} is not a String (text)`, status: 400};
        //En el esquema de categorias, el id es el npmbre. Es el unico atributo de los documentos en la coleccion.
        const data = await categoriesDAO.add({_id: name});
        return data._id;
    } catch (error) {
        throw error;
    }
};

const deleteCategory = async (name)=>{
    try {
        await categoriesDAO.deleteByName(name);
    } catch (error) {
        throw error;
    }
};

const getAllCategories = async ()=>{
    try {
        const data = await categoriesDAO.getAll();
        return data;
    } catch (error) {
        throw error;
    }
};



export default {
    createCategory,
    deleteCategory,
    getAllCategories
}