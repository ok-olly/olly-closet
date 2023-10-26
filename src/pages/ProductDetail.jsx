import { useLoaderData } from "react-router-dom";
import { getSingleProduct } from "../services/apiProducts";
import styled from "styled-components";
import { setCurrency } from "../services/helper";
import Button from "../ui/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import toast from "react-hot-toast";

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
  font-size: 1.5rem;
  font-weight: 300;
`;

const H3 = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
`;

const FullPrice = styled.span`
  text-decoration: line-through;
  color: var(--color-neutral-400);
`;

const Percentage = styled.span`
  margin-left: 1rem;
  color: var(--color-red-600);
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DescContainer = styled.div`
  line-height: 1.8;
  font-weight: 300;
  text-transform: lowercase;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DescTitle = styled.p`
  font-weight: 400;
  text-decoration: underline;
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
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

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
          <h2>{title}</h2>
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
          <Button
            color="green"
            onClick={() => {
              dispatch(
                addToCart({
                  id,
                  title,
                  img1,
                  price,
                  quantity,
                })
              );
              toast.success("상품을 장바구니에 담았습니다.");
            }}
          >
            장바구니에 담기
          </Button>
          <Button color="yellow">바로 구매</Button>
        </ButtonContainer>

        <hr />

        <DescContainer>
          <div>
            <DescTitle>상세 정보</DescTitle>
            {desc.split(",").map((el) => (
              <p key={el}>{el}</p>
            ))}
          </div>

          <div>
            <DescTitle>배송 안내</DescTitle>
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
