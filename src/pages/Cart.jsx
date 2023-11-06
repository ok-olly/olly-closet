import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../services/helper";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { removeCartItemAsync, resetCartAsync } from "../redux/authReducer";
import Button from "../ui/Button";

const Wrapper = styled.div`
  background-color: var(--color-neutral-100);
  border-radius: 10px;
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 0 2.5rem;
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
    <>
      <Heading as="h2">장바구니</Heading>

      <Wrapper>
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

              <Button
                color="yellow"
                onClick={() => dispatch(removeCartItemAsync(item.id))}
              >
                삭제
              </Button>
            </Product>
          ))}

          <span>{setCurrency(total)}</span>
          <Button color="red" onClick={() => dispatch(resetCartAsync())}>
            전체삭제
          </Button>
        </Container>
      </Wrapper>
    </>
  );
}

export default Cart;
