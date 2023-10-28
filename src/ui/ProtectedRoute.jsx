import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUserAsync } from "../redux/authReducer";
import { store } from "../redux/store";

function ProtectedRoute() {
  const navigate = useNavigate();
  const { isLoading, userInfo } = useSelector((state) => state.auth);
  const isUserLoggedin = userInfo?.role === "authenticated";

  useEffect(() => {
    if (!isUserLoggedin && !isLoading) navigate("/login");
  }, [isUserLoggedin, isLoading]);

  if (isLoading) return <div>로딩중</div>;

  if (isUserLoggedin) return <Outlet />;
}

export async function loader() {
  store.dispatch(getCurrentUserAsync());
  return null;
}

export default ProtectedRoute;
