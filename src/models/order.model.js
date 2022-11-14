import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    _id: {type: Number, require: true, unique: true},
    email: {type: String, require: true},
    timestamp: {type: Number, require: true},
    productos: {type: Array, require: true},
    state: {type: String, default: 'generada'},
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;