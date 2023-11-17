import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

  @media ${({ theme }) => theme.device.small} {
    /* gap: 5rem; */
  }

  ul {
    display: flex;
    gap: 2rem;
    align-items: center;

    @media ${({ theme }) => theme.device.medium} {
      font-size: 1.4rem;
    }

    @media ${({ theme }) => theme.device.mobileMedium} {
      gap: 0;
    }
  }
`;

export default Nav;
