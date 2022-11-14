import cartsService from "../services/carts.service.js";
import WSresponse from "../libs/WSresponse.js";

const getProducts = async (req, res)=>{
    try {
        const idCart = req.params.id;
        const data = await cartsService.getProducts(idCart);
        res.status(200).json(new WSresponse(data, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    } 
};

const createCart = async (req, res)=>{
    try {
        const data = await cartsService.createCart(req.user.id, req.user.email);
        res.status(201).json(new WSresponse(data, "cart created"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const addProduct = async (req, res)=>{
    try {
        const idCart = req.params.id;
        const idProd = req.body.idProd;
        const quantity = req.body.quantity;  
        await cartsService.addProduct(idCart, idProd, quantity);
        res.status(201).json(new WSresponse(null, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const deleteById = async (req, res)=>{
    try {
        const idCart = req.params.id;
        const idUser = req.user.id;
        const email = req.user.email;
        await cartsService.deleteById(idCart, idUser, email);
        res.status(200).json(new WSresponse(null, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

const deleteProductById = async (req, res)=>{
    try {
        const idCart = req.params.id;
        const idProd = req.params.id_prod;
        await cartsService.deleteProductById(idCart, idProd);
        res.status(201).json(new WSresponse(null, "success"));
    } catch (error) {
        return res.status(error.status).json(new WSresponse(null, error.message, true));
    }
};

export default {
    getProducts,
    createCart,
    addProduct,
    deleteById,
    deleteProductById
}