import { useLoaderData, useParams } from "react-router-dom";
import SubCategory from "../ui/SubCategory";
import Brand from "../ui/Brand";
import { getBrands, getProducts } from "../services/apiProducts";
import Card from "../ui/Card";

function Products() {
  const { id: categoryId } = useParams();
  const [{ womenItems }, { menItems }, { brands }] = useLoaderData();

  return (
    <>
      {categoryId === "brand" ? (
        <Brand brands={brands} />
      ) : (
        <SubCategory categoryId={categoryId} />
      )}

      <div className="left">
        <div>
          <h3>Filter by price</h3>
          <div>
            <span>0</span>
            <span>maxprice</span>
          </div>
        </div>
      </div>

      <div className="right">
        {categoryId === "women" &&
          womenItems.map((item) => <Card product={item} key={item.id} />)}
        {categoryId === "men" &&
          menItems.map((item) => <Card product={item} key={item.id} />)}
      </div>
    </>
  );
}

export async function loader() {
  const allItems = await getProducts();
  const womenItems = allItems.filter((item) => item.categoryId === 1 && item);
  const menItems = allItems.filter((item) => item.categoryId === 2 && item);
  const brands = await getBrands();
  const products = [{ womenItems }, { menItems }, { brands }];
  return products;
}

export default Products;
