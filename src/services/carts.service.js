import CartDTO from "../models/dtos/cart.DTO.js";
import config from "../config/config.js";
import DAOFactory from "../models/daos/DAOFactory.js";

const cartsDAO = DAOFactory.createDao("cart", config.DATABASE);
const productsDAO = DAOFactory.createDao("product", config.DATABASE);
const usersDAO = DAOFactory.createDao("user", config.DATABASE);

const getProducts = async (idCart)=>{
    try {
        const cartData = await cartsDAO.getById(idCart);
        if (!cartData) throw {message: `no cart with ID: ${idCart}`, status: 404};

        //Array para almacenar los productos del carrito a los que se debe actualizar el quantity por ser mayor al stock actual.
        let isUpdateCart = [];

        const productsArray = await Promise.all(cartData.productos.map(async prodInCart => {
            const productDB = await productsDAO.getById(prodInCart.idProd);

            //Revalidación de stock (ya que el mismo puede haber cambiado y en el cart quedo una cantidad mayor).
            if (prodInCart.quantity > productDB.stock){
                prodInCart.quantity = productDB.stock;
                isUpdateCart.push(prodInCart);
            }

            productDB.quantity = prodInCart.quantity;

            return productDB;
        }))

        if (isUpdateCart.length){
            const newProductsCartData = cartData.productos.map(prod =>{
                isUpdateCart.forEach(prodToUpdate => {
                    if (prod.idProd == prodToUpdate.idProd){
                        if (prodToUpdate.quantity == 0) return;
                        return prodToUpdate;
                    } 
                })
                return prod;
            })

            cartsDAO.updateOne(idCart, {productos: newProductsCartData});
        }

        const cart = new CartDTO(cartData, productsArray);

        return cart.productos;
        
    } catch (error) {
        throw error;
    }
};

const createCart = async (userId, email)=>{
    try {
        //Creamos un carrito con 0 productos.
        const data = await cartsDAO.add({productos: [], email});
        //Editamos el valor currentCart del user que lo creo.
        await usersDAO.updateOne(userId, {currentCart: data._id});
        //Devolvemos al cliente el id de carrito creado.
        return data._id;
    } catch (error) {
        throw error;
    }
};

const addProduct = async (idCart, idProd, quantity)=>{

    try {
        const product = await productsDAO.getById(idProd);
        if (!product) throw {message: `no product with ID: ${idProd}`, status: 404};
        const stock = product.stock;

        const cart = await cartsDAO.getById(idCart);
        if (!cart) throw {message: `no cart with ID: ${idCart}`, status: 404};
        const ArrayProducts = cart?.productos;

        const prodInCart = ArrayProducts.find(prod => prod.idProd == idProd);

        quantity = Number(quantity);
        if (quantity == 0) throw {message: "Debes agregar al menos 1 unidad", status: 400};

        if (!prodInCart){
            if (quantity > stock) throw {message: `Stock insuficiente: solo quedan ${stock} unidades`, status: 400};
            ArrayProducts.push({idProd,quantity});
        }else{
            const newQuantity = prodInCart.quantity + quantity;
            if (newQuantity > stock) throw {message: `Stock insuficiente: solo puedes agregar ${stock - prodInCart.quantity} unidades mas`, status: 400};
            prodInCart.quantity = newQuantity;
            ArrayProducts.map(prod =>{
                if (prod.idProd == idProd) return prodInCart;
                return prod;
            })
        }

        await cartsDAO.updateOne(idCart, {productos: ArrayProducts});  

    } catch (error) {
        throw error;
    }
};

const deleteById = async (idCart, idUser, email) =>{
    try {
        await cartsDAO.deleteById(idCart);
        //Creamos un nuevo carrito ya que es necesario para el correcto flujo de la aplicación
        //(Se prefiere crear el nuevo carrito, ni bien se elimina el anterior, desde el back en lugar del front).
        await createCart(idUser, email);
    } catch (error) {
        throw error;
    }
};

const deleteProductById = async (idCart, idProd)=>{
    try {
        const cart = await cartsDAO.getById(idCart);
        if (!cart) throw {message: `no cart with ID: ${idCart}`, status: 404};
        const productos = cart.productos.filter(prod => prod.idProd != idProd);
        await cartsDAO.updateOne(idCart, {productos});
    } catch (error) {
        throw error;
    }
};

export default {
    getProducts,
    createCart,
    addProduct,
    deleteById,
    deleteProductById
}