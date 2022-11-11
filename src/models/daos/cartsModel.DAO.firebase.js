import { FirebaseContainer } from "./containers/container.DAO.firebase.js";

let instance = null;

class CartDAO extends FirebaseContainer {
    constructor(){
        super("carts");
    }

    static getInstance(){
        if(!instance){
            instance = new CartDAO();
        }

        return instance;
    }
}

export default CartDAO;