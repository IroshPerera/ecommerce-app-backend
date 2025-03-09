import e from "express";
import { CustomError } from "../common/errors/CustomError";
import { CreateProductDTO } from "../dto/product.dto";
import Product from "../models/product.model";
import Category from "../models/category.model";

class ProductService {
    public async create(product: CreateProductDTO) {
        const { name, price, description, categoryId, images, qty } = product;
        const existingProduct = await Product.findOne({
            name : name
        });

        if (existingProduct) {
            throw new CustomError("Sorry! This product already exists", 400);
        }

        // check if category exists
        const existingCategory = await Category.findOne({
            _id: categoryId
        });
        if (!existingCategory) {
            throw new CustomError("Sorry! This category does not exist", 400);
        }

        const newProduct = new Product({
            name,
            price,
            qty,
            description,
            category: existingCategory._id,
            images
        });

        await newProduct.save();

        const responseProductDTO = {
            id: newProduct._id,
            name: newProduct.name,
            price: newProduct.price,
            qty: newProduct.qty,
            description: newProduct.description,
            category: {
                id: existingCategory._id,
                name: existingCategory.name
            },
            images: newProduct.images
        };
        return responseProductDTO;
    }

}

export default new ProductService();