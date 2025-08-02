"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import PostForm from "./components/PostForm";
import PostsFeed from "./components/PostsFeed";

export default function Home() {
  const { user, userProfile, initializing, logout, initializeAuth } =
    useAuthStore();
  const router = useRouter();
  const [feedKey, setFeedKey] = useState(0);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handlePostCreated = () => {
    // Force feed to refresh by changing key
    setFeedKey((prev) => prev + 1);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {userProfile?.name}!
              </h1>
              <p className="text-gray-600 mt-2">Email: {userProfile?.email}</p>
              {userProfile?.bio && (
                <p className="text-gray-600 mt-1">Bio: {userProfile.bio}</p>
              )}
              <div className="mt-4">
                <Link
                  href={`/profile/${user.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View Profile →
                </Link>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Post Creation Form */}
        <PostForm onPostCreated={handlePostCreated} />

        {/* Posts Feed */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Recent Posts
          </h2>
          <PostsFeed key={feedKey} />
        </div>
      </div>
    </div>
  );
}
