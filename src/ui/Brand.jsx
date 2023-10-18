function Brand({ brands }) {
  return (
    <div>
      {brands.map((brand) => (
        <p key={brand.id}>{brand.title}</p>
      ))}
    </div>
  );
}

export default Brand;
