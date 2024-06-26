import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { formatCurrency } from "../helpers/formatCurrency";
import { ProductType } from "../types";
import { deleteProduct } from "../services/ProductService";

export const action = async ({ params }: ActionFunctionArgs) => {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
};

type ProductDetailsProps = {
  product: ProductType;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const isAvailable = product.available;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800 text-center">{product.name}</td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? "text-black" : "text-red-500"
            } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer hover:bg-slate-100`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 text-center ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="bg-slate-700 hover:bg-slate-800 text-white rounded-lg w-full p-2 uppercase font-bold text-sm"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (
                !confirm("¿Está seguro de que quiere eliminar el registro?")
              ) {
                e.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-sm"
            >
              Borrar
            </button>
          </Form>
        </div>
      </td>
    </tr>
  );
};
