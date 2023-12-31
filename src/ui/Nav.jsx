import styled from "styled-components";

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
  }
`;

export default Nav;
