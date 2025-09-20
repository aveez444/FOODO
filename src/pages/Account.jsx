import { Mail, User, MessageCircle } from "lucide-react";
import logo from "../assets/logo.png";

export default function Account() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Food-O Logo"
            className="w-12 h-12 mb-2"
          />
          <h1 className="text-xl font-bold text-gray-900">FOOD-O</h1>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-1">
          Login with Email
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter your email address to continue
        </p>

        {/* Email Input */}
        <div className="flex items-center border rounded-lg px-3 py-2 mb-4">
          <Mail className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
          Login →
        </button>

        {/* Register Link */}
        <p className="text-center mt-3 text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            <User className="inline w-4 h-4 mr-1" />
            Register a new account
          </a>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">Or Login Using</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100 transition">
            <MessageCircle className="w-5 h-5 mr-2 text-green-500" /> WhatsApp
          </button>
          <button className="flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100 transition">
            <Mail className="w-5 h-5 mr-2 text-gray-600" /> Email
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-center text-gray-500 mt-6">
          I accept that I have read & understood{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          and T&Cs.
        </p>
      </div>
    </div>
  );
}
