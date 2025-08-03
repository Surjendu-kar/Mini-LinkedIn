"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import PostForm from "./components/PostForm";
import PostsFeed from "./components/PostsFeed";

export default function Home() {
  const { user, userProfile, initializing } = useAuthStore();
  const router = useRouter();
  const [feedKey, setFeedKey] = useState(0);

  useEffect(() => {
    if (!initializing && !user) {
      router.push("/auth/login");
    }
  }, [initializing, user, router]);

  const handlePostCreated = () => {
    // Force feed to refresh by changing key
    setFeedKey((prev) => prev + 1);
  };

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-[14px]">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Profile Info */}
          <div className="col-span-3">
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
                      <span
                        className="font-medium"
                        style={{ color: "#0A66C2" }}
                      >
                        12
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Post impressions</span>
                      <span
                        className="font-medium"
                        style={{ color: "#0A66C2" }}
                      >
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
          </div>

          {/* Center - Main Feed */}
          <div className="col-span-6">
            {/* Post Creation Form */}
            <PostForm onPostCreated={handlePostCreated} />

            {/* Posts Feed */}
            <div className="mt-6">
              <PostsFeed key={feedKey} />
            </div>
          </div>

          {/* Right Sidebar - News */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">LinkedIn News</h3>
                <span className="text-gray-400">ℹ️</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Top stories
                  </h4>
                  <div className="space-y-3">
                    <div className="cursor-pointer">
                      <p
                        className="text-sm text-gray-800 hover:cursor-pointer"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#0A66C2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#1f2937")
                        }
                      >
                        New UPI rules kick in today
                      </p>
                      <p className="text-xs text-gray-500">
                        1d ago • 7,45,174 readers
                      </p>
                    </div>
                    <div className="cursor-pointer">
                      <p
                        className="text-sm text-gray-800 hover:cursor-pointer"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#0A66C2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#1f2937")
                        }
                      >
                        Top cities see salaries rise
                      </p>
                      <p className="text-xs text-gray-500">
                        2d ago • 10,938 readers
                      </p>
                    </div>
                    <div className="cursor-pointer">
                      <p
                        className="text-sm text-gray-800 hover:cursor-pointer"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#0A66C2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#1f2937")
                        }
                      >
                        New tariffs cloud India-U.S. trade talks
                      </p>
                      <p className="text-xs text-gray-500">
                        1d ago • 6,012 readers
                      </p>
                    </div>
                    <div className="cursor-pointer">
                      <p
                        className="text-sm text-gray-800 hover:cursor-pointer"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#0A66C2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#1f2937")
                        }
                      >
                        Want to stand out? Say hello
                      </p>
                      <p className="text-xs text-gray-500">
                        2d ago • 53,111 readers
                      </p>
                    </div>
                    <div className="cursor-pointer">
                      <p
                        className="text-sm text-gray-800 hover:cursor-pointer"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#0A66C2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#1f2937")
                        }
                      >
                        TCS to let go of 12,000 people
                      </p>
                      <p className="text-xs text-gray-500">
                        2d ago • 40,512 readers
                      </p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-500 hover:text-gray-700 mt-3">
                    Show more ▼
                  </button>
                </div>
              </div>
            </div>

            {/* Today's Puzzle */}
            <div className="bg-white rounded-lg shadow p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Today&apos;s puzzle
              </h3>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-bold">🧩</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Zip - a quick brain teaser
                  </p>
                  <p className="text-xs text-gray-500">Play in 30 sec</p>
                </div>
              </div>
            </div>

            {/* Promoted Content */}
            <div className="bg-white rounded-lg shadow p-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Promoted</span>
                <span className="text-gray-400">⋯</span>
              </div>
              <div className="flex items-center">
                <div
                  className="w-17 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: "#e6f3ff" }}
                >
                  <span className="font-bold" style={{ color: "#0A66C2" }}>
                    H
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {userProfile?.name}, explore relevant opportunities with
                    Hempel A/S
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Get the latest about what&apos;s new at our company
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
