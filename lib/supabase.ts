import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  created_at: string;
}

export interface Post {
  id: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
  users?: {
    bio: string;
  };
}
