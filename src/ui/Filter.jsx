import { useEffect, useState } from "react";
import { getProductsByFilters } from "../services/apiProducts";
import { setCurrency } from "../services/helper";
import styled from "styled-components";
import Button from "./Button";

const Form = styled.form`
  position: sticky;
  top: 11rem;
  background-color: var(--color-neutral-100);
  padding: 2rem 1rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-transform: uppercase;
`;

const CheckboxContainer = styled.div`
  label:hover {
    cursor: pointer;
  }
`;

const InputCheckbox = styled.input`
  margin-right: 0.5rem;
`;

const PriceFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceFilter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

function Filter({
  sortedBrands,
  products,
  categoryId,
  setFilteredProducts,
  subCategories,
}) {
  const [selectedBrand, setSelectedBrand] = useState([]);
  const maxPrice = products.reduce((acc, item) => {
    if (item.price > acc) acc = item.price;
    return acc;
  }, 0);
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);
  const selectedCategory =
    categoryId === "women" ? 1 : categoryId === "men" ? 2 : 3;

  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const filters = {
    selectedBrand,
    selectedPrice,
    selectedCategory,
    selectedSubCategory,
  };

  function handleSingleCheck(field, checked, id) {
    if (field === "sub") {
      if (checked) setSelectedSubCategory((prev) => [...prev, id]);
      else
        setSelectedSubCategory(selectedSubCategory.filter((el) => el !== id));
    }

    if (field === "brand") {
      if (checked) setSelectedBrand((prev) => [...prev, id]);
      else setSelectedBrand(selectedBrand.filter((el) => el !== id));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const filteredData = await getProductsByFilters(filters);
    setFilteredProducts(
      (selectedBrand.length > 0 || selectedSubCategory.length > 0) &&
        filteredData.length === 0
        ? "검색결과가 없습니다"
        : filteredData
    );
  }

  function handleReset() {
    setSelectedBrand([]);
    setSelectedSubCategory([]);
    setSelectedPrice(maxPrice);
    setFilteredProducts([]);
  }

  useEffect(() => {
    handleReset();
  }, [categoryId]);

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <h3>필터</h3>

      <div>
        <h4>by subcategory</h4>
        {subCategories.map((sub) => (
          <CheckboxContainer key={sub.id}>
            <InputCheckbox
              type="checkbox"
              value={sub.id}
              id={sub.title}
              onChange={(e) =>
                handleSingleCheck("sub", e.target.checked, sub.id)
              }
              checked={selectedSubCategory.includes(sub.id)}
            />
            <label htmlFor={sub.title}>{sub.title}</label>
          </CheckboxContainer>
        ))}
      </div>

      <div>
        <h4>by brand</h4>
        {sortedBrands.map((brand) => (
          <CheckboxContainer key={brand.id}>
            <InputCheckbox
              type="checkbox"
              value={brand.id}
              id={brand.title}
              onChange={(e) =>
                handleSingleCheck("brand", e.target.checked, brand.id)
              }
              checked={selectedBrand.includes(brand.id)}
            />
            <label htmlFor={brand.title}>{brand.title}</label>
          </CheckboxContainer>
        ))}
      </div>

      <div>
        <h4>by price</h4>
        <PriceFilterContainer>
          <input
            type="range"
            value={selectedPrice}
            min={0}
            max={maxPrice}
            onChange={(e) => setSelectedPrice(Number(e.target.value))}
          />
          <PriceFilter>
            <span>₩0</span>
            <span>{setCurrency(selectedPrice)}</span>
          </PriceFilter>
        </PriceFilterContainer>
      </div>

      <ButtonContainer>
        <Button color="green">apply</Button>
        <Button color="red" onClick={handleReset}>
          reset
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export default Filter;
