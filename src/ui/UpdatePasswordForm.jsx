import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUserAsync } from "../redux/authReducer";
import styled from "styled-components";
import toast from "react-hot-toast";
import FormInputContainer from "./FormInputContainer";
import Button from "../components/Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2rem;

  width: 35rem;
  margin: 3rem auto;
  background-color: var(--color-neutral-0);
  padding: 3rem;

  @media ${({ theme }) => theme.device.mobileMedium} {
    width: 32rem;
    padding: 2rem;
  }

  button {
    align-self: center;
  }
`;

function UpdatePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (newPassword.length === 0 || newPasswordCheck.length === 0) {
      toast.error("새로운 비밀번호를 입력해주세요");
      return;
    }

    if (newPassword !== newPasswordCheck) {
      toast.error("새로운 비밀번호가 서로 다릅니다. 입력값을 확인해주세요");
      return;
    }

    if (newPassword.length < 8 || newPasswordCheck.length < 8) {
      toast.error("여덟 자리 이상 입력해주세요");
      return;
    }

    dispatch(updateCurrentUserAsync({ password: newPassword }));
    toast.success("비밀번호가 변경되었습니다 😊");
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <label htmlFor="newPassword">새로운 비밀번호</label>
        <FormInputContainer>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새로운 비밀번호를 입력하세요"
            id="newPassword"
          />
        </FormInputContainer>
      </div>

      <div>
        <label htmlFor="newPasswordCheck">새로운 비밀번호 확인</label>
        <FormInputContainer>
          <input
            type="password"
            value={newPasswordCheck}
            onChange={(e) => setNewPasswordCheck(e.target.value)}
            placeholder="한 번 더 입력하세요"
            id="newPasswordCheck"
          />
        </FormInputContainer>
      </div>
      <Button color="green">저장하기</Button>
    </StyledForm>
  );
}

export default UpdatePasswordForm;
