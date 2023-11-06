import { useDispatch, useSelector } from "react-redux";
import FormInputContainer from "./FormInputContainer";
import { useState } from "react";
import { updateCurrentUserAsync } from "../redux/authReducer";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "./Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2rem;

  width: 35rem;
  margin: 3rem auto;
  background-color: var(--color-neutral-0);
  padding: 3rem;

  div {
    display: flex;
  }

  button {
    align-self: center;
  }
`;

function UpdatePhoneNumberForm() {
  const {
    user_metadata: { phoneNumber },
  } = useSelector((state) => state.auth.userInfo);

  const [phoneNumber1, phoneNumber2, phoneNumber3] = phoneNumber.split("-");

  const dispatch = useDispatch();
  const [newPhoneNumber1, setNewPhoneNumber1] = useState(phoneNumber1);
  const [newPhoneNumber2, setNewPhoneNumber2] = useState(phoneNumber2);
  const [newPhoneNumber3, setNewPhoneNumber3] = useState(phoneNumber3);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      newPhoneNumber1.length === 0 ||
      newPhoneNumber2.length === 0 ||
      newPhoneNumber3.length === 0
    )
      return;

    const newPhoneNumber = [
      newPhoneNumber1,
      newPhoneNumber2,
      newPhoneNumber3,
    ].join("-");
    dispatch(updateCurrentUserAsync({ phoneNumber: newPhoneNumber }));
    toast.success("전화번호가 변경되었습니다 😊");
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="newPhoneNumber1">새로운 휴대폰 번호</label>
      <div>
        <FormInputContainer>
          <input
            type="text"
            value={newPhoneNumber1}
            maxLength={3}
            onChange={(e) => setNewPhoneNumber1(e.target.value)}
            id="newPhoneNumber1"
          />
        </FormInputContainer>
        <span>-</span>
        <FormInputContainer>
          <input
            type="text"
            value={newPhoneNumber2}
            maxLength={4}
            onChange={(e) => setNewPhoneNumber2(e.target.value)}
          />
        </FormInputContainer>
        <span>-</span>
        <FormInputContainer>
          <input
            type="text"
            value={newPhoneNumber3}
            maxLength={4}
            onChange={(e) => setNewPhoneNumber3(e.target.value)}
          />
        </FormInputContainer>
      </div>
      <Button color="green">저장하기</Button>
    </StyledForm>
  );
}

export default UpdatePhoneNumberForm;
