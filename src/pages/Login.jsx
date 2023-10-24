import { Form, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../services/apiAuth";
import { useState } from "react";

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
    width: 100%;

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
  const [email, setEmail] = useState("olivia@example.com");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const { user, session } = await login({ email, password });
      if (user.aud === "authenticated") navigate("/");
    } catch (e) {
      console.log(e);
      alert("이메일 또는 비밀번호를 잘못 입력했습니다.");
    }
  }

  return (
    <>
      <H2>로그인</H2>
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <InputContainer>
              <input
                type="text"
                placeholder="아이디"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <input
                type="password"
                placeholder="비밀번호"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
