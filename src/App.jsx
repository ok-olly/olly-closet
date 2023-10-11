import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/products/:id", element: <Products /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
