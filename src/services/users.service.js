import bcrypt from "bcrypt";
import __dirname from "../dirname.js";
import mailer from "../utils/mailer.js";
import config from "../config/config.js";
import logger from "../utils/logger.js";
import DAOFactory from "../models/daos/DAOFactory.js";
import UserDTO from "../models/dtos/user.DTO.js";

const usersDAO = DAOFactory.createDao("user", config.DATABASE);

const getById = async (id)=>{
    try {
        if (id == "anonimo") return new UserDTO();
        const user = await usersDAO.getById(id);
        if (!user) throw {message: `no user with ID: ${id}`, status: 404};
        const userDTO = new UserDTO(user);
        return userDTO;
    } catch (error) {
        throw error;
    }
};

const getByEmail = async (email)=>{
    try {
        if (email == "anonimo") return new UserDTO();
        const user = await usersDAO.getByEmail(email);
        if (!user) throw {message: `no user with email: ${email}`, status: 404};
        const userDTO = new UserDTO(user);
        return userDTO;
    } catch (error) {
        throw error;
    }
};

const updateById = async (id, newDataObj)=>{
    try {
        let user = {};
        const userArray = Object.entries(newDataObj);
        userArray.forEach(entries =>{
            if (entries[1]){
                user[entries[0]] = entries[1];
            }
        })
        await usersDAO.updateOne(id, user);
    } catch (error) {
        throw error;
    }
};

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const registerUser = async (user)=>{
    try {
        user.password = createHash(user.password);

        const userDB = await usersDAO.add(user);

        if (!userDB) throw {message: "El usuario o el mail ya están registrados", status: 403};


    
        //Envío de mail con los datos del nuevo registro.
        const mailOptions = {
            from: 'Proyecto backend | Server Node.js',
            to: config.TEST_MAIL,
            subject: 'Nuevo registro',
            html: `<h1 style="color: red;"> ¡SE REGISTRO UN NUEVO USUARIO! </h1>
            <p>Email: ${userDB.email}</p>
            <p>Role: ${userDB.role}</p>
            <p>First name: ${userDB.firstName}</p>
            <p>Last Name: ${userDB.lastName}</p>
            <p>Address: ${userDB.address}</p>
            <p>Age: ${userDB.age}</p>
            <p>Tel: ${userDB.tel}</p>
            <p>Avatar adjunto</p>
            `,
            attachments: [
                {path: __dirname + "/public" + userDB.avatar}
            ]
        }

        try {
            await mailer.sendMail(mailOptions); 
        } catch (error) {
            logger.warn("Error al enviar mail de registro: " + error.message);
        }
    
        return new UserDTO(userDB);

    } catch (error) {
        if (error.status == 403 || error.code == 11000) {
            throw {message: "El usuario o el mail ya están registrados", status: 403};
        } else{
            logger.error(error);
        }
    }
}


export default {
    getByEmail,
    getById,
    registerUser,
    updateById
}