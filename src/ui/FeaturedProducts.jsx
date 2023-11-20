import styled from "styled-components";
import Card from "./Card";

const StyledFeaturedProducts = styled.div`
  margin-top: 10rem;
`;

const Type = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;

  @media ${({ theme }) => theme.device.medium} {
    font-size: 1.7rem;
  }
`;

const ScrollBox = styled.div`
  overflow-x: auto;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: min-content;
  gap: 4rem;

  @media ${({ theme }) => theme.device.medium} {
    width: 952px;
    gap: 2rem;
  }

  @media ${({ theme }) => theme.device.small} {
    width: 800px;
  }

  @media ${({ theme }) => theme.device.mobileLarge} {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
`;

function FeaturedProducts({ type, products }) {
  return (
    <StyledFeaturedProducts>
      {type === "new" && <Type>New Arrivals</Type>}
      {type === "featured" && <Type>discover | 이번 시즌 액세서리</Type>}
      {type === "trending" && <Type>Trending Now</Type>}

      <ScrollBox>
        <CardContainer>
          {products.map((product) => (
            <Card product={product} key={product.id} />
          ))}
        </CardContainer>
      </ScrollBox>
    </StyledFeaturedProducts>
  );
}

export default FeaturedProducts;
