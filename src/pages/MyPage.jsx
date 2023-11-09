import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../redux/authReducer";
import styled from "styled-components";
import Heading from "../ui/Heading";
import UpdateAddressForm from "../ui/UpdateAddressForm";
import UpdatePhoneNumberForm from "../ui/UpdatePhoneNumberForm";
import UpdatePasswordForm from "../ui/UpdatePasswordForm";
import Button from "../ui/Button";
import Nav from "../ui/Nav";
import { getOrdersByUser } from "../services/apiOrders";
import { useLoaderData } from "react-router-dom";

const Wrapper = styled.div`
  background-color: var(--color-neutral-100);
  border-radius: 10px;
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 0 2.5rem;
`;

const NavButton = styled.button`
  border: none;
  border-radius: 10px 10px 0 0;
  font-size: 1.6rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 1px dotted black;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--color-neutral-0);
    border-bottom: 1px solid black;
  }
`;

function MyPage() {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isPhoneNumberOpen, setIsPhoneNumberOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    user_metadata: { fullName },
    email,
  } = useSelector((state) => state.auth.userInfo);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const orders = await getOrdersByUser(email);
      setOrders(orders);
    }
    fetchData();
  }, []);

  function handleUpdateForm(id) {
    if (id === "password") {
      setIsPasswordOpen((v) => !v);
      setIsPhoneNumberOpen(false);
      setIsAddressOpen(false);
    }

    if (id === "phoneNumber") {
      setIsPasswordOpen(false);
      setIsPhoneNumberOpen((v) => !v);
      setIsAddressOpen(false);
    }

    if (id === "address") {
      setIsPasswordOpen(false);
      setIsPhoneNumberOpen(false);
      setIsAddressOpen((v) => !v);
    }
  }

  async function handleLogout() {
    const answer = confirm("로그아웃할까요?");
    if (!answer) return;
    dispatch(logoutAsync());
  }

  return (
    <>
      <Heading as="h2">마이페이지</Heading>

      <Wrapper>
        <Container>
          <Nav>
            <ul>
              <li>{fullName}님</li>
            </ul>
            <ul>
              <li>
                <NavButton onClick={() => handleUpdateForm("password")}>
                  비밀번호 변경
                </NavButton>
              </li>
              <li>
                <NavButton onClick={() => handleUpdateForm("phoneNumber")}>
                  휴대폰 번호 변경
                </NavButton>
              </li>
              <li>
                <NavButton onClick={() => handleUpdateForm("address")}>
                  배송지 관리
                </NavButton>
              </li>
            </ul>
          </Nav>

          {isPasswordOpen && <UpdatePasswordForm />}
          {isPhoneNumberOpen && <UpdatePhoneNumberForm />}
          {isAddressOpen && <UpdateAddressForm />}

          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id}>
                <p>{order.orderId}</p>
                <p>{order.title}</p>
              </div>
            ))
          ) : (
            <span>주문내역이 없습니다.</span>
          )}

          <Button color="red" type="button" onClick={handleLogout}>
            로그아웃
          </Button>
        </Container>
      </Wrapper>
    </>
  );
}

export default MyPage;
