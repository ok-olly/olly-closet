import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("product").select("*");

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}
