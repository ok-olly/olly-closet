import Button from "./Button";
import { useForm } from "react-hook-form";

function OrderForm({
  address,
  fullName,
  phoneNumber,
  email,
  setShippingInfo,
  cart,
}) {
  const { address1, address2, zipcode } = address;
  const [phoneNumber1, phoneNumber2, phoneNumber3] = phoneNumber.split("-");
  const [email1, email2] = email.split("@");

  const { register, handleSubmit } = useForm();

  function submitForm(data) {
    const shippingEmail = data.email1 + "@" + data.email2;
    const shippingPhoneNumber =
      data.phoneNumber1 + "-" + data.phoneNumber2 + "-" + data.phoneNumber3;
    const orderId = Date.now();

    // setShippingInfo({
    //   address1: data.address1,
    //   address2: data.address2,
    //   zipcode: data.zipcode,
    //   fullName: data.fullName,
    //   phoneNumber: shippingPhoneNumber,
    //   email: shippingEmail,
    //   orderId,
    //   cart,
    // });
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="fullName">이름</label>
        <input
          type="text"
          id="fullName"
          defaultValue={fullName}
          required
          {...register("fullName")}
        />
      </div>

      <div>
        <label htmlFor="email1">이메일</label>
        <input
          type="text"
          id="email1"
          defaultValue={email1}
          required
          {...register("email1")}
        />
        <span>&#64;</span>
        <input
          type="text"
          id="email2"
          defaultValue={email2}
          required
          {...register("email2")}
        />
      </div>

      <div>
        <label htmlFor="zipcode">우편번호</label>
        <input
          type="text"
          id="zipcode"
          defaultValue={zipcode}
          required
          {...register("zipcode")}
        />
        <Button color="yellow" type="button">
          주소찾기
        </Button>
      </div>

      <div>
        <label htmlFor="address1">주소</label>
        <input
          type="text"
          id="address1"
          defaultValue={address1}
          size={50}
          required
          {...register("address1")}
        />
      </div>

      <div>
        <label htmlFor="address2">상세주소</label>
        <input
          type="text"
          id="address2"
          defaultValue={address2}
          {...register("address2")}
        />
      </div>

      <div>
        <label htmlFor="phoneNumber1">휴대폰 번호</label>
        <input
          type="text"
          id="phoneNumber1"
          defaultValue={phoneNumber1}
          required
          {...register("phoneNumber1")}
        />
        <span>-</span>
        <input
          type="text"
          id="phoneNumber2"
          defaultValue={phoneNumber2}
          required
          {...register("phoneNumber2")}
        />
        <span>-</span>
        <input
          type="text"
          id="phoneNumber3"
          defaultValue={phoneNumber3}
          required
          {...register("phoneNumber3")}
        />
      </div>

      <Button color="green" type="submit">
        결제하기
      </Button>
    </form>
  );
}

export default OrderForm;
