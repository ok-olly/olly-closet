import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { RiArrowGoBackLine } from "react-icons/ri";

import Heading from "../components/Heading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  cursor: pointer;
`;

function Error() {
  const navigate = useNavigate();

  return (
    <Container>
      <Heading as="h2">앗 잘못 들어오셨어요 🫥</Heading>

      <Div onClick={() => navigate(-1)}>
        <span>뒤로 돌아가기 </span>
        <RiArrowGoBackLine />
      </Div>
    </Container>
  );
}

export default Error;
