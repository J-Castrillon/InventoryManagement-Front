import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { getProductById, updateProduct } from "../services/ProductService";
import { Error } from "../components/Error";
import { ProductType } from "../types";
import { ProductForm } from "../components/ProductForm";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);

    if (!product) {
      throw new Response("", { status: 404, statusText: "No encontrado" });
    }

    return product;
  }

  return {};
};

// Siempre con los actions, las props son de tipo ActionFunctionArgs;
export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let errors = "";

  if (Object.values(data).includes("")) {
    errors = "Todos los campos son requeridos";
  }

  if (errors.length) {
    return errors;
  }

  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/"); // Como el navigate;
  }
};

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export const EditProduct = () => {
  const errors = useActionData() as string;
  const product = useLoaderData() as ProductType;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl text-slate-500">Editar producto</h1>
        <div className="flex gap-2">
          <Link
            to="/"
            className="rounded-lg bg-slate-700 p-3 text-sm font-bold text-white hover:bg-slate-800 shadow-sm"
          >
            Ver productos
          </Link>
          <Link
            to="/products/new"
            className="rounded-lg bg-slate-700 p-3 text-sm font-bold text-white hover:bg-slate-800 shadow-sm"
          >
            Crear producto
          </Link>
        </div>
      </div>

      {errors && <Error>{errors}</Error>}

      {/* actions data router */}
      <Form className="mt-10" method="POST">
        <ProductForm product={product} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="available">
            Disponibilidad:
          </label>
          <select
            id="available"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="available"
            defaultValue={product?.available.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-slate-700 hover:bg-slate-800 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Actualizar"
        />
      </Form>
    </div>
  );
};
