function Brand({ brands }) {
  const sortedBrands = brands.sort((a, b) => (a.title < b.title ? -1 : 1));

  return (
    <div>
      {sortedBrands.map((brand) => (
        <p key={brand.id}>{brand.title}</p>
      ))}
    </div>
  );
}

export default Brand;
