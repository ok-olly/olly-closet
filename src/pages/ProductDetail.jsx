import { useLoaderData } from "react-router-dom";
import { getSingleProduct } from "../services/apiProducts";
import styled from "styled-components";
import { useState } from "react";
import { setCurrency } from "../services/helper";

const Container = styled.div`
  display: flex;
  gap: 4rem;
`;

const LeftSide = styled.div`
  display: flex;
  gap: 1rem;
`;

const RightSide = styled.div`
  flex: 1;
  background-color: yellowgreen;
`;

const LeftSideSmall = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 8rem;
  }
`;

const LeftSideBig = styled.div`
  img {
    width: 49rem;
  }
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
    },
  ] = useLoaderData();
  const { id: brandId, title: brandTitle } = brand;
  const [currentImage, setCurrentImage] = useState(img1);

  return (
    <Container>
      <LeftSide>
        <LeftSideSmall className="작은사이즈">
          <img src={img1} onMouseEnter={() => setCurrentImage(img1)} />
          <img src={img2} onMouseEnter={() => setCurrentImage(img2)} />
          <img src={img3} onMouseEnter={() => setCurrentImage(img3)} />
          <img src={img4} onMouseEnter={() => setCurrentImage(img4)} />
        </LeftSideSmall>
        <LeftSideBig className="큰사이즈">
          <img src={currentImage} />
        </LeftSideBig>
      </LeftSide>
      <RightSide>
        <h3>{brandTitle}</h3>
        <h2>{title}</h2>

        <span>{setCurrency(fullPrice)}</span>
        <span>{setCurrency(discount)}</span>
        <span>{setCurrency(price)}</span>

        <p>{desc}</p>
      </RightSide>
    </Container>
  );
}

export async function loader({ params }) {
  const productDetail = await getSingleProduct(params.id);
  return productDetail;
}

export default ProductDetail;
