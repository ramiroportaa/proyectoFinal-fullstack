import { MongoContainer } from "./containers/container.DAO.mongo.js";
import orderModel from "../order.model.js";
import logger from "../../utils/logger.js";

let instance = null;

class OrderDAO extends MongoContainer {
    constructor(){
        super("order", orderModel);
    }

    static getInstance(){
        if(!instance){
            instance = new OrderDAO();
        }
        return instance;
    }

    async getNextId(){
        try {
            const id = await this.model.estimatedDocumentCount();
            return Number(id) + 1;
        } catch (error) {
            logger.warn(`error in getNextId function (ordersModel.DAO.mongo): ${error}`);
            throw {message: 'Server error :(', status: 500};
        } 
    }

    async getOrdersByEmail(email){
        try {
            const data = await this.model.find({email}).sort({timestamp: 1});
            return data;
        } catch (error) {
            logger.warn(`error in getting orders (ordersModel.DAO): ${error}`);
            throw {message:'error in getting orders', status: 500};
        }
    }
}

export default OrderDAO;