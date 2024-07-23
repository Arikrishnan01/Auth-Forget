import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser, FaSignOutAlt, FaRobot } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { HandleLogOut } from '../config/api';

const Navbar = ({ userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setShowProfile(!showProfile);

  return (
    <div className="bg-gray-100 text-gray-800 border-b border-gray-300">
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold flex items-center">
          <FaRobot className="mr-2 text-3xl" /> Dashboard
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <button onClick={toggleProfile} className="relative">
            <FaUser className="text-2xl" />
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4">
                <div className="flex items-center mb-2">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Profile"
                    className="rounded-full mr-2"
                  />
                  <div>
                    <div className="font-bold">User Name</div>
                    <div className="text-gray-600">{userEmail}</div>
                  </div>
                </div>
                {/* <Link to="/profile" className="text-blue-500 hover:text-blue-700">View Profile</Link> */}
                <button onClick={() => {
                HandleLogOut();
                window.location.href = "/auth/signIn";
              }} className="mt-2 text-red-500">Logout</button>
              </div>
            )}
          </button>
        </div>
        <button onClick={toggleMenu} className="lg:hidden text-2xl">
          {isOpen ? <HiX /> : <FaBars />}
        </button>
      </div>
      <div
        className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-gray-100 text-gray-800 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button onClick={toggleMenu} className="text-2xl mb-4">
            <HiX />
          </button>
          <div className="space-y-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <FaRobot className="text-xl" />
              <span>Dashboard</span>
            </Link>
            
            <button className="flex items-center space-x-2 w-full mt-4 text-red-500">
              <FaSignOutAlt className="text-xl" onClick={() => {
                HandleLogOut();
                window.location.href = "/auth/signIn";
              }} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
