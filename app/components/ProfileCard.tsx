"use client";

import { UserProfile } from "@/lib/supabase";

interface ProfileCardProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  postsCount: number;
}

export default function ProfileCard({
  profile,
  isOwnProfile,
  postsCount,
}: ProfileCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Background */}
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Profile Picture Placeholder */}
        <div className="relative -mt-16 mb-4">
          <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
          </div>

          {profile.bio && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About
              </h3>
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* Stats */}
          <div className="flex space-x-8 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {postsCount}
              </div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {formatDate(profile.created_at)}
              </div>
              <div className="text-sm text-gray-500">Joined</div>
            </div>
          </div>

          {/* Actions */}
          {isOwnProfile && (
            <div className="pt-4">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
