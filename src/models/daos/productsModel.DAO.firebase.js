import { FirebaseContainer } from "./containers/container.DAO.firebase.js";

let instance = null;

class ProductDAO extends FirebaseContainer {
    constructor(){
        super("products");
    }

    static getInstance(){
        if(!instance){
            instance = new ProductDAO();
        }
        
        return instance;
    }
}

export default ProductDAO;