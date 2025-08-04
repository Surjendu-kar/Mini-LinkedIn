"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const { signup, loading, clearError } = useAuthStore();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.bio
      );
      // After successful signup, redirect to login page
      router.push("/auth/login");
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
        <div className="w-full max-w-sm lg:max-w-md m-4 lg:m-0">
          {/* Sign up Card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 lg:p-8 mt-4 lg:mt-0">
            <div className="text-center mb-6">
              <h1 className="text-2xl lg:text-3xl font-normal text-gray-900 lg:mb-2 mb-1">
                Join LinkedIn
              </h1>
              <p className="text-gray-600 text-sm lg:text-md">
                Make the most of your professional life
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-3 lg:space-y-4">
                {/* Name Input */}
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] text-[15px]"
                    placeholder="Full Name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] text-[15px]"
                    placeholder="Email"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] text-[15px]"
                    placeholder="Password (6+ characters)"
                  />
                </div>

                {/* Bio Input */}
                <div>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] text-[15px] resize-none"
                    placeholder="Tell us about yourself (optional)"
                  />
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="lg:text-md text-sm cursor-pointer w-full bg-[#0A66C2] hover:bg-[#084d94] text-white font-medium py-3 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? "Creating account..." : "Agree & Join"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative lg:my-4 my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign Up Button */}
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
              <span className="lg:text-md text-sm">Continue with Google</span>
            </button>

            {/* Terms Agreement */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                By clicking Agree & Join or Continue, you agree to the LinkedIn{" "}
                <a href="#" className="text-[#0A66C2] hover:text-[#084d94]">
                  User Agreement
                </a>
                ,{" "}
                <a href="#" className="text-[#0A66C2] hover:text-[#084d94]">
                  Privacy Policy
                </a>
                , and{" "}
                <a href="#" className="text-[#0A66C2] hover:text-[#084d94]">
                  Cookie Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* Already have account - Outside the card */}
          <div className="text-center mt-6 lg:text-md text-sm">
            <span className="text-gray-600 ">Already on LinkedIn? </span>
            <Link
              href="/auth/login"
              className="text-[#0A66C2] hover:text-[#084d94] font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-4 lg:mt-8">
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
            <div className="flex flex-wrap gap-2 lg:gap-4 text-xs">
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
