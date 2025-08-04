"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { supabase, UserProfile, Post } from "@/lib/supabase";
import ProfileCard from "@/app/components/ProfileCard";
import PostCard from "@/app/components/PostCard";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = params.userId as string;

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Load user profile
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        throw new Error("Profile not found");
      }

      setProfile(profileData);

      // Load user's posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .eq("author_id", userId)
        .order("created_at", { ascending: false });

      if (postsError) {
        console.error("Error loading posts:", postsError);
      } else {
        setPosts(postsData || []);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load profile";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    loadProfile();
  }, [user, loadProfile, router]);

  const isOwnProfile = user?.id === userId;

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-[#0A66C2] text-white rounded-md hover:bg-[#084d94]"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Profile Details */}
          <div className="col-span-9">
            {/* Main Profile Card */}
            {loading ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="animate-pulse">
                  <div className="h-72 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ) : profile ? (
              <ProfileCard
                profile={profile}
                isOwnProfile={isOwnProfile}
                onProfileUpdate={(updatedProfile) => setProfile(updatedProfile)}
              />
            ) : null}

            {/* Activity Section */}
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Activity
                  </h2>
                  <p className="text-sm" style={{ color: "#0A66C2" }}>
                    {posts.length} posts
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {isOwnProfile && (
                    <button
                      className="px-4 py-2 border rounded-full text-sm font-medium transition-colors"
                      style={{
                        borderColor: "#0A66C2",
                        color: "#0A66C2",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f0f7ff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      Create a post
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-900 font-medium mb-1">
                    {isOwnProfile
                      ? "You haven't posted yet"
                      : `${profile?.name} hasn't posted yet`}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Posts you share will be displayed here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <PostCard post={post} showAuthor={false} />
                    </div>
                  ))}
                  {posts.length > 3 && (
                    <div className="text-center pt-4">
                      <button className="text-gray-600 hover:text-gray-900 font-medium">
                        Show all activity →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            {/* Profile Language */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Profile language
                </h3>
                {isOwnProfile && (
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-gray-600">English</p>
            </div>

            {/* Public Profile & URL */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Public profile & URL
                </h3>
                {isOwnProfile && (
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-gray-600 break-all">
                www.linkedin.com/in/
                {profile?.name?.toLowerCase().replace(/\s+/g, "-") || "user"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
