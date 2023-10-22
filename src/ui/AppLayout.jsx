import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  max-width: 140rem;
  margin: 1.5rem auto;
`;

const Main = styled.main`
  margin: 3rem 0;
  padding: 0 10rem;
  min-height: 70vh;
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
