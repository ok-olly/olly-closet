import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  max-width: 140rem;
  margin: 1.5rem auto;
`;

const Main = styled.main`
  padding: 0 10rem;
  min-height: 70vh;
  background-color: orange;
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
