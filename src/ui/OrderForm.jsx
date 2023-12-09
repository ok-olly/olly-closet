import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import toast from "react-hot-toast";

import Postcode from "./Postcode";
import { orderAsync, resetCartAsync } from "../redux/authReducer";

import Button from "../components/Button";

const StyledDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;

  label {
    width: 30%;

    @media ${({ theme }) => theme.device.small} {
      width: 20%;
    }

    @media ${({ theme }) => theme.device.mobileLarge} {
      width: 31%;
    }

    @media ${({ theme }) => theme.device.mobileMedium} {
      width: 40%;
      gap: 0.5rem;
    }
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  input {
    width: 50%;
    border: none;
    padding: 0.5rem;

    &:focus {
      outline: none;
    }
  }
`;

const ButtonContainer = styled.div`
  text-align: end;
`;

function OrderForm({ address, fullName, phoneNumber, email, cart, item }) {
  const [shippingInfo, setShippingInfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { address1, address2, zipcode } = address;
  const [phoneNumber1, phoneNumber2, phoneNumber3] = phoneNumber.split("-");
  const [email1, email2] = email.split("@");

  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (shippingInfo.length > 0) {
      dispatch(orderAsync(shippingInfo));
      toast.success("주문이 완료되었습니다 🎉");
      if (!item) dispatch(resetCartAsync());
      navigate("/");
    }
  }, [shippingInfo]);

  function setAddress1FromPostcode(v) {
    setValue("address1", v);
  }

  function setZipcodeFromPostcode(v) {
    setValue("zipcode", v);
  }

  function submitForm(data) {
    const shippingEmail = data.email1 + "@" + data.email2;
    const shippingPhoneNumber =
      data.phoneNumber1 + "-" + data.phoneNumber2 + "-" + data.phoneNumber3;
    const orderId = Date.now();

    if (item) {
      setShippingInfo((info) => [
        ...info,
        {
          ...item,
          address1: data.address1,
          address2: data.address2,
          zipcode: data.zipcode,
          fullName: data.fullName,
          phoneNumber: shippingPhoneNumber,
          email: shippingEmail,
          orderId,
          user_id: email,
        },
      ]);
      return;
    }

    cart.map((item) => {
      setShippingInfo((info) => [
        ...info,
        {
          ...item,
          address1: data.address1,
          address2: data.address2,
          zipcode: data.zipcode,
          fullName: data.fullName,
          phoneNumber: shippingPhoneNumber,
          email: shippingEmail,
          orderId,
          user_id: email,
        },
      ]);
    });
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <StyledDiv>
        <label htmlFor="fullName">이름</label>
        <InputContainer>
          <input
            type="text"
            id="fullName"
            defaultValue={fullName}
            required
            {...register("fullName")}
          />
        </InputContainer>
      </StyledDiv>

      <StyledDiv>
        <label htmlFor="email1">이메일</label>
        <InputContainer>
          <input
            type="text"
            id="email1"
            defaultValue={email1}
            required
            {...register("email1")}
          />
          <span>&#64;</span>
          <input
            type="text"
            id="email2"
            defaultValue={email2}
            required
            {...register("email2")}
          />
        </InputContainer>
      </StyledDiv>

      <StyledDiv>
        <label htmlFor="zipcode">우편번호</label>
        <InputContainer>
          <input
            type="text"
            id="zipcode"
            defaultValue={zipcode}
            required
            {...register("zipcode")}
          />
          <Button
            color="yellow"
            type="button"
            onClick={() => setIsOpen((v) => !v)}
          >
            주소찾기
          </Button>
        </InputContainer>
      </StyledDiv>

      {isOpen && (
        <StyledDiv>
          <Postcode
            setAddress1={setAddress1FromPostcode}
            setZipcode={setZipcodeFromPostcode}
          />
        </StyledDiv>
      )}

      <StyledDiv>
        <label htmlFor="address1">주소</label>
        <InputContainer>
          <input
            type="text"
            id="address1"
            defaultValue={address1}
            // size={47}
            required
            {...register("address1")}
          />
        </InputContainer>
      </StyledDiv>

      <StyledDiv>
        <label htmlFor="address2">상세주소</label>
        <InputContainer>
          <input
            type="text"
            id="address2"
            defaultValue={address2}
            // size={47}
            {...register("address2")}
          />
        </InputContainer>
      </StyledDiv>

      <StyledDiv>
        <label htmlFor="phoneNumber1">휴대폰 번호</label>
        <InputContainer>
          <input
            type="text"
            id="phoneNumber1"
            defaultValue={phoneNumber1}
            required
            maxLength={3}
            size={4}
            {...register("phoneNumber1")}
          />
          <span>-</span>
          <input
            type="text"
            id="phoneNumber2"
            defaultValue={phoneNumber2}
            required
            maxLength={4}
            size={4}
            {...register("phoneNumber2")}
          />
          <span>-</span>
          <input
            type="text"
            id="phoneNumber3"
            defaultValue={phoneNumber3}
            required
            maxLength={4}
            size={4}
            {...register("phoneNumber3")}
          />
        </InputContainer>
      </StyledDiv>

      <ButtonContainer>
        <Button color="green" type="submit">
          결제하기
        </Button>
      </ButtonContainer>
    </form>
  );
}

export default OrderForm;
