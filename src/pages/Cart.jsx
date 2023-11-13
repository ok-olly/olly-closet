import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../services/helper";
import styled from "styled-components";
import Heading from "../components/Heading";
import { removeCartItemAsync, resetCartAsync } from "../redux/authReducer";
import Button from "../components/Button";
import toast from "react-hot-toast";
import CartProduct from "../ui/CartProduct";
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

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-top: 1rem;
`;

const TotalContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(5rem, 10rem) 10rem 8rem;
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

  function handleRemove(id) {
    dispatch(removeCartItemAsync(id));
    toast.success("상품을 삭제했습니다 😊");
  }

  function handleReset() {
    const answer = confirm("모든 상품을 삭제할까요?");
    if (answer) {
      dispatch(resetCartAsync());
      toast.success("모든 상품을 삭제했습니다 😊");
    }
  }

  return (
    <>
      <Heading as="h2">장바구니</Heading>

      <Wrapper>
        <Container>
          {!products.length ? (
            <span>장바구니에 상품을 담아보세요 🛍️</span>
          ) : (
            <>
              {products.map((item) => (
                <CartProduct
                  key={item.productId}
                  item={item}
                  handleRemove={handleRemove}
                />
              ))}

              <SummaryContainer>
                <Button color="red" onClick={handleReset}>
                  전체삭제
                </Button>

                <span>모든 상품은 무료배송입니다 📦</span>

                <TotalContainer>
                  <div>
                    <span>총 수량</span>
                    <span>{totalQuantity}</span>
                  </div>
                  <div>
                    <span>총 상품 금액</span>
                    <span>{setCurrency(totalPrice)}</span>
                  </div>
                  <Button color="green" onClick={() => navigate("/order")}>
                    주문하기
                  </Button>
                </TotalContainer>
              </SummaryContainer>
            </>
          )}
        </Container>
      </Wrapper>
    </>
  );
}

export default Cart;
