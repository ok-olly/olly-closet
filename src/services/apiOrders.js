import supabase from "./supabase";

export async function getOrdersByUser(email) {
  let { data, error } = await supabase
    .from("order")
    .select("*")
    .eq("user_id", email);

  if (error) throw new Error(error.message);

  return data;
}
