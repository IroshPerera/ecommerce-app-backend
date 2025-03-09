export interface CreateProductDTO {
    name: string;
    price: number;
    qty: number;
    description: string;
    categoryId: string;
    images: [string];
}