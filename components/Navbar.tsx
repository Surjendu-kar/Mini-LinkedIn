"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MdSearch } from "react-icons/md";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const { user, userProfile, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Refs for navigation items
  const homeRef = useRef<HTMLAnchorElement>(null);
  const networkRef = useRef<HTMLButtonElement>(null);
  const jobsRef = useRef<HTMLButtonElement>(null);
  const messagingRef = useRef<HTMLButtonElement>(null);
  const notificationsRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLButtonElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // State for animated border
  const [borderStyle, setBorderStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });

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

  // Update border position based on active route
  useEffect(() => {
    const updateBorderPosition = () => {
      if (!navContainerRef.current) return;

      let activeRef: React.RefObject<HTMLElement | null> | null = null;
      let width = 0;

      if (pathname === "/") {
        activeRef = homeRef;
        width = 48; // w-12
      } else if (pathname === "/network") {
        activeRef = networkRef;
        width = 64; // w-16
      } else if (pathname === "/jobs") {
        activeRef = jobsRef;
        width = 40; // w-10
      } else if (pathname === "/messaging") {
        activeRef = messagingRef;
        width = 64; // w-16
      } else if (pathname === "/notifications") {
        activeRef = notificationsRef;
        width = 80; // w-20
      } else if (pathname?.startsWith("/profile")) {
        activeRef = profileRef;
        width = 48; // w-12
      }

      if (activeRef?.current && navContainerRef.current) {
        const navRect = navContainerRef.current.getBoundingClientRect();
        const activeRect = activeRef.current.getBoundingClientRect();
        const left =
          activeRect.left - navRect.left + activeRect.width / 2 - width / 2;

        setBorderStyle({
          width,
          left,
          opacity: 1,
        });
      } else {
        setBorderStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateBorderPosition, 50);

    // Update on window resize
    window.addEventListener("resize", updateBorderPosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateBorderPosition);
    };
  }, [pathname]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left Section - Logo & Search */}
          <div className="flex items-center space-x-5 flex-1 lg:flex-none">
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

            {/* Desktop Search Bar */}
            <form onSubmit={handleSearch} className="relative hidden lg:block">
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

            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="lg:hidden p-0 text-gray-600 hover:text-gray-900"
            >
              <MdSearch className="h-6 w-6" />
            </button>
          </div>

          {/* Right Section - Navigation Icons */}
          <div
            ref={navContainerRef}
            className={`flex items-center space-x-0 gap-[22px] lg:gap-0 lg:space-x-7 relative ${
              showMobileSearch ? "lg:flex hidden" : "flex"
            }`}
          >
            {/* Animated Border - Desktop Only */}
            <div
              className="absolute -bottom-1 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-out hidden lg:block"
              style={{
                width: `${borderStyle.width}px`,
                left: `${borderStyle.left}px`,
                opacity: borderStyle.opacity,
              }}
            />

            {/* Home */}
            <Link
              ref={homeRef}
              href="/"
              className={`flex flex-col lg:flex-col items-center transition-colors group relative ${
                pathname === "/"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg
                className={`h-6 w-6 lg:mb-1 ${
                  pathname === "/" ? "text-black" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z" />
              </svg>
              <span className="text-xs font-medium hidden lg:block">Home</span>
            </Link>

            {/* My Network */}
            <button
              ref={networkRef}
              className={`cursor-pointer flex flex-col lg:flex-col items-center transition-colors group relative ${
                pathname === "/network"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg
                className={`h-6 w-6 lg:mb-1 ${
                  pathname === "/network" ? "text-black" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z" />
              </svg>
              <span className="text-xs font-medium hidden lg:block">
                My Network
              </span>
            </button>

            {/* Jobs */}
            <button
              ref={jobsRef}
              className={`cursor-pointer flex flex-col lg:flex-col items-center transition-colors group relative ${
                pathname === "/jobs"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg
                className={`h-6 w-6 lg:mb-1 ${
                  pathname === "/jobs" ? "text-black" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z" />
              </svg>
              <span className="text-xs font-medium hidden lg:block">Jobs</span>
            </button>

            {/* Messaging */}
            <button
              ref={messagingRef}
              className={`cursor-pointer flex flex-col lg:flex-col items-center transition-colors group relative ${
                pathname === "/messaging"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg
                className={`h-6 w-6 lg:mb-1 ${
                  pathname === "/messaging" ? "text-black" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z" />
              </svg>
              <span className="text-xs font-medium hidden lg:block">
                Messaging
              </span>
            </button>

            {/* Notifications */}
            <button
              ref={notificationsRef}
              className={`cursor-pointer flex flex-col lg:flex-col items-center transition-colors group relative ${
                pathname === "/notifications"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <svg
                className={`h-6 w-6 lg:mb-1 ${
                  pathname === "/notifications" ? "text-black" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z" />
              </svg>
              <span className="text-xs font-medium hidden lg:block">
                Notifications
              </span>
            </button>

            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                ref={profileRef}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`cursor-pointer flex flex-col lg:flex-col items-center transition-colors group relative ${
                  pathname?.startsWith("/profile")
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div
                  className={`relative lg:top-[3px] w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center lg:mb-1 ${
                    pathname?.startsWith("/profile") ? "bg-black" : ""
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      pathname?.startsWith("/profile")
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {userProfile?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="lg:flex items-center hidden">
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
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {/* Profile Header */}
                  <div className="p-2 border-b border-gray-200">
                    <div className="flex items-start space-x-2">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-gray-600">
                          {userProfile?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate capitalize">
                          {userProfile?.name}
                        </h3>
                        <p className="text-xs text-gray-600 mt-[1px] capitalize">
                          {userProfile?.bio}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-2">
                      <Link
                        href={`/profile/${user.id}`}
                        className="flex-1 px-4 py-1 border border-[#0A66C2] text-[#0A66C2] text-sm font-medium rounded-full text-center hover:bg-blue-50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        View Profile
                      </Link>
                      <button className="flex-1 px-4 py-1 bg-[#0A66C2] text-white text-sm font-medium rounded-full hover:bg-[#084d94] transition-colors">
                        Verify
                      </button>
                    </div>
                  </div>

                  {/* Account Section */}
                  <div className="">
                    <h4 className="px-3 pt-2 pb-1 text-md font-semibold text-gray-900">
                      Account
                    </h4>

                    <button className="w-full px-3 py-[5px] text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                      <span className="text-amber-500 mr-1">📦</span>
                      Try Premium for ₹0
                    </button>

                    <button className="w-full px-3 py-[5px] text-left text-sm text-gray-500 hover:bg-gray-50">
                      Settings & Privacy
                    </button>

                    <button className="w-full px-3 py-[5px] text-left text-sm text-gray-500 hover:bg-gray-50">
                      Help
                    </button>

                    <button className="w-full px-3 py-[5px] text-left text-sm text-gray-500 hover:bg-gray-50">
                      Language
                    </button>
                  </div>

                  {/* Manage Section */}
                  <div className=" border-t border-gray-200">
                    <h4 className="px-3 py-1 text-md font-semibold text-gray-900 mt-1">
                      Manage
                    </h4>

                    <button className="w-full px-3 py-[5px] text-left text-sm text-gray-500 hover:bg-gray-50">
                      Posts & Activity
                    </button>

                    <button className="w-full px-3 py-[5px] text-left text-sm text-gray-500 hover:bg-gray-50">
                      Job Posting Account
                    </button>
                  </div>

                  {/* Sign Out */}
                  <div className=" border-t border-gray-200">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleLogout();
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50 font-medium  cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* For Business Dropdown */}
            <button className="cursor-pointer flex-col items-center text-gray-600 hover:text-gray-900 transition-colors group hidden lg:flex">
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
              className="flex-col items-center text-amber-600 hover:text-amber-700 transition-colors group hidden lg:flex"
            >
              <svg
                className="h-6 w-6 mb-1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="roundedSquare">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  </clipPath>
                </defs>

                {/* Light golden background (right side) */}
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  ry="5"
                  fill="#F8C77E"
                />

                {/* Dark golden triangle (left side) */}
                <path
                  d="M2 2 L2 22 L22 22 Z"
                  fill="#E7A33E"
                  clipPath="url(#roundedSquare)"
                />
              </svg>
              <span className="text-xs font-medium">Try Premium for ₹0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center h-14">
              {/* LinkedIn Logo */}
              <Link href="/" className="flex-shrink-0 mr-4">
                <Image
                  src="/logo/In.svg"
                  alt="LinkedIn"
                  width={34}
                  height={34}
                  className="h-8 w-8"
                />
              </Link>

              {/* Mobile Search Bar */}
              <form onSubmit={handleSearch} className="flex-1 relative">
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
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-400 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] transition-all"
                    autoFocus
                  />
                </div>
              </form>

              {/* Close Search Button */}
              <button
                onClick={() => setShowMobileSearch(false)}
                className="ml-4 p-2 text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6"
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
          </div>
        </div>
      )}
    </nav>
  );
}
