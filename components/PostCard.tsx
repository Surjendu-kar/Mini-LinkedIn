"use client";

import { Post } from "@/lib/supabase";
import Link from "next/link";

interface PostCardProps {
  post: Post;
  showAuthor?: boolean;
}

export default function PostCard({ post, showAuthor = true }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return diffInMinutes < 1 ? "Just now" : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Post Header */}
      {showAuthor && (
        <div className="flex items-center mb-2 lg:mb-4">
          <div className="w-10 h-10 lg:w-10 lg:h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            <span className="text-md font-bold text-gray-600 capitalize">
              {post.author_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-1 justify-between">
            <div>
              <Link
                href={`/profile/${post.author_id}`}
                className="font-semibold text-gray-900 hover:text-[#0A66C2] transition-colors capitalize"
              >
                {post.author_name}
              </Link>
              <p className="text-sm text-gray-500 capitalize">
                {post.users?.bio || "Professional"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {formatDate(post.created_at)}
              </p>
            </div>
          </div>
        </div>
      )}

      {!showAuthor && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
        </div>
      )}

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
        <button className="flex items-center space-x-2 text-gray-500 hover:text-[#0A66C2] transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="text-sm">Like</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-500 hover:text-[#0A66C2] transition-colors">
          <svg
            className="w-5 h-5"
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
          <span className="text-sm">Comment</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-500 hover:text-[#0A66C2] transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
}
