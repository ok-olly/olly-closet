import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginAsync, signupAsync } from "../redux/authReducer";
import toast from "react-hot-toast";
import { RiArrowGoBackLine } from "react-icons/ri";
import Heading from "../ui/Heading";
import FormInputContainer from "../ui/FormInputContainer";

const Container = styled.div`
  width: 35rem;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2rem;
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
            <FormInputContainer>
              <input
                type="text"
                placeholder="이메일"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormInputContainer>

            <FormInputContainer>
              <input
                type="password"
                placeholder="비밀번호"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormInputContainer>

            {isSigningup && (
              <FormInputContainer>
                <input
                  type="text"
                  placeholder="이름"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormInputContainer>
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
