import { Form, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginAsync, signupAsync } from "../redux/authReducer";
import Heading from "../ui/Heading";
import { RiArrowGoBackLine } from "react-icons/ri";

// const H2 = styled.h2`
//   font-weight: 600;
//   font-size: 3rem;
//   text-align: center;
//   margin: 4rem 0;
// `;

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSigningup, setIsSigningup] = useState(false);
  const navigate = useNavigate();

  const { isLoading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) navigate("/mypage");
  }, [userInfo]);

  useEffect(() => {
    if (error) {
      console.log(error);
      setEmail("");
      setPassword("");
      toast.error("이메일 또는 비밀번호를 잘못 입력했습니다.");
      dispatch(clearError());
    }
  }, [error]);

  function handleSignup() {
    if (!email.match(/\S+@\S+\.\S+/))
      toast.error("올바른 이메일 주소를 입력해 주세요.");

    if (password.length < 8) toast.error("비밀번호는 8자리 이상이어야 합니다.");

    if (!fullName.length) toast.error("이름을 입력해주세요.");

    dispatch(signupAsync({ fullName, email, password }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    isSigningup ? handleSignup() : dispatch(loginAsync({ email, password }));
  }

  return (
    <>
      <Heading as="h2">로그인</Heading>
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <InputContainer>
              <input
                type="text"
                placeholder="이메일"
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

            {isSigningup && (
              <InputContainer>
                <input
                  type="text"
                  placeholder="이름"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </InputContainer>
            )}
          </div>

          <ButtonContainer>
            {!isSigningup && (
              <>
                <Button type="submit">로그인</Button>
                <Button type="button" onClick={() => setIsSigningup(true)}>
                  회원가입
                </Button>
              </>
            )}
            {isSigningup && (
              <>
                <div onClick={() => setIsSigningup(false)}>
                  <RiArrowGoBackLine />
                </div>
                <Button type="submit">회원가입</Button>
              </>
            )}
          </ButtonContainer>
        </StyledForm>
      </Container>
    </>
  );
}

export default Login;
