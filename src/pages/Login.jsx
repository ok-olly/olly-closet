import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearError, loginAsync, signupAsync } from "../redux/authReducer";

import toast from "react-hot-toast";
import styled from "styled-components";
import { RiArrowGoBackLine } from "react-icons/ri";

import Heading from "../components/Heading";
import FormInputContainer from "../ui/FormInputContainer";
import SquareButton from "../components/SquareButton";
import SquareButtonContainer from "../components/SquaredButtonContainer";

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

function Login() {
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("password");
  const [fullName, setFullName] = useState("");
  const [isSigningup, setIsSigningup] = useState(false);
  const navigate = useNavigate();

  const { isLoading, userInfo, loginError, signupError, isSignupOk } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) navigate("/mypage");
  }, [userInfo]);

  useEffect(() => {
    if (loginError) {
      console.log(loginError);
      setEmail("");
      setPassword("");
      toast.error("이메일 또는 비밀번호를 잘못 입력했습니다.");
      dispatch(clearError());
    }
  }, [loginError]);

  useEffect(() => {
    if (signupError) {
      console.log(signupError);
      toast.error(signupError);
      dispatch(clearError());
    }
  }, [signupError]);

  useEffect(() => {
    if (isSignupOk) {
      toast.success("인증 메일을 보내드렸어요! 메일함에서 확인해주세요 😊");
      dispatch(clearError());
      setIsSigningup(false);
    }
  }, [isSignupOk]);

  function handleSignup() {
    if (!email.match(/\S+@\S+\.\S+/)) {
      toast.error("올바른 이메일 주소를 입력해 주세요.");
      return;
    }

    if (password.length < 8) {
      toast.error("비밀번호는 8자리 이상이어야 합니다.");
      return;
    }

    if (!fullName.length) {
      toast.error("이름을 입력해주세요.");
      return;
    }

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
        {isLoading ? (
          <div className="loader"></div>
        ) : (
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

            <SquareButtonContainer>
              {!isSigningup && (
                <>
                  <SquareButton type="submit">로그인</SquareButton>
                  <SquareButton
                    type="button"
                    color="white"
                    onClick={() => setIsSigningup(true)}
                  >
                    회원가입
                  </SquareButton>
                </>
              )}
              {isSigningup && (
                <>
                  <div
                    onClick={() => {
                      setIsSigningup(false);
                      setFullName("");
                    }}
                  >
                    <RiArrowGoBackLine />
                  </div>
                  <SquareButton type="submit">회원가입</SquareButton>
                </>
              )}
            </SquareButtonContainer>
          </StyledForm>
        )}
      </Container>
    </>
  );
}

export default Login;
