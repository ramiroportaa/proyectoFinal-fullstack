import mongoose from "mongoose";

const userSchema = mongoose.Schema({ 
    email: {type: String, require: true, unique: true, lowercase: true},
    password: {type: String, require: true},
    role: {type: String, default: "user"},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    address: {type: String, require: true},
    age: {type: Number, require: true},
    tel: {type: Number, require: true},
    avatar: {type: String, default: "/uploads/avatar-anonimo.jpg"},
    currentCart: {type: String, default: ""}
});

const userModel = mongoose.model("user", userSchema);

export default userModel;