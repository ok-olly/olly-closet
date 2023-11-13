import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUserAsync } from "../redux/authReducer";
import { store } from "../redux/store";
import styled from "styled-components";

const Div = styled.div`
  width: 10rem;
  height: 10rem;
`;

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isLoading, userInfo } = useSelector((state) => state.auth);
  const isUserLoggedin = userInfo?.role === "authenticated";

  useEffect(() => {
    if (!isUserLoggedin && !isLoading) navigate("/login");
  }, [isUserLoggedin, isLoading]);

  if (isLoading) return <Div className="loader"></Div>;

  if (isUserLoggedin) return <Outlet />;
}

export async function loader() {
  store.dispatch(getCurrentUserAsync());
  return null;
}

export default ProtectedRoute;
