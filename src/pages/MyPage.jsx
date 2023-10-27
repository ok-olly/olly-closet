import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUserAsync, logoutAsync } from "../redux/authReducer";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);

  useEffect(() => {
    if (!userInfo) navigate("/");
  }, [userInfo]);

  async function handleClick() {
    dispatch(logoutAsync());
  }

  return (
    <div>
      mypage
      <button onClick={handleClick}>로그아웃</button>
    </div>
  );
}

export default MyPage;
