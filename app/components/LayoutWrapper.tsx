"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import Navbar from "./Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { initializeAuth, initializing } = useAuthStore();

  // Initialize auth once globally
  useEffect(() => {
    initializeAuth();

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      const currentState = useAuthStore.getState();
      if (currentState.initializing) {
        useAuthStore.setState({ initializing: false });
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [initializeAuth]);

  // Reset scroll position when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Don't show navbar on auth pages
  const isAuthPage = pathname?.startsWith("/auth");

  // Show loading screen while initializing
  if (initializing) {
    return (
      <>
        <style jsx global>{`
          @keyframes linkedinLoading {
            0% {
              width: 0%;
              opacity: 0.8;
              margin-left: auto;
            }
            50% {
              width: 70%;
              opacity: 1;
              margin-left: auto;
            }
            100% {
              width: 100%;
              opacity: 0.8;
              margin-left: 0;
            }
          }

          .loading-bar {
            animation: linkedinLoading 2s ease-in-out infinite;
          }
        `}</style>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            {/* LinkedIn Logo */}
            <div className="mb-4">
              <Image
                src="/logo/Linkedin.svg"
                alt="LinkedIn"
                width={128}
                height={32}
                priority
              />
            </div>

            {/* Loading Progress Bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full loading-bar"
                style={{
                  backgroundColor: "#0A66C2",
                }}
              ></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className={!isAuthPage ? "pt-14" : ""}>{children}</div>
    </>
  );
}
