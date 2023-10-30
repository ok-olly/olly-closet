import { useState } from "react";
import Postcode from "./Postcode";
import FormInputContainer from "./FormInputContainer";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUserAsync } from "../redux/authReducer";
import toast from "react-hot-toast";

function UpdateAddressForm() {
  const { address } = useSelector((state) => state.auth.userInfo.user_metadata);
  const [isOpen, setIsOpen] = useState(false);
  const [zipcode, setZipcode] = useState(address.zipcode);
  const [address1, setAddress1] = useState(address.address1);
  const [address2, setAddress2] = useState(address.address2);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (zipcode.length !== 0 && address1.length !== 0) {
      dispatch(
        updateCurrentUserAsync({ address: { address1, address2, zipcode } })
      );
      toast.success("주소가 변경되었습니다 😊");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "yellow" }}>
      <p>주소변경폼</p>
      <div style={{ display: "flex" }}>
        <FormInputContainer>
          <input type="text" value={zipcode} placeholder="우편번호" readOnly />
        </FormInputContainer>
        <button type="button" onClick={() => setIsOpen((v) => !v)}>
          주소찾기
        </button>
      </div>

      <FormInputContainer>
        <input
          type="text"
          value={address1}
          placeholder="주소찾기 버튼을 눌러주세요"
          readOnly
        />
      </FormInputContainer>

      <FormInputContainer>
        <input
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          placeholder="상세주소를 입력해주세요"
        />
      </FormInputContainer>

      {isOpen && <Postcode setZipcode={setZipcode} setAddress1={setAddress1} />}

      <button>주소 저장하기</button>
    </form>
  );
}

export default UpdateAddressForm;
