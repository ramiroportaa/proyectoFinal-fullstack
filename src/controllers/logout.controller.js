import logger from "../utils/logger.js";
import WSresponse from "../libs/WSresponse.js";

const logout = (req, res)=>{
    if (req.isAuthenticated()){
        const name = req.user.firstName;
        req.logout({}, err => err && logger.error(err));
        return res.status(200).json(new WSresponse(name, "logged out successfully"));
    };

    res.status(400).json(new WSresponse(null, "error, you aren't logged in", true));
}

export default {logout};