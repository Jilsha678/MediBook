import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const {backendUrl,token,setToken}=useContext(AppContext)
  const navigate=useNavigate()
  const [state,setstate]=useState('Sign Up')

  // const[email,setemail]=useState('')
  // const[password,setpassword]=useState('')
  // const[name,setname]=useState('')
  const [record,setRecord]=useState({
    fullname:'',
    email:'',
    password:''
 })
 const HandleRecord=(e)=>{
  setRecord({...record,[e.target.name]:e.target.value})
 }
  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try {
      if (state==='Sign Up') {
        const {data}=await axios.post(backendUrl+'/api/user/register',{
          name: record.fullname, 
          email: record.email, 
          password: record.password
        })
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data}=await axios.post(backendUrl+'/api/user/login',{  email: record.email, 
          password: record.password})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    
    } catch (error) {
      toast.error(error.message)
    }

  }
  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center relative top-30'>
<div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm bg-white shadow-2xl">

        <p className='text-2xl font-semibold'>{state==='Sign Up'?'Create Account':"Login"}</p>
        <p>Please {state==='Sign Up'?'sign up':"log in"} to book appointment</p>
        {
          state==="Sign Up" && <div className='w-full'>
          <p>Full Name</p>
          
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" name='fullname' onChange={HandleRecord} />
        </div>
        }
       
        <div className='w-full'>
          <p>Email</p>
         
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'  type="email" name='email' onChange={HandleRecord}/>
        </div>
        <div   className='w-full'>
          <p>Password</p>
          
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'  type="password" name='password'  onChange={HandleRecord}/>
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state==='Sign Up'?"Create Account":"Login"}</button>
        {
          state==='Sign Up'?
          <p>Already have an account? <span onClick={()=>setstate('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          :
          <p>Create a new account? <span onClick={()=>setstate('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
