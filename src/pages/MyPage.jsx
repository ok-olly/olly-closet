import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../redux/authReducer";
import Heading from "../ui/Heading";
import UpdateAddressForm from "../ui/UpdateAddressForm";
import { useState } from "react";
import UpdatePhoneNumberForm from "../ui/UpdatePhoneNumberForm";
import UpdatePasswordForm from "../ui/UpdatePasswordForm";

function MyPage() {
  const [isUPFormOpen, setIsUPFormOpen] = useState(false);
  const [isUPNFormOpen, setIsUPNFormOpen] = useState(false);
  const [isUAFormOpen, setIsUAFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { fullName } = useSelector(
    (state) => state.auth.userInfo.user_metadata
  );

  function handleUPForm(id) {
    if (id === "password") {
      setIsUPFormOpen((v) => !v);
      setIsUPNFormOpen(false);
      setIsUAFormOpen(false);
    }

    if (id === "phoneNumber") {
      setIsUPFormOpen(false);
      setIsUPNFormOpen((v) => !v);
      setIsUAFormOpen(false);
    }

    if (id === "address") {
      setIsUPFormOpen(false);
      setIsUPNFormOpen(false);
      setIsUAFormOpen((v) => !v);
    }
  }

  async function handleLogout() {
    dispatch(logoutAsync());
  }

  return (
    <div>
      <Heading as="h2">마이페이지</Heading>
      <p>{fullName}님</p>
      <div>
        <button onClick={() => handleUPForm("password")}>비밀번호 변경</button>

        <button onClick={() => handleUPForm("phoneNumber")}>
          휴대폰번호 변경
        </button>

        <button onClick={() => handleUPForm("address")}>배송지 관리</button>
      </div>

      <div>
        {isUPFormOpen && <UpdatePasswordForm />}
        {isUPNFormOpen && <UpdatePhoneNumberForm />}
        {isUAFormOpen && <UpdateAddressForm />}
      </div>

      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default MyPage;
