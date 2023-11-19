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
import Button from "../components/Button";

const Container = styled.div`
  display: flex;
  gap: 4rem;
  width: 100%;

  @media ${({ theme }) => theme.device.large} {
    gap: 2rem;
  }

  @media ${({ theme }) => theme.device.mobileLarge} {
    display: contents;
  }
`;

const ButtonContainer = styled.div`
  position: relative;

  button {
    display: none;

    @media ${({ theme }) => theme.device.mobileLarge} {
      display: block;
      position: absolute;
      top: -6.7rem;
      left: 2rem;
    }
  }
`;

const LeftSide = styled.div`
  flex: 0 0 20%;
  position: relative;

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

  @media ${({ theme }) => theme.device.mobileLarge} {
    &.blur {
      filter: blur(4px);
      transition: all 0.5s;
    }
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Heading as="h2">{categoryId === "women" ? "여성" : "남성"}</Heading>

      <ButtonContainer>
        {isOpen ? (
          <Button
            color="red"
            type="button"
            onClick={() => setIsOpen((v) => !v)}
          >
            필터닫기
          </Button>
        ) : (
          <Button
            color="yellow"
            type="button"
            onClick={() => setIsOpen((v) => !v)}
          >
            필터보기
          </Button>
        )}
      </ButtonContainer>

      <Container>
        <LeftSide>
          <Filter
            brands={brands}
            products={products}
            categoryId={categoryId}
            setFilteredProducts={setFilteredProducts}
            subCategories={subCategories}
            showFilter={isOpen}
            setShowFilter={setIsOpen}
          />
        </LeftSide>

        <RightSide className={isOpen ? "blur" : ""}>
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
