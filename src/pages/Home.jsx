import { useLoaderData } from "react-router-dom";
import { getProducts } from "../services/apiProducts";
import Slider from "../ui/Slider";

function Home() {
  const products = useLoaderData();
  console.log("the products", products);

  return (
    <>
      <Slider />
    </>
  );
}

export async function loader() {
  const products = await getProducts();
  return products;
}

export default Home;
