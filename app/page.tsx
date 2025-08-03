"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import PostForm from "./components/PostForm";
import PostsFeed from "./components/PostsFeed";

export default function Home() {
  const { user, userProfile, initializing } = useAuthStore();
  const router = useRouter();
  const [feedKey, setFeedKey] = useState(0);

  useEffect(() => {
    if (!initializing && !user) {
      router.push("/auth/login");
    }
  }, [initializing, user, router]);

  const handlePostCreated = () => {
    // Force feed to refresh by changing key
    setFeedKey((prev) => prev + 1);
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
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-gray-600">
                {userProfile?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {userProfile?.name}!
            </h1>
            <p className="text-gray-600">{userProfile?.email}</p>
            {userProfile?.bio && (
              <p className="text-gray-600 mt-2">{userProfile.bio}</p>
            )}
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
