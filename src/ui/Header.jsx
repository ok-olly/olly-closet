import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: var(--color-neutral-0);
  z-index: 200;
  border-bottom: 1px solid var(--color-neutral-400);
`;

const H1 = styled.h1`
  font-family: "Oswald", sans-serif;
  text-transform: uppercase;
  text-align: center;
`;

const StyledLink = styled(Link)`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--color-neutral-950);
  }

  /* a:link    { color: blue; }
a:visited { color: purple; }
a:hover   { color: red; }
a:focus   { outline: 1px solid blue; }
a:active  { color: yellow ;} */
`;

function Header() {
  return (
    <StyledHeader>
      <H1>
        <StyledLink to="/">Olly's Closet</StyledLink>
      </H1>

      <Navbar />
    </StyledHeader>
  );
}

export default Header;
