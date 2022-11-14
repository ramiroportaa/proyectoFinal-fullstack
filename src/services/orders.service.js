import config from "../config/config.js";
import DAOFactory from "../models/daos/DAOFactory.js";
import OrderDTO from "../models/dtos/order.DTO.js";

const ordersDAO = DAOFactory.createDao("order", config.DATABASE);

const getOrdersByEmail = async (email)=>{
    try {
        const orders = await ordersDAO.getOrdersByEmail(email);
        return orders;
        
    } catch (error) {
        throw error;
    }
};

const createOrder = async (productsFromCart, email)=>{
    try {
        const id = await ordersDAO.getNextId();
        const orderDTO = new OrderDTO(id, email, productsFromCart);

        const data = await ordersDAO.add(orderDTO);

        return data;

    } catch (error) {
        throw error;
    }
};


export default {
    getOrdersByEmail,
    createOrder
}