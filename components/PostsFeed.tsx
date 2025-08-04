"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase, Post } from "@/lib/supabase";
import PostCard from "./PostCard";

export default function PostsFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setError(null);

      // First get all posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (postsError) {
        throw postsError;
      }

      // Then get user bios for all authors
      const authorIds = [
        ...new Set(postsData?.map((post) => post.author_id) || []),
      ];
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("id, bio")
        .in("id", authorIds);

      if (usersError) {
        console.warn("Failed to load user bios:", usersError);
      }

      // Combine posts with user bios
      const postsWithBios =
        postsData?.map((post) => ({
          ...post,
          users: usersData?.find((user) => user.id === post.author_id) || {
            bio: "",
          },
        })) || [];

      setPosts(postsWithBios);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load posts";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Set up real-time subscription for new posts
  useEffect(() => {
    const channel = supabase
      .channel("posts_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          console.log("Real-time update:", payload);
          // Reload posts when there's a change
          loadPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadPosts]);

  const refreshPosts = () => {
    loadPosts();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <div className="text-red-600 mb-4">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-semibold">Failed to load posts</p>
          <p className="text-sm text-gray-600 mt-1">{error}</p>
        </div>
        <button
          onClick={refreshPosts}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-600">
            Be the first to share something with the community!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showAuthor={true} />
      ))}
    </div>
  );
}
