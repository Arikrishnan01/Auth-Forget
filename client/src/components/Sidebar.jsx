import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="hidden lg:block fixed top-0 left-0 w-64 h-full bg-gray-100 text-gray-800">
      <div className="p-4">
        <div className="text-xl font-bold mb-6">
          <FaRobot className="mr-2 text-3xl" /> Dashboard
        </div>
        <div className="space-y-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <FaRobot className="text-xl" />
            <span>Dashboard</span>
          </Link>
          <Link to="#" className="flex items-center space-x-2">
            <FaUser className="text-xl" />
            <span>Profile</span>
          </Link>
          <button className="flex items-center space-x-2 w-full mt-4 text-red-500">
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
