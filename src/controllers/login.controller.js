import __dirname from "../dirname.js";
import WSresponse from "../libs/WSresponse.js";

const postLogin = (req, res)=>{
    if (req.user.role == "admin") return res.redirect("/admin");
    res.status(200).json(new WSresponse(req.user, "logged in successfully"));
}

export default {
    postLogin
}