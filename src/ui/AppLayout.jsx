import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SlideNav from "./SlideNav";

const StyledAppLayout = styled.div`
  max-width: 140rem;
  /* margin: 1.5rem auto 0; */
  margin: 0 auto;
`;

const Main = styled.main`
  margin: 3rem auto;
  padding: 0 10rem;
  min-height: 60vh;

  @media ${({ theme }) => theme.device.largest} {
    padding: 0 5rem;
  }

  @media ${({ theme }) => theme.device.medium} {
    padding: 0 2rem;
    margin: 2rem auto;
  }

  @media ${({ theme }) => theme.device.small} {
    padding: 0 1rem;
    margin: 1rem auto;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SlideNav />
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
