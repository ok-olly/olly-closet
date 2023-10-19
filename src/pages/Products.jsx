import { useLoaderData, useParams } from "react-router-dom";
import SubCategory from "../ui/SubCategory";
import Brand from "../ui/Brand";
import { getBrands, getProducts } from "../services/apiProducts";
import Card from "../ui/Card";
import styled from "styled-components";
import { useState } from "react";
import Filter from "../ui/Filter";

const Container = styled.div`
  display: flex;
  gap: 4rem;
  width: 100%;
`;

const LeftSide = styled.div`
  background-color: var(--color-neutral-200);
  flex: 0 0 20%;
`;

const RightSide = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 4rem;
`;

function Products() {
  const { id: categoryId } = useParams();
  const [{ womenItems }, { menItems }, { sortedBrands }] = useLoaderData();

  const [filteredProducts, setFilteredProducts] = useState([]);

  if (categoryId === "women") {
    return (
      <>
        <SubCategory categoryId={categoryId} />
        <Container>
          <LeftSide>
            <Filter
              sortedBrands={sortedBrands}
              products={womenItems}
              categoryId={categoryId}
              setFilteredProducts={setFilteredProducts}
            />
          </LeftSide>
          <RightSide>
            {typeof filteredProducts === "string" ? (
              <span>{filteredProducts}</span>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card product={product} key={product.id} />
              ))
            ) : (
              womenItems.map((item) => <Card product={item} key={item.id} />)
            )}
          </RightSide>
        </Container>
      </>
    );
  }

  if (categoryId === "men")
    return (
      <>
        <SubCategory categoryId={categoryId} />
        <Container>
          <LeftSide>
            <Filter
              sortedBrands={sortedBrands}
              products={menItems}
              categoryId={categoryId}
              setFilteredProducts={setFilteredProducts}
            />
          </LeftSide>
          <RightSide>
            {typeof filteredProducts === "string" ? (
              <span>{filteredProducts}</span>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card product={product} key={product.id} />
              ))
            ) : (
              menItems.map((item) => <Card product={item} key={item.id} />)
            )}
          </RightSide>
        </Container>
      </>
    );

  if (categoryId === "brand") return <Brand brands={sortedBrands} />;
}

export async function loader() {
  const allItems = await getProducts();
  const womenItems = allItems.filter((item) => item.categoryId === 1 && item);
  const menItems = allItems.filter((item) => item.categoryId === 2 && item);
  const brands = await getBrands();
  const sortedBrands = brands.sort((a, b) => (a.title < b.title ? -1 : 1));
  const products = [{ womenItems }, { menItems }, { sortedBrands }];
  return products;
}

export default Products;
