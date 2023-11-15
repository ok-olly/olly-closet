import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    padding: 0 2rem;
  }

  &:hover,
  &.active:link,
  &.active:visited {
    font-weight: 600;
  }

  &:last-of-type {
    position: relative;

    span {
      position: absolute;
      top: -10px;
      right: 10px;

      font-size: 1.2rem;
      text-align: center;
      color: var(--color-neutral-0);
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: var(--color-slate-500);

      @media ${({ theme }) => theme.device.medium} {
        font-size: 1rem;
        width: 1.7rem;
        height: 1.7rem;
        top: -9px;
        right: 11px;
      }
    }
  }
`;

function Navbar() {
  const { userInfo, cart } = useSelector((state) => state.auth);
  const numProducts = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Nav>
      <ul>
        <li>
          <StyledNavLink to="/products/women">여성</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/products/men">남성</StyledNavLink>
        </li>
      </ul>
      <ul>
        <li>
          {userInfo ? (
            <StyledNavLink to="/mypage">마이페이지</StyledNavLink>
          ) : (
            <StyledNavLink to="/login">로그인</StyledNavLink>
          )}
        </li>
        <li>
          <StyledNavLink to="/cart">
            장바구니
            {numProducts > 0 && <span>{numProducts}</span>}
          </StyledNavLink>
        </li>
      </ul>
    </Nav>
  );
}

export default Navbar;
