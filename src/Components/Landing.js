
import React, { useState } from 'react';
import axios from 'axios';

export const Landing = () => {
  const [message, setMessage] = useState(''); // Alert
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = () => {
    if (email && password) {
      axios
        .post('http://localhost:2000/api/setrole', { email })
        .then((res) => {
          if (res.status === 200) {
            // Navigate based on the assigned role
            const role = res.data.role;
            if (role === 'Admin') {
              window.location.href = '/home';
            } else if (role === 'Candidate') {
              window.location.href = '/home';
            }
          }
        })
        .catch((err) => {
          setMessage("User doesn't exist or invalid domain!");
          setTimeout(() => {
            setMessage('');
          }, 2000);
        });
    } else {
      setMessage('Please enter the username and password!');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };  

  // Google login function
  const googleLogin = () => {
    // Redirect the user to the backend's Google login route
    window.location.href = 'http://localhost:2000/auth/google';  // This should point to your backend
  };

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-slate-200 to-white">
      {message && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-2/6 h-10 bg-red-400 rounded-md p-2 text-white font-medium">
          {message}
        </div>
      )}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 rounded-lg h-auto bg-gray-200 p-4">
        <h1 className="w-full text-lg tracking-tight mt-2 font-medium text-center">Login</h1>
        <div className="mt-8 flex flex-col gap-2 w-5/6 m-auto">
          <label className="font-medium text-sm text-gray-600">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-300 p-2 rounded-md text-sm"
            placeholder="email@domain.com"
          />
          <label className="font-medium text-sm text-gray-600">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-gray-300 p-2 rounded-md text-sm"
            placeholder="Password"
          />
          <button
            onClick={checkLogin}
            className="w-full p-2 mt-4 bg-gray-100 rounded-md font-semibold text-gray-500 hover:text-gray-700 hover:bg-white transition-all"
          >
            Login
          </button>
          <div className="mt-4 text-center font-medium text-gray-500">OR</div>
          <button
            onClick={googleLogin}
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-all"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};
