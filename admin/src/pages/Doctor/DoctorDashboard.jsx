import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { Appcontext } from '../../context/Appcontext'

const DoctorDashboard = () => {
  const{dToken,dashData,setDashData,getDashData,completeAppointment,cancelAppointment}=useContext(Doctorcontext)
  const{currency,slotDateFormat}=useContext(Appcontext)
  useEffect(()=>{
    if (dToken) {
      getDashData()
    }

  },[dToken])
  return dashData&& (
    <div className='mt-5'>
       <div className='flex flex-wrap gap-3 ml-9'>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                  <img className='w-14' src={assets.earning_icon} alt="" />
                  <div>
                    <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
                    <p className='text-gray-400'>Earnings</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                  <img className='w-14' src={assets.appointments_icon} alt="" />
                  <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                    <p className='text-gray-400'>Appointments</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                  <img className='w-14' src={assets.patients_icon} alt="" />
                  <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                    <p className='text-gray-400'>Patients</p>
                  </div>
                </div>
              </div>
                  <div className='bg-white'>
                          <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t'>
                            <img src={assets.list_icon} alt="" />
                            <p className='font-semibold'>Latest Bookings</p>
                          </div>
                        </div>
                
                       
                        <div className='h-4'></div>
                        <div className='bg-white rounded shadow-md mb-10'>
                          {dashData.latestAppointments.map((items, index) => (
                            <div
                              className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'
                              key={index}
                            >
                              <img className='rounded-full w-10' src={items.userData.image} alt="" />
                              <div className='flex-1 text-sm'>
                                <p className='text-gray-800 font-medium'>{items.userData.name}</p>
                                <p className='text-gray-600'>{slotDateFormat(items.slotDate)}</p>
                              </div>
                                          {
                               items.cancelled  ? 
                               
                                   <p className= 'text-red-400 text-xs font-medium' >Cancelled</p>
                                
                                : items.isCompleted
                               ?<p className= 'text-green-500 text-xs font-medium'>Completed</p>
                                   :
                                   <div>
                                   <img onClick={() => cancelAppointment(items._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                   <img onClick={() => completeAppointment(items._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                                 
                                   </div>
                             }
                             
                            </div>
                          ))}
                        </div>
    </div>
  )
}

export default DoctorDashboard
