import { MongoContainer } from "./containers/container.DAO.mongo.js";
import logger from "../../utils/logger.js";
import userModel from "../user.model.js";

let instance = null;

class UserDAO extends MongoContainer {
    constructor(){
        super("user", userModel);
    }

    static getInstance(){
        if(!instance){
            instance = new UserDAO();
        }
        
        return instance;
    }

    async getByEmail(email){
        try {
            const data = await this.model.findOne({email});
            return data; 
        } catch (error) {
            logger.warn(`error al obtener user por EMAIL: ${error}`);
        }
    }
}

export default UserDAO;