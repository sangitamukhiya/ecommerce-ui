import { CardTravel } from "@mui/icons-material";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetails";
import ProductList from "../pages/ProductList";

import Carts from "../pages/Carts";
import AuthGuard from "../guard/AuthGuard";
const mainRoutes = [
  {
    Path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductList />,
      },

      {
        path: "about",
        element: <About />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetail />,
      },
      {
        path: "product-edit/:id",
        element: <EditProduct />,
      },
      {
        path: "carts",
        element: <Carts />,
      },
    ],
  },
];

export default mainRoutes;
