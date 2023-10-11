import { useEffect } from "react";
import { getProducts } from "../services/apiProducts";

function Products() {
  useEffect(function () {
    getProducts().then((data) => console.log(data));
  }, []);

  return <div>PRODUCTS</div>;
}

export default Products;
