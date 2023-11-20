import styled from "styled-components";
import { setCurrency } from "../services/helper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FullPrice = styled.span`
  text-decoration: line-through;
  color: var(--color-neutral-400);
`;

const Percentage = styled.span`
  margin-left: 1rem;
  color: var(--color-red-600);
`;

const FinalPrice = styled.span`
  font-weight: 500;
`;

function Price({ discount, fullPrice, price }) {
  const percentage = Math.ceil((discount / fullPrice) * 100);

  return (
    <Container>
      {discount > 0 ? (
        <div>
          <FullPrice>{setCurrency(fullPrice)}</FullPrice>
          <Percentage>{percentage}% OFF</Percentage>
        </div>
      ) : (
        <br />
      )}
      <FinalPrice>{setCurrency(price)}</FinalPrice>
    </Container>
  );
}

export default Price;
