import categoriesService from "../services/categories.service.js";
import WSresponse from "../libs/WSresponse.js";

const getAll = async (req, res)=>{
    try {
        const data = await categoriesService.getAllCategories();
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status || 500).json(new WSresponse(null, error.message, true));
    }
};

const createCategory = async (req, res)=>{
    try {
        const name = req.body.name;
        const data = await categoriesService.createCategory(name);
        res.status(201).json(new WSresponse(data, "success"));        
    } catch (error) {
        return res.status(error.status || 500).json(new WSresponse(null, error.message, true));
    }
};

const deleteCategory = async (req, res)=>{
    try {
        const name = req.params.name;
        await categoriesService.deleteCategory(name);
        res.status(201).json(new WSresponse(null, "success"));
    } catch (error) {
        return res.status(error.status || 500).json(new WSresponse(null, error.message, true));
    }
};

export default {
    getAll,
    createCategory,
    deleteCategory
}