import MongoClient from "./MongoClient.js";
import FirebaseClient from "./FirebaseClient.js";

class DBFactory {
    static createDBclient(databaseName) {
      if (databaseName == "mongoDB") {
        return new MongoClient();
      } else if (databaseName == "firebase") {
        return new FirebaseClient();
      }else{
        throw {
          message: `Error in DBFactory, ${databaseName} not exist`,
          status: 500,
        };
      }
    }
  }
  
  export default DBFactory;
  