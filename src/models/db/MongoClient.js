import mongoose from "mongoose";
import logger from "../../utils/logger.js";
import DBClient from "./DBClient.class.js";
import config from "../../config/config.js";

class MongoClient extends DBClient {
  constructor() {
    super();
    this.client = mongoose;
  }

  async connect() {
    try {
      this.client.connect(config.URLMongo, (err, res)=>{
        if (err) throw err;
        return logger.info("Mongo Database connected");
      })
    } catch (err) {
        throw {message: 'Error in connecting MongoDB', status: 500};
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();

      logger.info("Database disconnected");
    } catch (err) {
        throw {message: 'Error in disconnecting MongoDB', status: 500};
    }
  }
}

export default MongoClient;