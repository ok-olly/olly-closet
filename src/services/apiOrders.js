import supabase from "./supabase";

export async function getOrdersByUser(email) {
  let { data, error } = await supabase
    .from("order")
    .select("*")
    .eq("user_id", email)
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateOrderInfo(id, info) {
  const { data, error } = await supabase
    .from("order")
    .update(info)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}
