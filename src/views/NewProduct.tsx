import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom";
import { Error } from "../components/Error";
import { addProduct } from "../services/ProductService";
import { ProductForm } from "../components/ProductForm";

// Siempre con los actions, las props son de tipo ActionFunctionArgs;
export const action = async ({request} : ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData());
    
    let errors = ''; 

    if(Object.values(data).includes('')){
        errors = "Todos los campos son requeridos";
    }

    if(errors.length){
        return errors
    }

    await addProduct(data);

    return redirect('/'); // Como el navigate; 
}

export const NewProduct = () => {

    const errors = useActionData() as string;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl text-slate-500">Nuevo producto</h1>
        <Link
          to="/"
          className="rounded-lg bg-slate-700 p-3 text-sm font-bold text-white hover:bg-slate-800 shadow-sm"
        >
          Ver productos
        </Link>
      </div>

      {errors && <Error>{errors}</Error>}

      {/* actions data router */}
      <Form className="mt-10" method="POST">
        <ProductForm/>
        <input
          type="submit"
          className="mt-5 w-full bg-slate-700 hover:bg-slate-800 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </div>
  );
};
