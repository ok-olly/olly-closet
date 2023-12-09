import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { setCurrency } from "../services/helper";

import Button from "../components/Button";
import Heading from "../components/Heading";

const StyledDiv = styled.div`
  background-color: var(--color-neutral-0);
  padding: 1rem;
  border-radius: 10px;
  border-bottom: 1px solid var(--color-neutral-300);
  display: grid;
  grid-template-columns: min-content minmax(27rem, 1fr) minmax(5rem, 10rem) 10rem 8rem;
  grid-gap: 2rem;

  @media ${({ theme }) => theme.device.medium} {
    grid-template-columns: min-content minmax(23rem, 1fr) minmax(5rem, 7rem) 10rem 8rem;
    grid-gap: 1.5rem;
    margin: 0 1rem;
  }

  @media ${({ theme }) => theme.device.small} {
    grid-template-columns: min-content minmax(23rem, 1fr) 14rem;
    grid-template-areas: "image title button" "image quantity price";
    grid-gap: 1rem;
  }

  @media ${({ theme }) => theme.device.mobileLarge} {
    grid-template-columns: min-content 1fr 6rem;
    grid-template-areas: "image title button" "image quantity button" "image price button";
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${({ theme }) => theme.device.small} {
      flex-direction: row;
      gap: 0.8rem;
    }

    h5 {
      cursor: pointer;

      &:hover,
      &:focus,
      &:active {
        color: var(--color-neutral-400);
      }

      @media ${({ theme }) => theme.device.mobileMedium} {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  button {
    align-self: center;
    justify-self: center;

    @media ${({ theme }) => theme.device.small} {
      grid-area: button;
    }
  }
`;

const Hyphen = styled.span`
  @media ${({ theme }) => theme.device.mobileMedium} {
    display: none;
  }
`;

const Img = styled.img`
  width: 7.5rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;

  @media ${({ theme }) => theme.device.small} {
    grid-area: image;
    width: 6rem;
    height: 8rem;
  }

  @media ${({ theme }) => theme.device.mobileLarge} {
    width: 8rem;
    height: 10.5rem;
  }
`;

const ToggleSpan1 = styled.span`
  @media ${({ theme }) => theme.device.small} {
    display: none;
  }
`;

const ToggleSpan2 = styled.span`
  display: none;

  @media ${({ theme }) => theme.device.small} {
    display: inline;
  }
`;

function CartProduct({ item, handleRemove }) {
  const navigate = useNavigate();

  return (
    <StyledDiv key={item.productId}>
      <Img
        src={item.img1}
        onClick={() => navigate(`/productdetail/${item.productId}`)}
      />
      <div>
        <Heading
          as="h5"
          onClick={() => navigate(`/productdetail/${item.productId}`)}
        >
          <span>{item.brandTitle.toUpperCase()}</span>
          <Hyphen> - </Hyphen>
          <span>{item.title}</span>
        </Heading>
        {/* <Heading
          as="h5"
          onClick={() => navigate(`/productdetail/${item.productId}`)}
        >
          {item.brandTitle.toUpperCase()} - {item.title}
        </Heading> */}
        <ToggleSpan1>{setCurrency(item.price)}</ToggleSpan1>
      </div>
      <div>
        <ToggleSpan1>수량</ToggleSpan1>
        <ToggleSpan2>{setCurrency(item.price)} &times; </ToggleSpan2>
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
