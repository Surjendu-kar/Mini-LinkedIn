"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabase";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { FaRegImage } from "react-icons/fa6";
import Image from "next/image";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export default function PostModal({
  isOpen,
  onClose,
  onPostCreated,
}: PostModalProps) {
  const { user, userProfile } = useAuthStore();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Please write something before posting");
      return;
    }

    if (!user || !userProfile) {
      setError("You must be logged in to post");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error: postError } = await supabase.from("posts").insert([
        {
          content: content.trim(),
          author_id: user.id,
          author_name: userProfile.name,
        },
      ]);

      if (postError) {
        throw postError;
      }

      // Clear form and notify parent
      setContent("");
      onPostCreated();
      onClose();

      // Show success toast
      toast.success("Post shared successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create post";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const formEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      handleSubmit(formEvent as unknown as React.FormEvent);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setContent("");
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50 p-4"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-gray-600">
                {userProfile?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg capitalize ml-1">
                {userProfile?.name}
              </h3>
              <select className="text-sm text-gray-500 border-none bg-transparent focus:outline-none">
                <option>Post to Anyone</option>
                <option>LinkedIn</option>
                <option>Connections only</option>
              </select>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-4 lg:p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Post Content */}
          <div className="mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What do you want to talk about?"
              className="w-full p-0 border-none resize-none focus:outline-none text-lg text-gray-900 placeholder-gray-500 min-h-[200px] caret-gray-900"
              maxLength={1000}
              disabled={loading}
              autoFocus
            />
          </div>

          {/* Emoji and Media Icons */}
          <div className="flex items-center space-x-4 mb-6">
            <button
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading}
              title="Add emoji"
            >
              <HiOutlineEmojiHappy className="w-6 h-6" />
            </button>

            <button
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading}
              title="Add photo"
            >
              <FaRegImage className="w-6 h-6" style={{ color: "#0A66C2" }} />
            </button>

            <button
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading}
              title="Add video"
            >
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <button
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading}
              title="Add event"
            >
              <Image
                src="/logo/calendar.svg"
                alt="Calendar"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>

            <button
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading}
              title="More options"
            >
              <Image
                src="/logo/plus.svg"
                alt="Plus"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sm text-gray-500">
                Anyone can see this post
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="px-6 py-2 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
              style={{
                backgroundColor: "#0A66C2",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#084d94")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A66C2")
              }
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
