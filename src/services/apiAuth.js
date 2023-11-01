import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const address = {
    address1: "",
    address2: "",
    zipcode: "",
  };

  const phoneNumber = "010-1234-5678";

  const cart = [];

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        address,
        phoneNumber,
        cart,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  address,
  phoneNumber,
  cart,
}) {
  let updateData;
  if (password) updateData = { password };
  if (address) updateData = { data: { address } };
  if (phoneNumber) updateData = { data: { phoneNumber } };
  if (fullName) updateData = { data: { fullName } };
  if (cart) updateData = { data: { cart } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  return data?.user;
}
