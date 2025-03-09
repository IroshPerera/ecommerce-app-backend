import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    qty: {
        type: Number,
        required: true,
        default: 0,
    },

    description: {
        type: String,
        required: false,
    },

    category: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: false,
    },
    
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;