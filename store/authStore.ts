import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { supabase, UserProfile } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  initializing: boolean; // For auth state initialization
  loading: boolean; // For form submissions
  error: string | null;
  authListenerSetup: boolean; // Track if auth listener is set up

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
  setupAuthListener: () => void;
  updateProfile: (updatedProfile: UserProfile) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userProfile: null,
  initializing: true,
  loading: false,
  error: null,
  authListenerSetup: false,

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
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      set({ user: null, userProfile: null, error: null });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      set({ error: errorMessage });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  updateProfile: (updatedProfile: UserProfile) => {
    set({ userProfile: updatedProfile });
  },

  setupAuthListener: () => {
    const currentState = get();
    if (currentState.authListenerSetup) {
      return;
    }

    // Listen for auth changes (only set up once)
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        set({ user: null, userProfile: null });
        return;
      }

      if (session?.user) {
        const currentState = get();
        // Set user immediately, preserve profile if it's for the same user
        set({
          user: session.user,
          userProfile:
            currentState.userProfile?.id === session.user.id
              ? currentState.userProfile
              : null, // Will be updated when profile loads
        });

        // Only fetch profile if we don't already have one for this user
        const updatedState = get();
        if (
          !updatedState.userProfile ||
          updatedState.userProfile.id !== session.user.id
        ) {
          // Get user profile with timeout
          const profilePromise = supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Profile fetch timeout")), 3000)
          );

          try {
            const { data: profile, error: profileError } = await Promise.race([
              profilePromise,
              timeoutPromise,
            ]);

            if (!profileError && profile) {
              // Update profile separately
              set({ userProfile: profile });
            }
          } catch {
            // Continue without profile - user is still authenticated
          }
        }
      } else {
        set({ user: null, userProfile: null });
      }
    });

    set({ authListenerSetup: true });
  },

  initializeAuth: async () => {
    const currentState = get();

    // Prevent multiple initializations
    if (!currentState.initializing) {
      return;
    }

    try {
      // Set up auth listener first
      get().setupAuthListener();

      // Get initial session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        set({ user: null, userProfile: null, initializing: false });
        return;
      }

      if (session?.user) {
        // Set user and complete initialization immediately
        set({
          user: session.user,
          userProfile: null, // Will be loaded separately
          initializing: false,
        });

        // Load profile separately (non-blocking)
        const profilePromise = supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Profile fetch timeout")), 3000)
        );

        try {
          const { data: profile, error: profileError } = await Promise.race([
            profilePromise,
            timeoutPromise,
          ]);

          if (!profileError && profile) {
            // Update profile after initialization is complete
            set({ userProfile: profile });
          }
        } catch {
          // Continue without profile - user is still authenticated
        }
      } else {
        set({ user: null, userProfile: null, initializing: false });
      }
    } catch {
      set({ user: null, userProfile: null, initializing: false });
    }
  },
}));
