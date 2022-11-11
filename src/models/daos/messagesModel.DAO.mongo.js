import { MongoContainer } from "./containers/container.DAO.mongo.js";
import messageModel from "../message.model.js";
import logger from "../../utils/logger.js";

let instance = null;

class MessageDAO extends MongoContainer {
    constructor(){
        super("message", messageModel);
    }

    static getInstance(){
        if(!instance){
            instance = new MessageDAO();
        }
        return instance;
    }

    async getByEmail(email){
        try {
            const data = await this.model.find({email}).sort({timestamp: 1});
            return data;
        } catch (error) {
            logger.warn(`error in getting messages (messagesModel.DAO): ${error}`);
            throw {message:'error in getting messages', status: 500};
        }
    }
}

export default MessageDAO;