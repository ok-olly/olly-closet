import { useDispatch } from "react-redux";
import { logoutAsync } from "../redux/authReducer";

function MyPage() {
  const dispatch = useDispatch();

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
