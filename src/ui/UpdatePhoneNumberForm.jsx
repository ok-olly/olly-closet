import { useDispatch, useSelector } from "react-redux";
import FormInputContainer from "./FormInputContainer";
import { useState } from "react";
import { updateCurrentUserAsync } from "../redux/authReducer";
import toast from "react-hot-toast";

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
    <form onSubmit={handleSubmit}>
      <p>폰번호변경폼</p>
      <div style={{ display: "flex" }}>
        <FormInputContainer>
          <input
            type="text"
            value={newPhoneNumber1}
            maxLength={3}
            onChange={(e) => setNewPhoneNumber1(e.target.value)}
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
        <button>폰번호 저장하기</button>
      </div>
    </form>
  );
}

export default UpdatePhoneNumberForm;
