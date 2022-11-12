import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    _id: {type: String, require: true, lowercase: true},
});

const cartModel = mongoose.model("categories", categorySchema, "categories");

export default cartModel;