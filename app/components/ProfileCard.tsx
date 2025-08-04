"use client";

import { useState } from "react";
import { UserProfile, supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

interface ProfileCardProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  onProfileUpdate?: (updatedProfile: UserProfile) => void;
}

export default function ProfileCard({
  profile,
  isOwnProfile,
  onProfileUpdate,
}: ProfileCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    bio: profile.bio,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, updateProfile } = useAuthStore();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: updateError } = await supabase
        .from("users")
        .update({
          name: editForm.name.trim(),
          bio: editForm.bio.trim(),
        })
        .eq("id", user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Update the auth store with new profile data
      updateProfile(data);

      // Also update the local profile state to ensure immediate UI update
      setEditForm({
        name: data.name,
        bio: data.bio,
      });

      // Call the callback to update parent component
      if (onProfileUpdate && data) {
        onProfileUpdate(data);
      }

      setShowEditModal(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditForm({
      name: profile.name,
      bio: profile.bio,
    });
    setError(null);
    setShowEditModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Background */}
      <div className="h-32 bg-gradient-to-r from-[#0A66C2] to-[#084d94]"></div>

      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Profile Picture Placeholder */}
        <div className="relative -mt-16 mb-4">
          <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-30 h-30 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-5xl font-bold text-gray-600">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-2">
          <div>
            {profile.name && (
              <h1 className="text-2xl font-semibold text-gray-900">
                {profile.name}
              </h1>
            )}
            {profile.bio && (
              <div className="flex justify-between items-start">
                <p className="text-gray-700 leading-relaxed flex-1">
                  {profile.bio}
                </p>
                <p className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                  {formatDate(profile.created_at)} joined
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          {isOwnProfile && (
            <div className="pt-4">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 bg-[#0A66C2] text-white rounded-md hover:bg-[#084d94] transition-colors"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Profile
              </h2>
              <button
                onClick={handleEditCancel}
                className="text-gray-400 hover:text-gray-600 p-1"
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
            <form onSubmit={handleEditSubmit} className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent"
                    placeholder="Enter your name"
                    disabled={loading}
                  />
                </div>

                {/* Bio Field */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({ ...editForm, bio: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent resize-none"
                    placeholder="Tell us about yourself"
                    maxLength={500}
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {editForm.bio.length}/500 characters
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  disabled={loading}
                  className="cursor-pointer px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !editForm.name.trim()}
                  className="cursor-pointer px-4 py-2 bg-[#0A66C2] text-white rounded-md hover:bg-[#084d94] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
