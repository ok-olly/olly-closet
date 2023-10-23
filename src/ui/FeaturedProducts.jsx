import styled from "styled-components";
import Card from "./Card";

const StyledFeaturedProducts = styled.div`
  &:not(:last-child) {
    margin-bottom: 10rem;
  }
`;

const Type = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: min-content;
  gap: 4rem;
`;

function FeaturedProducts({ type, products }) {
  return (
    <StyledFeaturedProducts>
      {type === "new" && <Type>New Arrivals</Type>}
      {type === "featured" && <Type>discover | 이번 시즌 액세서리</Type>}
      {type === "trending" && <Type>Trending Now</Type>}

      <CardContainer>
        {products.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </CardContainer>
    </StyledFeaturedProducts>
  );
}

export default FeaturedProducts;
