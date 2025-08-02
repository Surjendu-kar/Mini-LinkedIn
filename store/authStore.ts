import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { supabase, UserProfile } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  initializing: boolean; // For auth state initialization
  loading: boolean; // For form submissions
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    bio: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userProfile: null,
  initializing: true,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });

      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile from database
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
      }

      set({
        user: data.user,
        userProfile: profile,
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  signup: async (
    email: string,
    password: string,
    name: string,
    bio: string
  ) => {
    try {
      set({ loading: true, error: null });

      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Create user profile in database
      if (data.user) {
        const { error: profileError } = await supabase.from("users").insert([
          {
            id: data.user.id,
            name,
            email,
            bio,
          },
        ]);

        if (profileError) throw profileError;
      }

      // Sign out after successful signup
      await supabase.auth.signOut();

      set({
        user: null,
        userProfile: null,
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Signup failed";
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null, userProfile: null, error: null });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      set({ error: errorMessage });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  initializeAuth: () => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Get user profile
        supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data: profile }) => {
            set({
              user: session.user,
              userProfile: profile,
              initializing: false,
            });
          });
      } else {
        set({ user: null, userProfile: null, initializing: false });
      }
    });

    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        // Get user profile
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        set({
          user: session.user,
          userProfile: profile,
          initializing: false,
        });
      } else {
        set({ user: null, userProfile: null, initializing: false });
      }
    });
  },
}));
