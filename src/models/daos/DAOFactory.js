import CartsDAOmongo from "./cartsModel.DAO.mongo.js";
import CartsDAOfirebase from "./cartsModel.DAO.firebase.js";
import ProductsDAOmongo from "./productsModel.DAO.mongo.js";
import ProductsDAOfirebase from "./productsModel.DAO.firebase.js";
import UsersDAOmongo from "./usersModel.DAO.mongo.js";
import MessagesDAOmongo from "./messagesModel.DAO.mongo.js";
import CategoriesDAOmongo from "./categoriesModel.DAO.mongo.js";
import logger from "../../utils/logger.js";

class DAOFactory {
  static createDao(name, database) {
    try {
      if (database == "mongoDB") {
        switch (name) {
          case "product": return ProductsDAOmongo.getInstance();
          case "cart": return CartsDAOmongo.getInstance();
          case "user": return UsersDAOmongo.getInstance();
          case "message": return MessagesDAOmongo.getInstance();
          case "category": return CategoriesDAOmongo.getInstance();
          default:
            throw {
              message: `Error in DAOFactory, ${name} DAO not exist`,
              status: 500,
            };
        }
      } else if (database == "firebase") {
        switch (name) {
          case "product": return ProductsDAOfirebase.getInstance();
          case "cart": return CartsDAOfirebase.getInstance();
          case "user": return UsersDAOmongo.getInstance();
          case "message": return MessagesDAOmongo.getInstance();
          case "category": return CategoriesDAOmongo.getInstance();
          default:
            throw {
              message: `Error in DAOFactory, ${name} DAO not exist`,
              status: 500,
            };
        }
      }else{
        throw {
          message: `Error in DAOFactory, ${database} not exist`,
          status: 500,
        };
      }
    } catch (error) {
      logger.error(error.message);
    }

  }
}

export default DAOFactory;
