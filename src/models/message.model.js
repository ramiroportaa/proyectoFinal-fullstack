import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    email: {type: String, require: true},
    timestamp: {type: Number, require: true},
    text: {type: String, require: true},
    tipo: {type: String, default: "user"},
});

const messageModel = mongoose.model("message", messageSchema);

export default messageModel;