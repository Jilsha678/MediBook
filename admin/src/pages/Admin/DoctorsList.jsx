import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Admincontext } from '../../context/AdminContext'

const DoctorsList = () => {
  const{doctors,aToken,getAllDoctors,changeAvailability}=useContext(Admincontext)
  useEffect(()=>{
    if (aToken) {
      getAllDoctors()
      
    }
  },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium '>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((items,index)=>(
            <div className='border border-indigo-200 rounded-xl max-w-46 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={items.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{items.name}</p>
                <p className='text-zinc-600 text-sm'>{items.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailability(items._id)} type="checkbox" checked={items.available} />
                  <p>Available</p>
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
