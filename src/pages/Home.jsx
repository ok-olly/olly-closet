import { useLoaderData } from "react-router-dom";

import { getProductsByFeatures } from "../services/apiProducts";

import Slider from "../ui/Slider";
import FeaturedProducts from "../ui/FeaturedProducts";

const images = [
  "slider/nassim-boughazi-4frKet-PJss-unsplash.jpg",
  "slider/laura-chouette-9gzSVDpyxPg-unsplash.jpg",
  "slider/tamara-bellis-IwVRO3TLjLc-unsplash.jpg",
  "slider/tamara-bellis-nOnT17lKYz8-unsplash.jpg",
];

function Home() {
  const [{ newItems }, { featuredItems }, { trendingItems }] = useLoaderData();

  return (
    <>
      <Slider images={images} autoSliding={true} />
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
