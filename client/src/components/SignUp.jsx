import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userSignUp } from "../config/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InitialObject = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const [formData, setFormData] = useState(InitialObject);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () =>
    setShowConfirmPassword(!showConfirmPassword);

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
    if (!formData.userName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await userSignUp(formData);
      toast.success("Sign up successful!");
      navigate('/auth/signIn');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col justify-center items-center w-96 p-8 bg-white rounded-md shadow-lg border-2 border-gray-300">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        <form onSubmit={submitHandle} className="w-full">
          <div className="mb-3 w-full">
            <label className="block text-black mb-1" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
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
          <div className="mb-3 w-full relative">
            <label className="block text-black mb-1" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 px-3 py-2 mt-6 focus:outline-none flex items-center"
              onClick={handleConfirmPasswordToggle}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#FF7777] text-white rounded-md hover:bg-[#FF6666] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/signIn" className="text-blue-500 hover:text-blue-700">
            <span>Login</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
