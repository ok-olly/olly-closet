import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../services/helper";
import { removeItem, resetCart } from "../redux/cartReducer";

function Cart() {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const total = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <>
      <h2>Cart</h2>
      {products.map((item) => (
        <div key={item.id}>
          <span>{item.title}</span>
          <img src={item.img1} style={{ width: "30px" }} />
          <span>가격 : {setCurrency(item.price * item.quantity)}</span>
          <span>수량 : {item.quantity}</span>
          <button onClick={() => dispatch(removeItem(item.id))}>delete</button>
        </div>
      ))}
      <span>{setCurrency(total)}</span>
      <button onClick={() => dispatch(resetCart())}>reset</button>
    </>
  );
}

export default Cart;
