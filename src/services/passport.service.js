import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import DAOFactory from "../models/daos/DAOFactory.js";
import userDTO from "../models/dtos/user.DTO.js";
import cartsService from "./carts.service.js";
import logger from "../utils/logger.js";

const usersDAO = DAOFactory.createDao("user", config.DATABASE);

const isValidPassword = (password, encPassword) =>{
    const isValid = bcrypt.compareSync(password, encPassword);
    return isValid;
}

passport.use("login", new LocalStrategy(
    { usernameField: "email"},
    async (email, password, done) => {
        try {
            const userDAO = await usersDAO.getByEmail(email.toLowerCase());

            if (!userDAO || !isValidPassword(password, userDAO.password)) return done(null, false);

            let user;
            
            //Si el usuario no tiene carrito asignado al ingresar, se crea uno y se le asigna mediante el cartsService.
            //Luego se vuelve a obtener el usuario ahora si con su nuevo carrito asignado.
            if (!userDAO.currentCart){
                await cartsService.createCart(userDAO._id);
                user = await usersDAO.getById(userDAO._id);
                user = new userDTO(user);
            } else{
                //Si el user ya tenia un carrito asignado, solo devolvemos el DTO del usuario que recuperamos en primera instancia.
                user = new userDTO(userDAO);
            }
    
            return done(null, user);
        } catch (error) {
            logger.error(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.email);
});
passport.deserializeUser(async (email, done) => {
    let user = await usersDAO.getByEmail(email);
    user = new userDTO(user);
    done(null, user);
});

export default passport;