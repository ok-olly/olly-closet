import { RouterProvider, createBrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Home, { loader as HomeLoader } from "./pages/Home";
import Products, { loader as ProductsLoader } from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: HomeLoader,
      },
      {
        path: "/products/:id",
        element: <Products />,
        loader: ProductsLoader,
      },
      { path: "/productdetail/:id", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
    ],
  },
  { path: "*", element: <Error /> },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
