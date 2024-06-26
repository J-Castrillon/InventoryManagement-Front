import { safeParse } from "valibot";
import { DeleteProduct, DraftProductSchema, ProductSchema, ProductsSchema } from "../schemas";
import axios from "axios";
import { ProductType } from "../types";
import { toBoolean } from "../helpers/formatCurrency";

type addProductProps = {
  [k: string]: FormDataEntryValue;
};

const url = import.meta.env.VITE_REACT_APP_API_URL;

export const addProduct = async (data: addProductProps) => {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name.toString(),
      price: +data.price,
    });

    if (result.success) {
      await axios.post(`${url}products`, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Not valid data");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const { data } = await axios.get(`${url}products`);

    const result = safeParse(ProductsSchema, data.products);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Ocurrió un error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: ProductType["id"]) => {
  try {
    const { data } = await axios(`${url}products/${id}`);

    const result = safeParse(ProductSchema, data.product);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  product: addProductProps,
  id: ProductType["id"]
) => {
  try {
    const { data } = await axios.put(`${url}products/${id}`, {
      id,
      name: product.name,
      price: +product.price,
      available: toBoolean(product.available.toString())
    });

    const result = safeParse(ProductSchema, data.product);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: ProductType['id']) => {
  try{
    const { data } = await axios.delete(`${url}products/${id}`);

    const result = safeParse(DeleteProduct, data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  }catch(error){
    console.log(error)
  }
}

export const updateAvailability = async (id: ProductType['id']) => {
  try{
    await axios.patch(`${url}products/${id}`);
  }catch(error){
    console.log(error)
  }
}