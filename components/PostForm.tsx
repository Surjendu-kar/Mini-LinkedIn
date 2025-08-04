"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import PostModal from "./PostModal";

interface PostFormProps {
  onPostCreated: () => void;
}

export default function PostForm({ onPostCreated }: PostFormProps) {
  const { userProfile } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  const handlePostCreated = () => {
    onPostCreated();
    setShowModal(false);
  };

  return (
    <>
      {/* Collapsed "Start a post" view */}
      <div className="bg-white rounded-lg shadow px-4 pt-4 pb-1">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-md lg:text-lg font-bold text-gray-600">
              {userProfile?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 text-left px-4 lg:py-3 py-2 border border-gray-300 rounded-full text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Start a post
          </button>
        </div>

        <div className="flex justify-around mt-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-2 py-3 lg:p-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-sm font-medium">Video</span>
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-2 py-3 lg:p-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#0A66C2" }}
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            <span className="text-sm font-medium">Photo</span>
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-2 py-3 lg:p-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            <span className="text-sm font-medium">Write article</span>
          </button>
        </div>
      </div>

      {/* Post Modal */}
      <PostModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onPostCreated={handlePostCreated}
      />
    </>
  );
}
