import config from "../config/config.js";
import DAOFactory from "../models/daos/DAOFactory.js";

const productsDAO = DAOFactory.createDao("product", config.DATABASE);

const getAll = async (sort = {}) => {
    try {
        const products = await productsDAO.getAll(sort);
        return products;
    } catch (error) {
        throw error;
    }
};

const getByCategory = async (category, sort = {}) => {
    try {
        const products = await productsDAO.getByCategory(category, sort);
        return products;
    } catch (error) {
        throw error;
    }
};

const getById = async (idProd)=>{
    try {
        const product = await productsDAO.getById(idProd);
        if (!product) throw {message: `no product with ID: ${idProd}`, status: 404};
        return product;
    } catch (error) {
        throw error;
    }
};

const add = async (product)=>{
    try {
        const data = await productsDAO.add(product);
        return data;
    } catch (error) {
        throw error;
    }
};

const updateById = async (idProd, newDataObj)=>{
    try {
        let product = {};
        const prodArray = Object.entries(newDataObj);
        prodArray.forEach(entries =>{
            if (entries[1]){
                product[entries[0]] = entries[1];
            }
        })
        await productsDAO.updateOne(idProd, product);
    } catch (error) {
        throw error;
    }
};

const deleteById = async (idProd)=>{
    try {
        await productsDAO.deleteById(idProd);
    } catch (error) {
        throw error;
    }
};

export default {
    getAll,
    getByCategory,
    getById,
    add,
    updateById,
    deleteById
}