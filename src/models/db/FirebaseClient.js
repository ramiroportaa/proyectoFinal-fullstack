import admin from "firebase-admin";
import mongoose from "mongoose";
import logger from "../../utils/logger.js";
import DBClient from "./DBClient.class.js";
import config from "../../config/config.js";

class FirebaseClient extends DBClient {
  constructor() {
    super();

  }

  async connect() {
    try {
      //No se realiza conexion a firebase aqui ya que de hacerlo da error. La unica manera que encontre es dejandolo en el container.DAO.firebase.
      //Se realiza la conexion a mongo ya que el userDAO solo esta disponible para mongo.
      mongoose.connect(config.URLMongo, (err, res)=>{
        if (err) throw err;
        return logger.info("Mongo Database connected");
      })
    } catch (err) {
        throw {message: 'Error in connecting MongoDB || Firebase', status: 500};
    }
  }

}

export default FirebaseClient;