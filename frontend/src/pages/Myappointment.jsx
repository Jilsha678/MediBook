import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Myappointment = () => {
  const {backendUrl,token}=useContext(AppContext)
  const[appointments,setAppointments]=useState([])
  const getUserAppoinmets =async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      console.log('Appointments:', data.appointments)
      if (data.success) {
        // setAppointments(data.appointments.reverse())
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(token){
      getUserAppoinmets()
    }
  },[token])
  
  return (
    <div className='relative top-15'>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        
          {appointments.map((items,index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}> 
              <div>
                <img className='w-32 bg-indigo-50' src={items.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{items.docData.name}</p>
                <p>{items.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{items.docData.address.line1}</p>
                <p className='text-xs'>{items.docData.address.line2}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium' >Date & Time:</span>{items.slotDate} | {items.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border  hover:bg-primary hover:text-white transition-all duration-300 ' >Pay Online</button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border   hover:bg-red-600 hover:text-white transition-all duration-300 '>Cancel appointment</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Myappointment
