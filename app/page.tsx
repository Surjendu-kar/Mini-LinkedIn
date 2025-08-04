"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import LeftSidebar from "../components/LeftSidebar";
import CenterFeed from "../components/CenterFeed";
import RightSidebar from "../components/RightSidebar";

export default function Home() {
  const { user, initializing } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !user) {
      router.push("/auth/login");
    }
  }, [initializing, user, router]);

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
            <LeftSidebar />
          </div>

          {/* Center - Main Feed */}
          <div className="col-span-6">
            <CenterFeed />
          </div>

          {/* Right Sidebar - News */}
          <div className="col-span-3">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
