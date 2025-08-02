import { create } from "zustand";
import { User } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  createdAt: Date;
}

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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userProfile: null,
  initializing: true,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get user profile from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const profileData = userDoc.data();
        set({
          user: userCredential.user,
          userProfile: {
            id: userCredential.user.uid,
            name: profileData.name,
            email: profileData.email,
            bio: profileData.bio,
            createdAt: profileData.createdAt.toDate(),
          },
          loading: false,
        });
      } else {
        set({ user: userCredential.user, loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
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
      console.log("Starting signup process...");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created successfully:", userCredential.user.uid);

      // Create user profile in Firestore
      const userProfile = {
        name,
        email,
        bio,
        createdAt: new Date(),
      };

      console.log("Creating user profile in Firestore...");
      await setDoc(doc(db, "users", userCredential.user.uid), userProfile);
      console.log("User profile created successfully");

      // Sign out the user after successful signup
      await signOut(auth);
      console.log("User signed out after signup");

      set({
        user: null,
        userProfile: null,
        loading: false,
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, userProfile: null, error: null });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  initializeAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const profileData = userDoc.data();
          set({
            user,
            userProfile: {
              id: user.uid,
              name: profileData.name,
              email: profileData.email,
              bio: profileData.bio,
              createdAt: profileData.createdAt.toDate(),
            },
            initializing: false,
          });
        }
      } else {
        set({ user: null, userProfile: null, initializing: false });
      }
    });
  },
}));
