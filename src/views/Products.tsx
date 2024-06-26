import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/ProductService";
import { ProductDetails } from "../components/ProductDetails";
import { ProductsType } from "../types";

export const loader = async () => {
  // Funciona como el useEffect(); Carga antes de montar el componente;
  const products = await getProducts();

  return products;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData()); // Obtenemos el id del producto a editar;

  await updateAvailability(+data.id);

  return null;
};

export const Products = () => {
  const products = useLoaderData() as ProductsType; // Ya estan listos para mostrar;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl text-slate-500">Productos</h1>
        <Link
          to="/products/new"
          className="rounded-lg bg-slate-700 p-3 text-sm font-bold text-white hover:bg-slate-800 shadow-sm"
        >
          Agregar producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return <ProductDetails key={product.id} product={product} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
