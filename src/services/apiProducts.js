import supabase from "./supabase";

/*
export async function getProducts() {
  const { data, error } = await supabase.from("product").select("*");

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}
*/

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

export async function getProducts(col) {
  // 브랜드 나옴 + 필터 잘 됨
  let { data, error } = await supabase
    .from("product")
    .select(
      `
    *,
    brand (
      id, title
    )
  `
    )
    .eq(col, true);

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
