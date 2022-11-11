import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    timestamp: {type: Number, require: true},
    nombre: {type: String, require: true},
    descripcion: String,
    codigo: String,
    foto: String,
    precio: {type: Number, require: true},
    stock: {type: Number, require: true},
    categoria: String
});

const productModel = mongoose.model("product", productSchema);

export default productModel;