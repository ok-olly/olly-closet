import { useDispatch } from "react-redux";
import { logoutAsync } from "../redux/authReducer";
import Heading from "../ui/Heading";

function MyPage() {
  const dispatch = useDispatch();

  async function handleClick() {
    dispatch(logoutAsync());
  }

  return (
    <div>
      <Heading as='h2'>마이페이지</Heading>
      <button onClick={handleClick}>로그아웃</button>
    </div>
  );
}

export default MyPage;
