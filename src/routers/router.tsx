import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Products, loader as productLoader, action as updateAvailabilityAction } from "../views/Products";
import { NewProduct, action as actionNewProduct } from "../views/NewProduct";
import {
  EditProduct,
  loader as editProductLoader,
  action as editProductAction,
} from "../views/EditProduct";
import { action as deleteProductAction } from "../components/ProductDetails";

// Data Routers; Otra forma de utilizar el react-router-dom
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productLoader,
        action: updateAvailabilityAction
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: actionNewProduct,
      },
      {
        path: "products/:id/edit",
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
    },
      {
        path: "products/:id/delete",
        action: deleteProductAction
      },
    ],
  },
]);
