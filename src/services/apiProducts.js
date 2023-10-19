import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("product").select(
    `
  *,
  brand (
    id, title
  )
`
  );

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

/*
// 브랜드 불러오기 전
export async function getProducts(col) {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq(col, true);

  if (error) {
    console.error(error);
    throw new Error("New products could not be loaded");
  }

  return data;
}
*/

export async function getProductsByFeatures(feature) {
  // 브랜드 나옴 + 필터 잘 됨
  const { data, error } = await supabase
    .from("product")
    .select(
      `
    *,
    brand (
      id, title
    )
  `
    )
    .eq(feature, true);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;

  /*
  let { data, error } = await supabase.from("brand").select(`
    id, title,
    product (*)
  `);

  return data;
  */
}

export async function getBrands() {
  const { data, error } = await supabase.from("brand").select("*");

  if (error) {
    console.error(error);
    throw new Error("Brands could not be loaded");
  }

  return data;
}

export async function getProductsByFilters(filters) {
  // 브랜드만 필터 걸어서 가져오기
  /*
  const { selectedBrand, filteredPrice } = filters;
  const { data, error } = await supabase
    .from("product")
    .select(
      `
    *,
    brand (
      id, title
    )
  `
    )
    .in("brandId", selectedBrand);
  */

  // 필터 통째로
  const { selectedBrand, selectedPrice, selectedCategory } = filters;
  const filtersString = `and(brandId.in.(${selectedBrand.join(
    ","
  )}),price.lte.${selectedPrice},categoryId.in.(${selectedCategory}))`;
  console.log("filtersString", filtersString);

  const { data, error } = await supabase
    .from("product")
    .select(
      `
    *,
    brand (
      id, title
    )
  `
    )
    .or(filtersString);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  console.log("data", data);
  return data;
}
