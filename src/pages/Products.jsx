import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  getBrands,
  getProductsByCategory,
  getSubCategories,
} from "../services/apiProducts";
import Card from "../ui/Card";
import Filter from "../ui/Filter";
import Heading from "../components/Heading";

const Container = styled.div`
  display: flex;
  gap: 4rem;
  width: 100%;

  @media ${({ theme }) => theme.device.large} {
    gap: 2rem;
  }
`;

const LeftSide = styled.div`
  flex: 0 0 20%;

  @media ${({ theme }) => theme.device.medium} {
    flex: 0 1 25%;
  }
`;

const RightSide = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;

  @media ${({ theme }) => theme.device.large} {
    gap: 2rem;
  }

  @media ${({ theme }) => theme.device.medium} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

function Products() {
  const { id: categoryId } = useParams();
  const [
    { productsByCategory: products },
    { sortedBrands: brands },
    { subCategories },
  ] = useLoaderData();
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <>
      <Heading as="h2">{categoryId === "women" ? "여성" : "남성"}</Heading>

      <Container>
        <LeftSide>
          <Filter
            brands={brands}
            products={products}
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
          ) : (
            products.map((item) => <Card product={item} key={item.id} />)
          )}
        </RightSide>
      </Container>
    </>
  );
}

export async function loader({ params }) {
  const categoryId = params.id === "women" ? 1 : 2;
  const productsByCategory = await getProductsByCategory(categoryId);
  const brands = await getBrands();
  const sortedBrands = brands.sort((a, b) => (a.title < b.title ? -1 : 1));
  const subCategories = await getSubCategories();
  const products = [
    { productsByCategory },
    { sortedBrands },
    { subCategories },
  ];
  return products;
}

export default Products;
