import { useLoaderData } from "react-router-dom";
import { getSingleProduct } from "../services/apiProducts";
import styled from "styled-components";
import { setCurrency } from "../services/helper";
import Button from "../ui/Button";

const Container = styled.div`
  display: flex;
  gap: 2rem;
`;

const LeftSide = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  img {
    width: 42rem;
    height: 100%;
    object-fit: cover;
  }
`;

const RightSide = styled.div`
  flex: 1;
  background-color: var(--color-neutral-100);
  padding: 1rem;
  height: 100%;
  position: sticky;
  top: 11rem;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const H4 = styled.h4`
  color: var(--color-neutral-500);
  font-size: 1.3rem;
  font-weight: 300;
`;

const H3 = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
`;

const H2 = styled.h2`
  font-size: 1.6rem;
  font-weight: 300;
`;

const FullPrice = styled.span`
  text-decoration: line-through;
  color: var(--color-neutral-400);
`;

const Percentage = styled.span`
  margin-left: 1rem;
  color: var(--color-red-600);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DescContainer = styled.div`
  line-height: 1.8;
`;

function ProductDetail() {
  const [
    {
      brand,
      id,
      title,
      img1,
      img2,
      img3,
      img4,
      desc,
      discount,
      fullPrice,
      price,
      isNew,
      isTrending,
    },
  ] = useLoaderData();
  const { id: brandId, title: brandTitle } = brand;

  const percentage = Math.ceil((discount / fullPrice) * 100);

  return (
    <Container>
      <LeftSide>
        <img src={img1} />
        <img src={img2} />
        <img src={img3} />
        <img src={img4} />
      </LeftSide>
      <RightSide>
        <div>
          {isNew ? (
            <H4>New Season</H4>
          ) : isTrending ? (
            <H4>Trending</H4>
          ) : (
            <br />
          )}
          <H3>{brandTitle}</H3>
          <H2>{title}</H2>
        </div>

        <div>
          {discount > 0 ? (
            <>
              <FullPrice>{setCurrency(fullPrice)}</FullPrice>
              <Percentage>{percentage}% OFF</Percentage>
            </>
          ) : (
            <br />
          )}
          <p>{setCurrency(price)}</p>
        </div>

        <ButtonContainer>
          <Button color="green">장바구니에 담기</Button>
          <Button color="yellow">바로 구매</Button>
        </ButtonContainer>

        <hr />

        <DescContainer>
          {desc.split(",").map((el) => (
            <p key={el}>{el}</p>
          ))}
        </DescContainer>
      </RightSide>
    </Container>
  );
}

export async function loader({ params }) {
  const productDetail = await getSingleProduct(params.id);
  return productDetail;
}

export default ProductDetail;
