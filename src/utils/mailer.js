import {createTransport} from "nodemailer";
import config from "../config/config.js";

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: config.TEST_MAIL,
        pass: config.PASS_MAIL
    }
});

export default transporter;