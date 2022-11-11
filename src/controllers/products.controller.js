import productsService from "../services/products.service.js";
import WSresponse from "../libs/WSresponse.js";

const getAll = async (req, res)=>{
    try {
        const data = await productsService.getAll();
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const getByCategory = async (req, res)=>{
    try {
        const category = req.params.category;
        const data = await productsService.getByCategory(category);
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const getById = async (req, res)=>{
    try {
        const idProd = req.params.id;
        const data = await productsService.getById(idProd);
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const add = async (req, res)=>{
    try {
        const product = req.body;
        const data = await productsService.add(product);
        res.status(201).json(new WSresponse(data, "success"));        
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const updateById = async (req, res)=>{
    try {
        const idProd = req.params.id;
        const newDataObj = req.body;
        await productsService.updateById(idProd, newDataObj);
        res.status(201).json(new WSresponse(null, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const deleteById = async (req, res)=>{
    try {
        const idProd = req.params.id;
        await productsService.deleteById(idProd);
        res.status(201).json(new WSresponse(null, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
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