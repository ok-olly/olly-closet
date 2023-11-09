import { useSelector } from "react-redux";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { setCurrency } from "../services/helper";
import OrderForm from "../ui/OrderForm";

const Wrapper = styled.div`
  background-color: var(--color-neutral-100);
  border-radius: 10px;
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2.5rem;
  display: flex;
  gap: 2rem;
`;

const LeftSide = styled.div`
  flex-basis: 35%;
  background-color: var(--color-neutral-0);
  padding: 2rem;
  border-radius: 10px;
`;

const RightSide = styled.div`
  flex: 1;
`;

const Product = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  align-items: center;
`;

const Img = styled.img`
  width: 4rem;
  height: 5.3rem;
  object-fit: cover;
  border-radius: 5px;
`;

const Desc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Summary = styled.div`
  border-top: 1px solid var(--color-neutral-950);
  padding-top: 0.5rem;
`;

function Order() {
  const {
    user_metadata: { address, fullName, phoneNumber, cart },
    email,
  } = useSelector((state) => state.auth.userInfo);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Heading as="h2">주문/결제하기</Heading>

      <Wrapper>
        <Container>
          <LeftSide>
            <Heading as="h3">주문상품</Heading>

            {cart.map((product) => (
              <Product key={product.productId}>
                <Img src={product.img1} />
                <Desc>
                  <p>{product.title}</p>
                  <p>
                    {setCurrency(product.price)} &times; {product.quantity}
                  </p>
                </Desc>
              </Product>
            ))}

            <Summary>
              <p>총 상품 금액 : {setCurrency(totalPrice)}</p>
              <p>총 수량 : {totalQuantity}</p>
            </Summary>
          </LeftSide>

          <RightSide>
            <OrderForm
              address={address}
              fullName={fullName}
              phoneNumber={phoneNumber}
              email={email}
              cart={cart}
            />
          </RightSide>
        </Container>
      </Wrapper>
    </>
  );
}

export default Order;
