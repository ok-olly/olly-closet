import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../redux/authReducer";
import Heading from "../ui/Heading";
import UpdateAddressForm from "../ui/UpdateAddressForm";
import { useState } from "react";
import UpdatePhoneNumberForm from "../ui/UpdatePhoneNumberForm";
import UpdatePasswordForm from "../ui/UpdatePasswordForm";

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { fullName } = useSelector(
    (state) => state.auth.userInfo.user_metadata
  );

  async function handleClick() {
    dispatch(logoutAsync());
  }

  return (
    <div>
      <Heading as="h2">마이페이지</Heading>
      <p>{fullName}님</p>
      {/* <button>내 정보 관리</button> */}
      <div>
        <button id="password" onClick={() => setIsOpen((v) => !v)}>
          비밀번호 변경
        </button>
        <div>{isOpen && <UpdatePasswordForm />}</div>

        <button onClick={() => setIsOpen((v) => !v)}>휴대폰번호 변경</button>
        <div>{isOpen && <UpdatePhoneNumberForm />}</div>

        <button onClick={() => setIsOpen((v) => !v)}>배송지 관리</button>
        <div>{isOpen && <UpdateAddressForm />}</div>
      </div>
      <button onClick={handleClick}>로그아웃</button>
    </div>
  );
}

export default MyPage;
