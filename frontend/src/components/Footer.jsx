import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 relative top-15'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
    {/* ----left section------ */}
    <div>
        <img className='mb-5 w-40 relative bottom-15 ' src={assets.logo} alt="" />
        <p className='w-full md:w-2/3 text-gray-600 leading-6 relative bottom-24'> we are committed to providing exceptional healthcare services with compassion and excellence. 
            Our team of experienced doctors, nurses, and medical professionals ensures that every patient receives personalized and high-quality care. With advanced medical facilities and a patient-centric approach, we strive to improve lives and promote well-being for all.</p>
    </div>
    {/* ----center section------ */}
    <div className='relative bottom-20 md:bottom-6'>
        <p className='text-xl font-medium  mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
        </ul>
    </div>
     {/* ----right section------ */}
     <div  className='relative bottom-20 md:bottom-6'>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
        <li>+91 560967899</li>
        <li>medibook@gmail.com</li>
        </ul>
        </div>
      </div>

      <div className='relative bottom-10'>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@Medibook-All Right Reserved.</p>
      </div>
      
    </div>
  )
}

export default Footer
