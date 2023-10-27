import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0 4rem;
  margin: 1rem 0;
`;

const Ul = styled.ul`
  display: flex;
`;

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
    }
  }
`;

function Navbar() {
  const products = useSelector((state) => state.cart.products);
  const numProducts = products.reduce((acc, item) => acc + item.quantity, 0);

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Nav>
      <Ul>
        <li>
          <StyledNavLink to="/products/women">여성</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/products/men">남성</StyledNavLink>
        </li>
      </Ul>
      <Ul>
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
      </Ul>
    </Nav>
  );
}

export default Navbar;
