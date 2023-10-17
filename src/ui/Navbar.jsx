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
  /* gap: 4rem; */
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    padding: 0 2rem;
  }

  &:hover,
  &.active:link,
  &.active:visited {
    border-bottom: solid 2px var(--color-neutral-300);
  }
`;

function Navbar() {
  return (
    <Nav>
      <Ul>
        <li>
          <StyledNavLink to="/products/women">여성</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/products/men">남성</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/products/brand">브랜드</StyledNavLink>
        </li>
      </Ul>
      <Ul>
        <li>
          <StyledNavLink to="/login">로그인</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cart">장바구니</StyledNavLink>
        </li>
      </Ul>
    </Nav>
  );
}

export default Navbar;
