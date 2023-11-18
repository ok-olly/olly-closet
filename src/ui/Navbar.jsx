import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

  ul {
    display: flex;
    gap: 2rem;
    align-items: center;

    @media ${({ theme }) => theme.device.medium} {
      font-size: 1.4rem;
    }

    /* @media ${({ theme }) => theme.device.mobileMedium} {
      display: none;
    } */
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    padding: 0 2rem;

    @media ${({ theme }) => theme.device.mobileLarge} {
      padding: 0 1rem;
    }
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
      }

      @media ${({ theme }) => theme.device.mobileLarge} {
        top: -10px;
        right: 0;
      }
    }
  }
`;
const ShowNav = styled.div`
  display: none;

  @media ${({ theme }) => theme.device.mobileMedium} {
    display: inline;
    position: absolute;
    top: 8px;
    left: 15px;

    button {
      border: none;
      background-color: var(--color-neutral-0);
      color: var(--color-neutral-950);

      svg {
        font-size: 2.5rem;
      }
    }
  }
`;

function Navbar() {
  const { userInfo, cart } = useSelector((state) => state.auth);
  const numProducts = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <Nav className={isOpen ? "open" : "hidden"}>
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
      <ShowNav onClick={() => setIsOpen((v) => !v)}>
        <button>{isOpen ? <FaTimes /> : <FaBars />}</button>
      </ShowNav>
    </>
  );
}

export default Navbar;
