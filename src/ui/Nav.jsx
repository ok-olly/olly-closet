import styled from "styled-components";

// const StyledNav = styled.nav`
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

  ul {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
`;

// function Nav({ children }) {
//   return <StyledNav>{children}</StyledNav>;
// }

export default Nav;
