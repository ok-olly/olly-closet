import { useState } from "react";
import { getProductsByFilters } from "../services/apiProducts";
import { setCurrency } from "../services/helper";

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

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h3>Filter</h3>

      <div>
        <h4>by subcategory</h4>
        {subCategories.map((sub) => (
          <div key={sub.id}>
            <input
              type="checkbox"
              value={sub.id}
              onChange={(e) => {
                setSelectedSubCategory(
                  e.target.checked
                    ? [...selectedSubCategory, e.target.value]
                    : selectedSubCategory.filter(
                        (sub) => sub !== e.target.value
                      )
                );
              }}
            />
            <label>{sub.title}</label>
          </div>
        ))}
      </div>

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
                    : selectedBrand.filter((brand) => brand !== e.target.value)
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
          <span>₩0</span>
          <input
            type="range"
            value={selectedPrice}
            min={0}
            max={maxPrice}
            onChange={(e) => setSelectedPrice(Number(e.target.value))}
          />
          <span>{setCurrency(selectedPrice)}</span>
        </div>
      </div>

      <button>apply</button>
    </form>
  );
}

export default Filter;
