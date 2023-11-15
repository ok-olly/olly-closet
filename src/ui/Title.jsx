import Heading from "../components/Heading";

function Title({ brandTitle, productTitle }) {
  return (
    <div>
      <Heading as="h3">{brandTitle}</Heading>
      <Heading as="h6">{productTitle}</Heading>
    </div>
  );
}

export default Title;
