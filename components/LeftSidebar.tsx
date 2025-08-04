"use client";

import { useAuthStore } from "@/store/authStore";

export default function LeftSidebar() {
  const { userProfile } = useAuthStore();

  return (
    <div className="sticky top-20">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div
          className="h-16"
          style={{
            background: "linear-gradient(to right, #0A66C2, #084d94)",
          }}
        ></div>
        <div className="px-4 pb-4">
          <div className="relative -mt-8 mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center border-3 border-white">
              <span className="text-xl font-bold text-gray-600">
                {userProfile?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {userProfile?.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {userProfile?.bio || "Professional"}
          </p>
          <div className="border-t pt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Profile viewers</span>
              <span className="font-medium" style={{ color: "#0A66C2" }}>
                12
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Post impressions</span>
              <span className="font-medium" style={{ color: "#0A66C2" }}>
                1,234
              </span>
            </div>
          </div>
        </div>
        <div className="border-t px-4 py-3">
          <p className="text-xs text-gray-600 mb-2">
            Get hired faster with exclusive tools & features
          </p>
          <div className="flex items-center text-xs text-amber-600 font-medium">
            <div className="w-3 h-3 bg-amber-400 rounded-sm mr-2"></div>
            Try Premium for ₹0
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow mt-4 p-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
            <span className="mr-3">📋</span>
            Saved items
          </div>
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
            <span className="mr-3">👥</span>
            Groups
          </div>
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
            <span className="mr-3">📅</span>
            Events
          </div>
          <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
            <span className="mr-3">📰</span>
            Newsletters
          </div>
        </div>
      </div>
    </div>
  );
}
