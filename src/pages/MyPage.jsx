import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../redux/authReducer";
import styled from "styled-components";

import Heading from "../components/Heading";
import UpdateAddressForm from "../ui/UpdateAddressForm";
import UpdatePhoneNumberForm from "../ui/UpdatePhoneNumberForm";
import UpdatePasswordForm from "../ui/UpdatePasswordForm";
import Button from "../components/Button";
import Nav from "../ui/Nav";
import OrderList from "../ui/OrderList";

import { getOrdersByUser } from "../services/apiOrders";

const Wrapper = styled.div`
  background-color: var(--color-neutral-100);
  border-radius: 10px;

  h3 {
    text-align: center;
    margin: 2rem 0;
  }

  @media ${({ theme }) => theme.device.medium} {
    font-size: 1.4rem;
  }
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 0 2.5rem;

  @media ${({ theme }) => theme.device.medium} {
    max-width: 70rem;
  }

  @media ${({ theme }) => theme.device.small} {
    padding: 1rem 2rem 2.5rem;
  }

  @media ${({ theme }) => theme.device.mobileLarge} {
    padding: 0.5rem 1.2rem 0.3rem;
  }

  nav {
    @media ${({ theme }) => theme.device.mobileLarge} {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
  }
`;

const NavButton = styled.button`
  border: none;
  border-radius: 10px 10px 0 0;
  font-size: 1.6rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 1px dotted black;
  color: var(--color-neutral-950);

  &:hover,
  &:focus,
  &:active {
    background-color: var(--color-neutral-0);
    border-bottom: 1px solid black;
  }

  @media ${({ theme }) => theme.device.medium} {
    font-size: 1.4rem;
  }

  span {
    @media ${({ theme }) => theme.device.mobileMedium} {
      display: block;
    }
  }
`;

const TableHeader = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  gap: 2rem;
  grid-template-columns: 17rem 23rem 3rem 10rem 15rem;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.device.medium} {
    gap: 1rem;
  }

  @media ${({ theme }) => theme.device.small} {
    display: none;
  }
`;

function MyPage() {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isPhoneNumberOpen, setIsPhoneNumberOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  function handleIsOpen(order) {
    setSelectedOrder((cur) => (cur?.id === order.id ? null : order));
  }

  return (
    <>
      <Heading as="h2">마이페이지</Heading>

      <Wrapper>
        <Container>
          <Nav>
            <ul>
              <li>{fullName}님</li>
              <li>
                <Button color="red" type="button" onClick={handleLogout}>
                  로그아웃
                </Button>
              </li>
            </ul>
            <ul>
              <li>
                <NavButton onClick={() => handleUpdateForm("password")}>
                  <span>비밀번호 </span>
                  <span>변경</span>
                </NavButton>
              </li>
              <li>
                <NavButton onClick={() => handleUpdateForm("phoneNumber")}>
                  <span>휴대폰 번호 </span>
                  <span>변경</span>
                </NavButton>
              </li>
              <li>
                <NavButton onClick={() => handleUpdateForm("address")}>
                  <span>배송지 </span>
                  <span>관리</span>
                </NavButton>
              </li>
            </ul>
          </Nav>

          {isPasswordOpen && <UpdatePasswordForm />}
          {isPhoneNumberOpen && <UpdatePhoneNumberForm />}
          {isAddressOpen && <UpdateAddressForm />}

          <Heading as="h3">주문내역</Heading>

          {orders.length > 0 ? (
            <>
              <TableHeader>
                <span>주문일</span>
                <span>상품명</span>
                <span>수량</span>
                <span>배송상태</span>
                <span>주문번호</span>
              </TableHeader>
              {orders.map((order) => (
                <OrderList
                  order={order}
                  key={order.id}
                  selectedOrder={selectedOrder}
                  handleIsOpen={handleIsOpen}
                />
              ))}
            </>
          ) : (
            <span>주문내역이 없습니다</span>
          )}
        </Container>
      </Wrapper>
    </>
  );
}

export default MyPage;
