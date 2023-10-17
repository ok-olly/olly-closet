import { useLoaderData } from "react-router-dom";
import { getProductsByFeatures } from "../services/apiProducts";
import Slider from "../ui/Slider";
import FeaturedProducts from "../ui/FeaturedProducts";

function Home() {
  const [{ newItems }, { featuredItems }, { trendingItems }] = useLoaderData();

  return (
    <>
      <Slider />
      <FeaturedProducts type="new" products={newItems} />
      <FeaturedProducts type="featured" products={featuredItems} />
      <FeaturedProducts type="trending" products={trendingItems} />
    </>
  );
}

export async function loader() {
  const newItems = await getProductsByFeatures("isNew");
  const featuredItems = await getProductsByFeatures("isFeatured");
  const trendingItems = await getProductsByFeatures("isTrending");
  const products = [{ newItems }, { featuredItems }, { trendingItems }];
  return products;
}

export default Home;
