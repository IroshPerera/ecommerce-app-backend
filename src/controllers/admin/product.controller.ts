import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../common/response/ApiResponse";
import productService from "../../service/product.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, qty, description, categoryId, images } = req.body;

        const result = await productService.create({
            name,
            price,
            qty,
            description,
            categoryId,
            images
        });

        const response = new ApiResponse(result, "Product created successfully");
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await productService.findById(id);
        const response = new ApiResponse(result, "Product found");
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

