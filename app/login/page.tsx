"use client";
import Image from "next/image";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };
  return (
    <div className="flex min-h-screen bg-[#f2f2f2]">
      {/* Left side: Image */}
      <div className="w-1/2 relative h-screen">
        <Image
          src="/images/signin.avif" // Place your image in the public folder
          alt="Signin"
          width={1000}
          height={1500}
          className="object-cover w-[850px] h-[1000px]"
        />
      </div>
       {/* Right side: Signup form */}
      <div className="w-1/2 flex items-center justify-center bg-[#f2f2f2] flex-col gap-8 relative">
        {/* TERMINUS branding at top-left */}
        <div className="absolute top-6 left-10 mt-2 text-2xl font-extrabold text-[#292928] tracking-wide select-none z-10">TERMINUS</div>
        <form className="w-full max-w-md p-8 " onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Sign In</h2>
          <h3 className="text-[#292928] mb-8">Welcome back! Please enter your details.</h3>
          {/* Social login buttons */}
          <div className="flex flex-col gap-4 mb-8 w-full">
            <button type="button" className="flex items-center justify-center gap-2 w-full border rounded-xl py-3 bg-white text-gray-900 font-semibold shadow hover:bg-gray-100">
              <FaGoogle size={20} color="#4285F4"/>
              <span>Continue with Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 w-full border rounded-xl py-3 bg-white text-gray-900 font-semibold shadow hover:bg-gray-100">
              <FaFacebookF size={20} color="#4267B2"/>
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
            className="w-full mb-4 p-3 border rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 border rounded-xl"
          />
          <button
            type="submit"
            className="w-full bg-[#292928] text-white py-3 rounded-xl font-semibold"
          >
            Sign In
          </button>
          <h2 className="text-center text-gray-500 mt-4">Don't have an account? <a href="/signup" className="text-[#292928] font-semibold">{" "}Sign Up</a></h2>
        </form>
      </div>
    </div>
  )
}