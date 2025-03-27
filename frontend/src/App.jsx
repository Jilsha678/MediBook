import React from 'react'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import Myappointment from './pages/Myappointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
   
     <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/myprofile' element={<Myprofile/>}/>
        <Route path='/myappointments' element={<Myappointment/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
      </Routes>
      <Footer/>
    </div>
    
  )
}

export default App
