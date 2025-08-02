"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearError } = useAuthStore();
  const router = useRouter();

  // Footer links array
  const footerLinks = [
    "User Agreement",
    "Privacy Policy",
    "Community Guidelines",
    "Cookie Policy",
    "Copyright Policy",
    "Send Feedback",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
      router.push("/");
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* LinkedIn Logo */}
      <div className="pt-6 pl-6">
        <Image
          src="/logo/Linkedin.svg"
          alt="LinkedIn"
          width={135}
          height={34}
          className="h-8 w-auto"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center my-auto">
        <div className="w-full max-w-md">
          {/* Sign in Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-normal text-gray-900 mb-2">
                Sign in
              </h1>
              <p className="text-gray-600">
                Stay updated on your professional world
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                    {error}
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] text-[15px]"
                    placeholder="Email or Phone"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] pr-16 text-[15px]"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0A66C2] hover:text-[#084d94] font-medium text-sm cursor-pointer"
                  >
                    {showPassword ? "hide" : "show"}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="text-left">
                  <button
                    type="button"
                    className="text-[#0A66C2] hover:text-[#084d94] font-medium text-sm"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Sign In Button - Outside space-y-4 container */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full bg-[#0A66C2] hover:bg-[#084d94] text-white font-medium py-3 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Divider - Outside form */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign In Button - Outside form */}
            <button
              type="button"
              className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-full transition-colors flex items-center justify-center space-x-3 cursor-pointer"
            >
              <Image
                src="/logo/Google.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>
          </div>

          {/* New to LinkedIn - Outside the card */}
          <div className="text-center mt-6">
            <span className="text-gray-600">New to LinkedIn? </span>
            <Link
              href="/auth/signup"
              className="text-[#0A66C2] hover:text-[#084d94] font-medium"
            >
              Join now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2 mb-4 lg:mb-0">
              <Image
                src="/logo/Linkedin.svg"
                alt="LinkedIn"
                width={67}
                height={17}
                className="h-4 w-auto"
              />
              <span className="text-gray-600">© 2025</span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {footerLinks.map((link, index) => (
                <a key={index} href="#" className="hover:text-[#0A66C2]">
                  {link}
                </a>
              ))}
              <div className="flex items-center">
                <span>Language</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
