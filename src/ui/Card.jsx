import { Link } from "react-router-dom";
import styled from "styled-components";
import { setCurrency } from "../services/helper";

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

const BrandTitle = styled.h3`
  font-weight: 500;
  font-size: 1.8rem;
  text-transform: uppercase;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
    price,
  } = product;
  const percentage = Math.ceil((discount / fullPrice) * 100);

  return (
    <Link to={`/productdetail/${id}`}>
      <ImgContainer>
        <Img src={img1} />
        <Img src={img2} />
      </ImgContainer>

      <BrandTitle>{brandTitle}</BrandTitle>
      <p>{productTitle}</p>

      <PriceContainer>
        {discount > 0 ? (
          <div>
            <FullPrice>{setCurrency(fullPrice)}</FullPrice>
            <Percentage>{percentage}% OFF</Percentage>
          </div>
        ) : (
          <br />
        )}
        <p>{setCurrency(price)}</p>
      </PriceContainer>
    </Link>
  );
}

export default Card;
