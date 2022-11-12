import { MongoContainer } from "./containers/container.DAO.mongo.js";
import categoryModel from "../category.model.js";

let instance = null;

class CategoryDAO extends MongoContainer {
    constructor(){
        super("category", categoryModel);
    }

    static getInstance(){
        if(!instance){
            instance = new CategoryDAO();
        }
        return instance;
    }
    async deleteByName(name){
        try {
            const data = await this.model.deleteOne({_id: name});
            if (!data.deletedCount) throw {message: `no category with name: ${name}`, status: 404};
        } catch (error) {
            if (error.status == 404) throw error;
            logger.warn(`Mongo model container: error in deleting category: ${error}`);
            throw {message: `error in deleting category`, status: 500};
        }
    }
}

export default CategoryDAO;