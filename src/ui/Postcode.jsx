import DaumPostcodeEmbed from "react-daum-postcode";

function Postcode({ setZipcode, setAddress1 }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zipcode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setAddress1(fullAddress);
    setZipcode(zipcode);
  };

  return <DaumPostcodeEmbed onComplete={handleComplete} />;
}

export default Postcode;
