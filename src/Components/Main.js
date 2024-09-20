import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { Admin } from './Admin'
import { Candidate } from './Candidate'

export const Main = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    axios.get('http://localhost:2000/api/getrole')
      .then((res) => {
        setRole(res.data);  // Set role returned from the server
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        window.location.href = '/';
      });
  }, []);  

  const logout = () => {
    axios.post("http://localhost:2000/api/logout")
    window.location.href = "/"
  }

  if(loading) {
    return null;
  }

  return (
    <div className='w-full h-screen'>
      <div className='top-bar mt-4 w-5/6 flex m-auto'>
        <button onClick={logout} className='ml-auto p-2 rounded-md tracking-tight text-sm font-medium px-6 bg-gray-100 hover:bg-gray-200 transition-all'>Logout</button>
      </div>
      <h1 className='w-10/12 m-auto text-xl italic text-gray-500 font-medium mt-10'>Welcome, {role}</h1>
      {role === "Admin" ? 
        <Admin />
      :
        <Candidate />
      }
    </div>
  )
}
