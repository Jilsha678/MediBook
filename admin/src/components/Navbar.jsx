import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { Admincontext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { Doctorcontext } from '../context/DoctorContext'
const Navbar = () => {
    const {aToken,setAToken}=useContext(Admincontext)
    const{dToken,setDToken}=useContext(Doctorcontext)
    const navigate=useNavigate()
    const logout = () => {
      setAToken(''); 
      localStorage.removeItem('aToken'); 
      setDToken('');
      localStorage.removeItem('dToken'); 
  
      navigate('/'); // Navigate after clearing state and localStorage
  };
  
  return (
    <div className='flex justify-between items-center  px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs ' >
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-r-gray-500 text-gray-600 '>{aToken?'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
