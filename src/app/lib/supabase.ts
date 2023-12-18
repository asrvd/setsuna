import { createClient } from "@supabase/supabase-js";

const s = createClient(
  process.env.SUPABASE_PROJECT_URL as string,
  process.env.SUPABASE_KEY as string
);

export default s;
