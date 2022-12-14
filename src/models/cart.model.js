import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    email: {type: String, require: true},
    timestamp: {type: Number, require: true},
    productos: {type: Array, require: true}
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;