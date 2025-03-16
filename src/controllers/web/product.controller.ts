import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../common/response/ApiResponse";
import productService from "../../service/product.service";
import { FilterProductDTO } from "../../dto/product.dto";

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

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = "0", perPage = "10", name, price, categoryId } = req.params;

        const filter: FilterProductDTO = {
            page: parseInt(page) || 0,
            perPage: parseInt(perPage) || 10,
            name,
            price: price ? parseInt(price) : undefined,
            categoryId
        };

        const result = await productService.webFindAll(filter);
        const response = new ApiResponse(result, "Products found");
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

