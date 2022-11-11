import { MongoContainer } from "./containers/container.DAO.mongo.js";
import productModel from "../product.model.js";

let instance = null;

class ProductDAO extends MongoContainer {
    constructor(){
        super("product", productModel);
    }

    static getInstance(){
        if(!instance){
            instance = new ProductDAO();
        }
        
        return instance;
    }
    
    async getByCategory(category){
        try {
            const data = await this.model.find({categoria: category});
            return data;
        } catch (error) {
            logger.warn(`error in getting products by category (productsModel.DAO): ${error}`);
            throw {message:'error in getting products', status: 500};
        }
    }
}

export default ProductDAO;