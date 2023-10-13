import { useLoaderData } from "react-router-dom";
import { getProducts } from "../services/apiProducts";

function Home() {
  const products = useLoaderData();
  console.log("the products", products);
  return <div>HOME</div>;
}

export async function loader() {
  const products = await getProducts();
  return products;
}

export default Home;
