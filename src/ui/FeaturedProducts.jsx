import styled from "styled-components";
import Card from "./Card";

const StyledFeaturedProducts = styled.div`
  &:not(:last-child) {
    margin-bottom: 10rem;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: min-content;
  gap: 1rem;
`;

function FeaturedProducts({ type, products }) {
  console.log(type, products);

  return (
    <StyledFeaturedProducts>
      {type === "new" && <h2>New Arrivals</h2>}
      {type === "featured" && <h2>Top Sellers</h2>}
      {type === "trending" && <h2>Trending Now</h2>}

      <CardContainer>
        {products.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </CardContainer>
    </StyledFeaturedProducts>
  );
}

export default FeaturedProducts;
