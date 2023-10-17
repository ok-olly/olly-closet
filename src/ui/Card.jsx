import { Link } from "react-router-dom";
import styled from "styled-components";

const ImgContainer = styled.div`
  position: relative;

  &:hover {
    Img:first-child {
      z-index: -1;
    }

    Img:last-child {
      z-index: 100;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;

  &:last-child {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  &:first-child {
    z-index: 100;
  }
`;

const BrandTitle = styled.span`
  font-weight: 400;
  text-transform: uppercase;
`;

const FullPrice = styled.span`
  text-decoration: line-through;
  color: var(--color-neutral-400);
`;

const Percentage = styled.span`
  margin-left: 1rem;
  color: var(--color-red-600);
`;

function Card({ product }) {
  const {
    brand: { title: brandTitle },
    id,
    title: productTitle,
    img1,
    img2,
    fullPrice,
    discount,
  } = product;

  const price = fullPrice - discount;
  const percentage = Math.ceil((discount / fullPrice) * 100);

  return (
    <Link to={`/productdetail/${id}`}>
      <ImgContainer>
        <Img src={img1} />
        <Img src={img2} />
      </ImgContainer>

      <BrandTitle>{brandTitle}</BrandTitle>
      <p>{productTitle}</p>

      {discount > 0 ? (
        <>
          <FullPrice>
            {fullPrice.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}
          </FullPrice>
          <Percentage>{percentage}% OFF</Percentage>
        </>
      ) : (
        <br />
      )}
      <p>
        {price.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        })}
      </p>
    </Link>
  );
}

export default Card;
