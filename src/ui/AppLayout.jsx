import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import theme from "../styles/theme";

const StyledAppLayout = styled.div`
  max-width: 140rem;
  margin: 1.5rem auto;

  /* @media ${({ theme }) => theme.device.large} {
    font-size: 80%;
  } */
`;

const Main = styled.main`
  margin: 3rem auto;
  padding: 0 10rem;
  min-height: 60vh;

  @media ${({ theme }) => theme.device.large} {
    padding: 0 5rem;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
