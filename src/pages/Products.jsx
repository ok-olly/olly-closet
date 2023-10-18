import { useLoaderData, useParams } from "react-router-dom";
import SubCategory from "../ui/SubCategory";
import Brand from "../ui/Brand";
import {
  getBrands,
  getProducts,
  getProductsByFilters,
} from "../services/apiProducts";
import Card from "../ui/Card";
import styled from "styled-components";
import { useState } from "react";

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

  const maxPrice = womenItems.reduce((acc, item) => {
    let price = item.fullPrice - item.discount;
    if (price > acc) acc = price;
    return acc;
  }, 0);

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);
  const filters = { selectedBrand, selectedPrice };
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("selectedBrand", selectedBrand);
    const filteredData = await getProductsByFilters(filters);
    setFilteredProducts(filteredData);
  }

  return (
    <>
      {categoryId === "brand" ? (
        <Brand brands={sortedBrands} />
      ) : (
        <SubCategory categoryId={categoryId} />
      )}

      <Container>
        <LeftSide>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h3>Filter</h3>

            <div>
              <h4>by brand</h4>
              {sortedBrands.map((brand) => (
                <div key={brand.id}>
                  <input
                    type="checkbox"
                    value={brand.id}
                    onChange={(e) => {
                      setSelectedBrand(
                        e.target.checked
                          ? [...selectedBrand, e.target.value]
                          : selectedBrand.filter(
                              (brand) => brand !== e.target.value
                            )
                      );
                    }}
                  />
                  <label>{brand.title}</label>
                </div>
              ))}
            </div>

            <div>
              <h4>by price</h4>
              <div>
                <span>0</span>
                <input
                  type="range"
                  value={selectedPrice}
                  min={0}
                  max={maxPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                />
                <span>{selectedPrice}</span>
              </div>
            </div>

            <button>apply</button>
          </form>
        </LeftSide>

        <RightSide>
          {categoryId === "women" &&
            (filteredProducts.length > 0
              ? filteredProducts.map((product) => (
                  <Card product={product} key={product.id} />
                ))
              : womenItems.map((item) => (
                  <Card product={item} key={item.id} />
                )))}

          {categoryId === "men" &&
            (filteredProducts.length > 0
              ? filteredProducts.map((product) => (
                  <Card product={product} key={product.id} />
                ))
              : menItems.map((item) => <Card product={item} key={item.id} />))}
        </RightSide>
      </Container>
    </>
  );
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
