import { Link } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Title from "./Title";

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
  /* height: 40rem; */
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

  return (
    <Link to={`/productdetail/${id}`}>
      <ImgContainer>
        <Img src={img1} />
        <Img src={img2} />
      </ImgContainer>

      <Title brandTitle={brandTitle} productTitle={productTitle} />
      <Price discount={discount} fullPrice={fullPrice} price={price} />
    </Link>
  );
}

export default Card;
