"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const { user, userProfile, logout } = useAuthStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search:", searchQuery);
  };

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left Section - Logo & Search */}
          <div className="flex items-center space-x-4">
            {/* LinkedIn Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo/In.svg"
                alt="LinkedIn"
                width={34}
                height={34}
                className="h-8 w-8"
              />
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-70 pl-10 pr-4 py-2 bg-gray-100 border border-gray-400 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] transition-all"
                />
              </div>
            </form>
          </div>

          {/* Right Section - Navigation Icons */}
          <div className="flex items-center space-x-6">
            {/* Home */}
            <Link
              href="/"
              className="flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg
                className="h-6 w-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z" />
              </svg>
              <span className="text-xs font-medium">Home</span>
            </Link>

            {/* My Network */}
            <button className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors group">
              <svg
                className="h-6 w-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z" />
              </svg>
              <span className="text-xs font-medium">My Network</span>
            </button>

            {/* Jobs */}
            <button className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors group">
              <svg
                className="h-6 w-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z" />
              </svg>
              <span className="text-xs font-medium">Jobs</span>
            </button>

            {/* Messaging */}
            <button className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors group">
              <svg
                className="h-6 w-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z" />
              </svg>
              <span className="text-xs font-medium">Messaging</span>
            </button>

            {/* Notifications */}
            <button className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors group">
              <svg
                className="h-6 w-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z" />
              </svg>
              <span className="text-xs font-medium">Notifications</span>
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <div className="relative top-[3px] w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mb-1">
                  <span className="text-xs font-bold text-gray-600">
                    {userProfile?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-medium">Me</span>
                  <svg
                    className={`h-5 w-5 ml-0 transition-transform ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute -right-60 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg pt-2 z-50 overflow-hidden">
                  <div className="px-3 py-1 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-600">
                          {userProfile?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {userProfile?.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {userProfile?.bio}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/profile/${user.id}`}
                    className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    View Profile
                  </Link>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* For Business Dropdown */}
            <button className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors group">
              <svg
                className="h-6 w-6 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 3h4v4H3zm7 4h4V3h-4zm7-4v4h4V3zM3 14h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4zM3 21h4v-4H3zm7 0h4v-4h-4zm7 0h4v-4h-4z" />
              </svg>
              <div className="flex items-center">
                <span className="text-xs font-medium">For Business</span>
                <svg
                  className="h-5 w-5 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </button>

            {/* Try Premium */}
            <Link
              href="#"
              className="text-xs font-medium text-amber-600 hover:text-amber-700 underline"
            >
              Try Premium for ₹0
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
