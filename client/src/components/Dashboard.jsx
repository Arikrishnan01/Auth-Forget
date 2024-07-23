import React from 'react';
import Navbar from './Navbar'; // Update path as needed
import Sidebar from './Sidebar'; // Update path as needed

const Dashboard = () => {
  const userEmail = 'user@example.com'; // Replace with dynamic user email

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar userEmail={userEmail} />
          <main className="flex-1 flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-3xl p-8 bg-white border border-gray-300 rounded-lg shadow-lg text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard Page</h1>
              <p className="text-lg text-gray-600">
                Welcome to the Dashboard. This application is for authenticated users only.
              </p>
            </div>
          </main>
          <footer className="bg-gray-200 text-center py-4">
            <p className="text-gray-600">&copy; 2024 Created by AritchSpot</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
