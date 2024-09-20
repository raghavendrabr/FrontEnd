import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Assuming you have an API to handle logout
    axios.post('http://localhost:2000/api/logout').then(() => {
      // Redirect the user back to the login page after logging out
      navigate('/');
    });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">404 - Page Doesn't Exist</h1>
      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

