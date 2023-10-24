import { Form } from "react-router-dom";
import styled from "styled-components";

const H2 = styled.h2`
  font-weight: 600;
  font-size: 3rem;
  text-align: center;
  margin: 4rem 0;
`;

const Container = styled.div`
  width: 35rem;
  margin: 0 auto;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2rem;
`;

const InputContainer = styled.div`
  border-bottom: 1px solid var(--color-neutral-900);
  padding: 1rem;
  margin-bottom: 2rem;

  input {
    border: none;
    font-size: inherit;

    &:focus {
      outline: none;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Button = styled.button`
  border: 1px solid var(--color-slate-700);
  background-color: var(--color-slate-700);
  color: var(--color-neutral-0);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: inherit;
`;

function Login() {
  return (
    <>
      <H2>로그인</H2>
      <Container>
        <StyledForm>
          <div>
            <InputContainer>
              <input type="text" placeholder="아이디" />
            </InputContainer>
            <InputContainer>
              <input type="password" placeholder="비밀번호" />
            </InputContainer>
          </div>

          <ButtonContainer>
            <Button>로그인</Button>
            <Button>회원가입</Button>
          </ButtonContainer>
        </StyledForm>
      </Container>
    </>
  );
}

export default Login;
