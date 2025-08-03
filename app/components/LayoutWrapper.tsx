"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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
    if (initializing) {
      initializeAuth();
    }
  }, []);

  // Don't show navbar on auth pages
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className={!isAuthPage ? "pt-14" : ""}>{children}</div>
    </>
  );
}
