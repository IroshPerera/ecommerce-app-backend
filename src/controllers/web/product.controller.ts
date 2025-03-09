import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../common/response/ApiResponse";
import productService from "../../service/product.service";

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

