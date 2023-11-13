import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Home, { loader as HomeLoader } from "./pages/Home";
import Products, { loader as ProductsLoader } from "./pages/Products";
import ProductDetail, {
  loader as ProductDetailLoader,
} from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Error from "./pages/Error";
import MyPage from "./pages/MyPage";
import ProtectedRoute, {
  loader as ProtectedRouteLoader,
} from "./ui/ProtectedRoute";
import Order from "./pages/Order";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

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
      {
        path: "/productdetail/:id",
        element: <ProductDetail />,
        loader: ProductDetailLoader,
      },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        loader: ProtectedRouteLoader,
        children: [
          {
            path: "/mypage",
            element: <MyPage />,
          },
          { path: "/order", element: <Order /> },
        ],
      },
    ],
  },
  { path: "*", element: <Error /> },
]);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router}></RouterProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-neutral-100)",
              color: "var(--color-neutral-950)",
            },
          }}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
