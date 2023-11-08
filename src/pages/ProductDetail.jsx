import { useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCartAsync } from "../redux/authReducer";
import { getSingleProduct } from "../services/apiProducts";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Title from "../ui/Title";
import Price from "../ui/Price";
import Heading from "../ui/Heading";
import ButtonContainer from "../ui/ButtonContainer";

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

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const QuantityButton = styled.button`
  border: none;
  font-size: 2rem;
  background-color: var(--color-neutral-0);
  border-radius: 30%;
  padding: 0.3rem 0.3rem 0rem;
`;

const DescContainer = styled.div`
  line-height: 1.7;
  font-weight: 300;
  text-transform: lowercase;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

function ProductDetail() {
  const [
    {
      brand,
      id: productId,
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
  const [quantity, setQuantity] = useState(1);
  const { isLoggedin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    if (!isLoggedin) {
      const answer = confirm("로그인 후 이용해주세요 😊");
      if (!answer) return;
      navigate("/login");
      return;
    }

    const item = {
      productId,
      title,
      img1,
      price,
      quantity,
      brandId,
      brandTitle,
    };
    dispatch(addToCartAsync(item));
    toast.success("장바구니에 상품을 담았습니다.");
  }

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
            <Heading as="h4">New Season</Heading>
          ) : isTrending ? (
            <Heading as="h4">Trending</Heading>
          ) : (
            <br />
          )}
          <Title brandTitle={brandTitle} productTitle={title} />
        </div>

        <Price discount={discount} fullPrice={fullPrice} price={price} />

        <QuantityContainer>
          <QuantityButton
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            <AiOutlineMinus />
          </QuantityButton>
          <span>{quantity}</span>
          <QuantityButton
            onClick={() => setQuantity((prev) => (prev === 3 ? 3 : prev + 1))}
          >
            <AiOutlinePlus />
          </QuantityButton>
        </QuantityContainer>

        <ButtonContainer>
          <Button color="green" onClick={handleClick}>
            장바구니에 담기
          </Button>
          <Button color="yellow">바로 구매</Button>
        </ButtonContainer>

        <hr />

        <DescContainer>
          <div>
            <Heading as="h5">상세 정보</Heading>
            <ul>
              {desc.split(",").map((el) => (
                <li key={el}>{el}</li>
              ))}
            </ul>
          </div>

          <div>
            <Heading as="h5">배송 안내</Heading>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem doloribus esse dolore ipsa natus voluptatibus
            </p>
          </div>
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
