import { MongoContainer } from "./containers/container.DAO.mongo.js";
import cartModel from "../cart.model.js";

let instance = null;

class CartDAO extends MongoContainer {
    constructor(){
        super("cart", cartModel);
    }

    static getInstance(){
        if(!instance){
            instance = new CartDAO();
        }
        return instance;
    }
}

export default CartDAO;