import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: space-around;
`;

function ButtonContainer({ children }) {
  return <Div>{children}</Div>;
}

export default ButtonContainer;
