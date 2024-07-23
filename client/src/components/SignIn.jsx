import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSignIn } from "../config/api"; // Import your API function

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitHandle = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await userSignIn(formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Sign in successful!");
      navigate('/dashboard'); // Redirect to dashboard or home page
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col justify-center items-center w-96 p-8 bg-white rounded-md shadow-lg border-2 border-gray-300">
        <h1 className="text-2xl font-bold mb-6">User Login Form</h1>
        <form onSubmit={submitHandle} className="w-full">
          <div className="mb-3 w-full">
            <label className="block text-black mb-1" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 w-full relative">
            <label className="block text-black mb-1" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 px-3 py-2 mt-6 focus:outline-none flex items-center"
              onClick={handlePasswordToggle}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#FF7777] text-white rounded-md hover:bg-[#FF6666] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            <span>Sign Up</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
