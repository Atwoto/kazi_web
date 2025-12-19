import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a dummy client for build time - will fail at runtime if used without env vars
  supabase = new Proxy({} as SupabaseClient, {
    get() {
      throw new Error("Missing Supabase environment variables");
    },
  });
}

export { supabase };
