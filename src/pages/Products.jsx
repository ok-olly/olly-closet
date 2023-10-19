import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  getBrands,
  getProducts,
  getSubCategories,
} from "../services/apiProducts";
import Brand from "../ui/Brand";
import Card from "../ui/Card";
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
  const [{ womenItems }, { menItems }, { sortedBrands }, { subCategories }] =
    useLoaderData();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts([]);
  }, [categoryId]);

  return (
    <Container>
      <LeftSide>
        <Filter
          sortedBrands={sortedBrands}
          products={categoryId === "women" ? womenItems : menItems}
          categoryId={categoryId}
          setFilteredProducts={setFilteredProducts}
          subCategories={subCategories}
        />
      </LeftSide>
      <RightSide>
        {typeof filteredProducts === "string" ? (
          <span>{filteredProducts}</span>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card product={product} key={product.id} />
          ))
        ) : categoryId === "women" ? (
          womenItems.map((item) => <Card product={item} key={item.id} />)
        ) : (
          menItems.map((item) => <Card product={item} key={item.id} />)
        )}
      </RightSide>
    </Container>
  );
}

export async function loader() {
  const allItems = await getProducts();
  const womenItems = allItems.filter((item) => item.categoryId === 1 && item);
  const menItems = allItems.filter((item) => item.categoryId === 2 && item);
  const brands = await getBrands();
  const sortedBrands = brands.sort((a, b) => (a.title < b.title ? -1 : 1));
  const subCategories = await getSubCategories();
  const products = [
    { womenItems },
    { menItems },
    { sortedBrands },
    { subCategories },
  ];
  return products;
}

export default Products;
