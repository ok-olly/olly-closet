import Heading from "./Heading";

function Title({ brandTitle, productTitle }) {
  return (
    <div>
      <Heading as="h3">{brandTitle}</Heading>
      <h2>{productTitle}</h2>
    </div>
  );
}

export default Title;
