import styled from "styled-components";
import { setCurrency } from "../services/helper";
import Button from "./Button";

const StyledDiv = styled.div`
  background-color: var(--color-neutral-0);
  padding: 1rem;
  border-radius: 10px;
  border-bottom: 1px solid var(--color-neutral-300);
  display: grid;
  grid-template-columns: min-content minmax(27rem, 1fr) minmax(5rem, 10rem) 10rem 8rem;
  grid-gap: 2rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    align-self: center;
    justify-self: center;
  }
`;

const Img = styled.img`
  width: 7.5rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;

function CartProduct({ item, handleRemove }) {
  return (
    <StyledDiv key={item.productId}>
      <Img
        src={item.img1}
        onClick={() => navigate(`/productdetail/${item.productId}`)}
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

      <Button color="yellow" onClick={() => handleRemove(item.productId)}>
        삭제
      </Button>
    </StyledDiv>
  );
}

export default CartProduct;
