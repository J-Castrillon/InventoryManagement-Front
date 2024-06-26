import { InferInput } from "valibot";
import { ProductSchema, ProductsSchema } from "../schemas";

// Se utiliza inferOutput cuando la salida de la validación puede contener
// Modificaciones de un dato, como conversiones de strings a números por ejemplo; 
export type ProductsType = InferInput<typeof ProductsSchema>
export type ProductType = InferInput<typeof ProductSchema>