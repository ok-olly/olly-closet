import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../services/helper";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { removeCartItemAsync, resetCartAsync } from "../redux/authReducer";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: var(--color-neutral-100);
  border-radius: 10px;
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2.5rem 0;
`;

const Img = styled.img`
  width: 7.5rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;

const Product = styled.div`
  background-color: var(--color-neutral-0);
  padding: 1rem;
  border-radius: 10px;
  border-bottom: 1px solid var(--color-neutral-300);
  display: grid;
  grid-template-columns: min-content minmax(27rem, 1fr) minmax(5rem, 10rem) 10rem 5rem;
  grid-gap: 2rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    align-self: center;
  }
`;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-top: 1rem;
`;

const TotalContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(5rem, 10rem) 10rem 5rem;
  justify-content: flex-end;
  align-items: center;
  justify-items: center;
  gap: 2rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

function Cart() {
  const products = useSelector((state) => state.auth.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const totalQuantity = products.reduce((acc, item) => acc + item.quantity, 0);

  function handleReset() {
    const answer = confirm("모든 상품을 삭제할까요?");
    if (answer) dispatch(resetCartAsync());
  }

  return (
    <>
      <Heading as="h2">장바구니</Heading>

      <Wrapper>
        <Container>
          {products.map((item) => (
            <Product key={item.id}>
              <Img
                src={item.img1}
                onClick={() => navigate(`/productdetail/${item.id}`)}
              />
              <div>
                <span>
                  {item.brandTitle.toUpperCase()} - {item.title}
                </span>
                <span>{setCurrency(item.price)}</span>
              </div>
              <div>
                <span>수량</span>
                <span>{item.quantity}</span>
              </div>
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

          <SummaryContainer>
            <Button color="red" onClick={handleReset}>
              전체삭제
            </Button>

            <TotalContainer>
              <div>
                <span>총 수량</span>
                <span>{totalQuantity}</span>
              </div>
              <div>
                <span>총 상품 금액</span>
                <span>{setCurrency(totalPrice)}</span>
              </div>
              <Button color="green">주문</Button>
            </TotalContainer>
          </SummaryContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default Cart;
