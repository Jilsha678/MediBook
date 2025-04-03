import React from 'react'
import { useContext } from 'react'
import { Admincontext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { Appcontext } from '../../context/Appcontext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(Admincontext)
  const { calculateAge, slotDateFormat, currency } = useContext(Appcontext)
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='bottom-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white  rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b' >
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((items, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={items.userData.image} alt="" /> <p>{items.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(items.userData.dob)}</p>
            <p>{slotDateFormat(items.slotDate)},{items.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={items.docData.image} alt="" /> <p>{items.docData.name}</p>
            </div>
            <p>{currency}{items.amount}</p>
            {items.cancelled
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : items.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>completed</p>
                : <img onClick={() => cancelAppointment(items._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }

          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
