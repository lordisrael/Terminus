"use client";
import Image from "next/image";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await apiFetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.success) {
        // Store access token
        localStorage.setItem("accessToken", response.data.token);

        // Store refresh token
        if (response.data.newUser?.refreshToken) {
          localStorage.setItem("refreshToken", response.data.newUser.refreshToken);
        }

        // Store user data
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.newUser._id,
            name: response.data.newUser.name,
            email: response.data.newUser.email,
          })
        );
        router.push("/dashboard");
      } else {
        // Show backend message
        setError(response.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);

      // Try to extract backend message
      let message = "Something went wrong. Please try again.";

      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message.split(" - ")[1]); // from apiFetch throw
          message = parsed?.message || message;
        } catch (_) {
          message = err.message || message;
        }
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f2f2f2] flex-col lg:flex-row">
      {/* Left side: Image */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen">
        <Image
          src="/images/signin.avif" // Place your image in the public folder
          alt="Signin"
          width={1000}
          height={1500}
          className="object-cover w-[850px] h-[1000px]"
        />
      </div>
      {/* Right side: Signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f2f2f2] flex-col gap-8 relative min-h-screen px-4">
        {/* TERMINUS branding at top-left */}
        <div className="absolute top-6 left-10 mt-2 text-2xl font-extrabold text-[#292928] tracking-wide select-none z-10">
          TERMINUS
        </div>
        <form className="w-full max-w-md p-8 " onSubmit={handleLogin}>
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Sign In</h2>
          <h3 className="text-[#292928] mb-8">
            Welcome back! Please enter your details.
          </h3>
          {/* Social login buttons */}
          <div className="flex flex-col gap-4 mb-8 w-full">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full border rounded-xl py-3 bg-white text-gray-900 font-semibold shadow hover:bg-gray-100"
            >
              <FaGoogle size={20} color="#4285F4" />
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full border rounded-xl py-3 bg-white text-gray-900 font-semibold shadow hover:bg-gray-100"
            >
              <FaFacebookF size={20} color="#4267B2" />
              <span>Continue with Facebook</span>
            </button>
          </div>
          {/* Divider */}
          <div className="flex items-center mx-8 my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="mx-4 text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#292928] focus:border-transparent text-base text-gray-900 bg-white placeholder-gray-500"
            style={{ fontSize: '16px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#292928] focus:border-transparent text-base text-gray-900 bg-white placeholder-gray-500"
            style={{ fontSize: '16px' }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#292928] text-white py-3 rounded-xl font-semibold"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 text-red-600 text-sm">
              {error}
            </div>
          )}
          <h2 className="text-center text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-[#292928] font-semibold"
            >
              Sign Up
            </a>
          </h2>
        </form>
      </div>
    </div>
  );
}