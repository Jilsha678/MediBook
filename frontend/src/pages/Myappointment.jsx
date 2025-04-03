import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const Myappointment = () => {
  const {backendUrl,token,getDoctorsData}=useContext(AppContext)
  const[appointments,setAppointments]=useState([])
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  
  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])-1]+" "+dateArray[2]
  }
  const navigate=useNavigate()
  const getUserAppoinmets =async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
    
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
  const cancelAppointment=async(appointmentId)=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{ headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppoinmets()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const initPay=(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response)
        try {
          const {data}=await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
          if (data.success) {
            getUserAppoinmets()
            navigate('/myappointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }

    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }
  const appointmentRazorpay=async(appointmentId)=>{
      const{data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
      if (data.success) {
        initPay(data.order)//afterconsole
        console.log(data.order)

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
                <img className='w-32 bg-indigo-50' src={items?.docData?.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{items?.docData?.name}</p>
                <p>{items.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{items?.docData?.address?.line1}</p>
                <p className='text-xs'>{items?.docData?.address?.line2}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium' >Date & Time:</span>{slotDateFormat(items.slotDate)} | {items.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {!items.cancelled&&!items.isCompleted&&items.payment && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
               {!items.cancelled&&!items.isCompleted&&!items.payment&& <button onClick={()=>appointmentRazorpay(items._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border  hover:bg-primary hover:text-white transition-all duration-300 ' >Pay Online</button>}
               {!items.cancelled&&!items.isCompleted&& <button onClick={()=>cancelAppointment(items._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border   hover:bg-red-600 hover:text-white transition-all duration-300 '>Cancel appointment</button>} 
               {items.cancelled&&!items.isCompleted&&  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointmet Cancelled</button>}
               {items.isCompleted&& <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Myappointment
