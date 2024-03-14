import React from 'react'
import { ReactTyped } from "react-typed";
import Navbar from './Navbar'

const Hero = () => {
  return (
    <div>
    <Navbar/>
    <div className="w-full bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300" >
    
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto test-center flex flex-col justify-center'>
      <p className='text-[#e19947] text-2xl font-bold p-2 text-center'>Streamline your customer onboarding with our cutting-edge online KYC verification platform</p>
      
      <div className='flex justify-center items-center'>
        <p className='md:text-2xl sm:text-4xl text-xl font-bold'>Elevate your business efficiency with our</p>
        <ReactTyped className='md:text-2xl sm:text-4xl text-xl font-bold pl-2' strings={['seamless,','user-friendly','KYC solution']} typeSpeed={120} backSpeed={140} loop/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Hero
