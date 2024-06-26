import { array, boolean, number, object, string } from "valibot";

export const DraftProductSchema = object({
    name: string(), 
    price: number(),
})

export const ProductSchema = object({
    id: number(), 
    name: string(), 
    price: number(),
    available: boolean()
})

export const ProductsSchema = array(ProductSchema);

export const DeleteProduct = object({
    status: string(), 
    message: string(),
})