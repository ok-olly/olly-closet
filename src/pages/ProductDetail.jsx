import { useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { addToCartAsync } from "../redux/authReducer";
import { getSingleProduct } from "../services/apiProducts";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Title from "../ui/Title";
import Price from "../ui/Price";
import Heading from "../components/Heading";
import SquareButton from "../components/SquareButton";
import SquareButtonContainer from "../components/SquaredButtonContainer";

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
  transition: all 0.3s ease 0s;

  &:hover {
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    transform: scale(1.1);
  }

  &:active {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
  }
`;

const DescContainer = styled.div`
  line-height: 1.7;
  font-weight: 300;

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
  const item = {
    productId,
    title,
    img1,
    price,
    quantity,
    brandId,
    brandTitle,
  };
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

    dispatch(addToCartAsync(item));
    toast.success("장바구니에 상품을 담았습니다.");
  }

  function handleOrderNow() {
    if (!isLoggedin) {
      const answer = confirm("로그인 후 이용해주세요 😊");
      if (!answer) return;
      navigate("/login");
      return;
    }

    navigate("/order", {
      state: item,
    });
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

        <SquareButtonContainer>
          <SquareButton onClick={handleClick}>장바구니에 담기</SquareButton>
          <SquareButton color="white" onClick={handleOrderNow}>
            바로 구매
          </SquareButton>
        </SquareButtonContainer>

        <hr />

        <DescContainer>
          <div>
            <Heading as="h5">상세 정보</Heading>
            <ul>
              {desc.split(",").map((el) => (
                <li key={el}>{el}</li>
              ))}
            </ul>
            <p>
              모든 제품 사진의 저작권은 개발자에게 있으며 무단 사용을 절대
              금합니다.
            </p>
            <p>
              The copyright of the product photos belongs to the developer.
              Unauthorized use is prohibited.
            </p>
          </div>

          <div>
            <Heading as="h5">배송 안내</Heading>
            <p>전상품 무료배송 📦</p>
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
