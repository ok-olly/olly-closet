import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Heading from "./Heading";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: var(--color-neutral-0);
  z-index: 200;
  border-bottom: 1px solid var(--color-neutral-400);
  padding: 0 4rem;
`;

const StyledLink = styled(Link)`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--color-neutral-950);
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Heading as="h1">
        <StyledLink to="/">Olly's Closet</StyledLink>
      </Heading>

      <Navbar />
    </StyledHeader>
  );
}

export default Header;
