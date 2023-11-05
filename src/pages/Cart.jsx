import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../services/helper";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { removeCartItemAsync, resetCartAsync } from "../redux/authReducer";

const StyledCart = styled.div`
  max-width: 90rem;
  margin: 0 auto;
`;

// const H2 = styled.h2`
//   font-size: 3rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   text-align: center;
//   margin: 4rem 0;
// `;

const Container = styled.div`
  background-color: var(--color-neutral-200);
`;

const Img = styled.img`
  width: 5rem;
`;

const Product = styled.div`
  border-bottom: 1px solid var(--color-neutral-300);

  div {
    display: flex;
    flex-direction: column;
  }
`;

function Cart() {
  const products = useSelector((state) => state.auth.cart);
  const dispatch = useDispatch();

  const total = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <StyledCart>
      <Heading as="h2">장바구니</Heading>

      <Container>
        {products.map((item) => (
          <Product key={item.id}>
            <Img src={item.img1} />
            <div>
              <span>{item.title}</span>
              <span>{setCurrency(item.price)}</span>
            </div>
            <span>수량 : {item.quantity}</span>
            <div>
              <span>상품 금액</span>
              <span>{setCurrency(item.price * item.quantity)}</span>
            </div>

            <button onClick={() => dispatch(removeCartItemAsync(item.id))}>
              delete
            </button>
          </Product>
        ))}
      </Container>
      <span>{setCurrency(total)}</span>
      <button onClick={() => dispatch(resetCartAsync())}>reset</button>
    </StyledCart>
  );
}

export default Cart;
