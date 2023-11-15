import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Postcode from "./Postcode";
import { useForm } from "react-hook-form";
import { updateOrderInfo } from "../services/apiOrders";

const Ul = styled.ul`
  display: grid;
  justify-content: center;
  justify-items: center;
  gap: 2rem;
  grid-template-columns: 17rem 23rem 3rem 10rem 15rem;
  background-color: var(--color-neutral-0);
  padding: 1rem;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.device.medium} {
    gap: 1rem;
  }

  @media ${({ theme }) => theme.device.small} {
    grid-template-columns: 17rem 23rem 6rem;
    /*  10rem 15rem; */
    grid-template-rows: repeat(2, 1fr);
  }
`;

const HiddenSpan = styled.span`
  display: none;

  @media ${({ theme }) => theme.device.small} {
    display: inline;
  }
`;

const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: var(--color-neutral-950);
    text-decoration: underline;
  }

  &:hover,
  &:focus,
  &:active {
    color: var(--color-neutral-400);
  }
`;

const Span = styled.span`
  text-decoration: underline;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    color: var(--color-neutral-400);
  }
`;

const Wrapper = styled.div`
  background-color: var(--color-neutral-300);
`;

const Container = styled.div`
  padding: 0 2.5rem 2.5rem;

  h5 {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media ${({ theme }) => theme.device.medium} {
    flex-direction: column;
  }
`;

const LeftSide = styled.div`
  flex-basis: 57%;

  form {
    div {
      margin-bottom: 0.7rem;
      display: flex;
      gap: 1rem;
      align-items: center;

      label {
        flex-basis: 20%;
      }

      input {
        border: none;
        padding: 0.5rem;
      }
    }
  }
`;

const RightSide = styled.div`
  flex: 1;
`;

function OrderList({ order, selectedOrder, handleIsOpen }) {
  const {
    id,
    productId,
    title,
    img1,
    price,
    quantity,
    brandId,
    brandTitle,
    address1,
    address2,
    email,
    fullName,
    isDelivered,
    isShipped,
    orderId,
    phoneNumber,
    zipcode,
    created_at,
  } = order;
  const [isOpen, setIsOpen] = useState(false);
  const orderDate = created_at.slice(0, 10) + " " + created_at.slice(11, 19);
  const [phoneNumber1, phoneNumber2, phoneNumber3] = phoneNumber.split("-");
  const isSelected = selectedOrder?.id === order.id;
  const { register, handleSubmit, setValue } = useForm();

  function setAddress1FromPostcode(v) {
    setValue("address1", v);
  }

  function setZipcodeFromPostcode(v) {
    setValue("zipcode", v);
  }

  function submitForm(data) {
    const {
      address1,
      address2,
      fullName,
      phoneNumber1,
      phoneNumber2,
      phoneNumber3,
      zipcode,
    } = data;
    const shippingPhoneNumber =
      phoneNumber1 + "-" + phoneNumber2 + "-" + phoneNumber3;

    updateOrderInfo(id, {
      address1,
      address2,
      zipcode,
      fullName,
      phoneNumber: shippingPhoneNumber,
    });
  }

  return (
    <Wrapper>
      <Ul>
        <li>{orderDate}</li>
        <li>
          <StyledLink to={`/productdetail/${productId}`}>{title}</StyledLink>
        </li>
        <li>
          <HiddenSpan>수량: </HiddenSpan>
          {quantity}
        </li>
        <li>
          {!isShipped && !isDelivered
            ? "배송준비중"
            : isShipped && !isDelivered
            ? "배송중"
            : "배송완료"}
        </li>
        <li>
          <Span onClick={() => handleIsOpen(order)}>{orderId}</Span>
        </li>
      </Ul>
      {isSelected && (
        <>
          <Container>
            <Heading as="h3">배송정보</Heading>

            {isShipped && !isDelivered ? (
              <Heading as="h5">
                배송중에는 배송정보를 수정할 수 없어요 😔
              </Heading>
            ) : isDelivered ? (
              <Heading as="h5">배송이 완료되었습니다 🥳</Heading>
            ) : (
              <Heading as="h5">
                상품을 준비하고 있습니다. 빠르게 보내드릴게요! 😊
              </Heading>
            )}

            <FormContainer>
              <LeftSide>
                <form onSubmit={handleSubmit(submitForm)}>
                  <div>
                    <label htmlFor="fullName">이름</label>
                    <input
                      type="text"
                      id="fullName"
                      defaultValue={fullName}
                      disabled={isShipped}
                      required
                      {...register("fullName")}
                    />
                  </div>

                  <div>
                    <label htmlFor="zipcode">우편번호</label>
                    <input
                      type="text"
                      id="zipcode"
                      defaultValue={zipcode}
                      disabled={isShipped}
                      required
                      {...register("zipcode")}
                    />
                    {!isShipped && (
                      <Button
                        color="yellow"
                        type="button"
                        onClick={() => setIsOpen((v) => !v)}
                      >
                        주소찾기
                      </Button>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address1">주소</label>
                    <input
                      type="text"
                      id="address1"
                      defaultValue={address1}
                      disabled={isShipped}
                      size={47}
                      required
                      {...register("address1")}
                    />
                  </div>

                  <div>
                    <label htmlFor="address2">상세주소</label>
                    <input
                      type="text"
                      id="address2"
                      defaultValue={address2}
                      disabled={isShipped}
                      size={47}
                      {...register("address2")}
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber1">휴대폰 번호</label>
                    <input
                      type="text"
                      id="phoneNumber1"
                      defaultValue={phoneNumber1}
                      disabled={isShipped}
                      size={3}
                      maxLength={3}
                      {...register("phoneNumber1")}
                    />
                    <span>-</span>
                    <input
                      type="text"
                      defaultValue={phoneNumber2}
                      disabled={isShipped}
                      size={4}
                      maxLength={4}
                      {...register("phoneNumber2")}
                    />
                    <span>-</span>
                    <input
                      type="text"
                      defaultValue={phoneNumber3}
                      disabled={isShipped}
                      size={4}
                      maxLength={4}
                      {...register("phoneNumber3")}
                    />
                  </div>

                  {!isShipped && (
                    <Button type="submit" color="green">
                      배송정보 변경하기
                    </Button>
                  )}
                </form>
              </LeftSide>
              <RightSide>
                {isOpen && (
                  <Postcode
                    setAddress1={setAddress1FromPostcode}
                    setZipcode={setZipcodeFromPostcode}
                  />
                )}
              </RightSide>
            </FormContainer>
          </Container>
        </>
      )}
    </Wrapper>
  );
}

export default OrderList;
