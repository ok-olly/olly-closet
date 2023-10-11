import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fazwjunlniuwsnlgilgm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhendqdW5sbml1d3NubGdpbGdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwMTA3OTIsImV4cCI6MjAxMjU4Njc5Mn0.f-5cr7S-WG7mDvmfyk0ybqZMD21OK1yIiSAxdzI6Aug";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
