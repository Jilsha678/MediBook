import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../context/DoctorContext'
import { Appcontext } from '../../context/Appcontext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const{dToken,appointments,getAppointments,completeAppointment,cancelAppointment}=useContext(Doctorcontext)
 const {calculateAge,slotDateFormat,currency}=useContext(Appcontext)
 
  useEffect(()=>{
    if (dToken) {
      
      getAppointments()
    }
  },[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
     <p className='mb-3 text-lg font-medium'>All Appointments</p>
     <div className='bg-white  rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
      <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p>Action</p>
      </div>
      {
        appointments.reverse().map((items,index)=>(
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={items.userData.image} alt="" /><p>{items.userData.name}</p>
            </div>
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>{items.payment?'Online':'CASH'}</p>
            </div>
              <p  className='max-sm:hidden'>{calculateAge(items.userData.dob)}</p>
              <p>{slotDateFormat(items.slotDate)},{items.slotTime}</p>
               <p>{currency}{items.amount}</p>
              {
  items.cancelled || items.isCompleted ? (
    <div className='w-full flex justify-start'>
      <p className={`text-xs font-medium ${items.cancelled ? 'text-red-400' : 'text-green-500'}`}>
        {items.cancelled ? 'Cancelled' : 'Completed'}
      </p>
    </div>
  ) : (
    <div className='flex '>
      <img onClick={() => cancelAppointment(items._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
      <img onClick={() => completeAppointment(items._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
    </div>
  )
}

          </div>
        ))
      }
     </div>
    </div>
  )
}

export default DoctorAppointment

