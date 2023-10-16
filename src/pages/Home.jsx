import { useLoaderData } from "react-router-dom";
import { getProducts } from "../services/apiProducts";
import Slider from "../ui/Slider";
import FeaturedProducts from "../ui/FeaturedProducts";

function Home() {
  const [{ newItems }, { featuredItems }, { trendingItems }] = useLoaderData();

  return (
    <>
      <Slider />
      <FeaturedProducts type="new" products={newItems} />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit ipsa
        minima nulla amet quia repudiandae maiores omnis voluptas? Quibusdam
        tempore sed neque sapiente numquam eveniet enim cumque illum odit!
      </p>
      <FeaturedProducts type="featured" products={featuredItems} />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius odit ipsa
        minima nulla amet quia repudiandae maiores omnis voluptas? Quibusdam
        tempore sed neque sapiente numquam eveniet enim cumque illum odit!
      </p>
      <FeaturedProducts type="trending" products={trendingItems} />
    </>
  );
}

export async function loader() {
  const newItems = await getProducts("isNew");
  const featuredItems = await getProducts("isFeatured");
  const trendingItems = await getProducts("isTrending");
  const products = [{ newItems }, { featuredItems }, { trendingItems }];
  return products;
}

export default Home;
