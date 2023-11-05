import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_API_SUPABASE_URL,
  import.meta.env.VITE_API_SUPABASE_KEY
);

export default supabase;
