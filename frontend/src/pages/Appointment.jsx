import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Relateddoctors from '../components/Relateddoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { userData,doctors,currencysymbol,backendUrl,token,getDoctorsData} = useContext(AppContext);
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const navigate= useNavigate()
  const [docInfo, setDocInfo] = useState(null);
  const[docSlots,setdocSlots]=useState([])
  const[slotIndex,setSlotIndex]=useState(0)
  const[slotTime,setSlotTime]=useState('')
  useEffect(() => {
    if (doctors.length > 0) {
      const docInfo = doctors.find(doc => doc._id === docId);
      setDocInfo(docInfo);
    }
  }, [doctors, docId]);

  const getAvailableSlots=async()=>{
    setdocSlots([])
    //getting current date
    let today=new Date()
    for(let i=0;i<7;i++){
      //getting date with index
      let currentdate=new Date(today)
      currentdate.setDate(today.getDate()+i)

      //setting end time of the date with index
      let endtime=new Date()
      endtime.setDate(today.getDate()+i)
      endtime.setHours(21,0,0,0)

      // setting hours
      if(today.getDate()===currentdate.getDate()){
        currentdate.setHours(currentdate.getHours()>10?currentdate.getHours()+1:10)
        currentdate.setMinutes(currentdate.getMinutes()>30?30:0)
      }else{
        currentdate.setHours(10)
        currentdate.setMinutes(0)
      }
      let timeSlotes=[]
      while(currentdate<endtime){
        let formattedTime=currentdate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

        timeSlotes.push({
          datetime:new Date(currentdate),
          time:formattedTime
        })
        // Increment time by 30 minutes
        currentdate.setMinutes(currentdate.getMinutes()+30)
      }
      setdocSlots(prev=>([...prev,timeSlotes]))
    }
  }
  const bookAppointment=async()=>{
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
      
    }
    try {
      const date=docSlots[slotIndex][0].datetime
      let day=date.getDate()
      let month=date.getMonth()+1
      let year=date.getFullYear()
      const slotDate=day+"_"+month+"_"+year
      const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{
        userId: userData._id, 
        docId,slotDate,slotTime},{headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/myappointments')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
useEffect(()=>{
  getAvailableSlots()
},[docInfo])

useEffect(()=>{
  console.log(docSlots)
},[docSlots])
  return docInfo && (
    <div className='relative top-25'>
      {/* Container for Image and Info */}
      <div className='flex flex-col sm:flex-row gap-4 '>
        {/* Doctor Image */}

        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=""  />
        </div>
        

        {/* Doctor Details */}
        <div className='flex-1 border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt[-80px] sm:mt-0' >
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p >{docInfo.degree} - {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full' > {docInfo.experience}</button>
        </div>

      {/* Doctor About Section */}
      <div>
        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt=""  /></p>
        <p className='text-sm text-gray-500 max-w-[700px] mt-1' >{docInfo.about}</p>
      </div>
      <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>{currencysymbol}{docInfo.fees}</span></p>
    </div>
    </div>
    {/* -------Booking slots-------- */}
    <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
      <p>Booking Slote</p>
      <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {
          docSlots.length&&docSlots.map((items,index)=>(
              <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex==index?'bg-primary text-white':'border border-gray-200'}`} key={index}>
                  <p>{items[0]&&daysOfWeek[items[0].datetime.getDay()]}</p>
                  <p>{items[0]&&items[0].datetime.getDate()}</p>
              </div>
          ))
        }
      </div>
      <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        {docSlots.length&&docSlots[slotIndex].map((items,index)=>(
            <p onClick={()=>setSlotTime(items.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${items.time===slotTime?'bg-primary text-white':'text-gray-400 border border-gray-300'}`} key={index}>{items.time.toLowerCase()}</p>
        ))}
      </div>
      <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
    </div>
    {/* listing related doctors */}
    <Relateddoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;
