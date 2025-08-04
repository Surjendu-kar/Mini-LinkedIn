"use client";

import { useAuthStore } from "@/store/authStore";

export default function RightSidebar() {
  const { userProfile } = useAuthStore();

  return (
    <div>
      {/* LinkedIn News */}
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
                <p className="text-xs text-gray-500">2d ago • 10,938 readers</p>
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
                <p className="text-xs text-gray-500">1d ago • 6,012 readers</p>
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
                <p className="text-xs text-gray-500">2d ago • 53,111 readers</p>
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
                <p className="text-xs text-gray-500">2d ago • 40,512 readers</p>
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
              {userProfile?.name}, explore relevant opportunities with Hempel
              A/S
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Get the latest about what&apos;s new at our company
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
