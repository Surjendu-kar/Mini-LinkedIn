import { createClient } from "@supabase/supabase-js";

// Replace these with your Supabase project credentials
const supabaseUrl = "https://uuyqhvavlxzciohlxmkd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1eXFodmF2bHh6Y2lvaGx4bWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNDU3MjYsImV4cCI6MjA2OTcyMTcyNn0.AxiPHnEiZrIHmdBtBawZmxcFNioWlWEFOA-Vr4S6zOo";

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
