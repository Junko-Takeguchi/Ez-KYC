import React,{useState} from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import { Link } from "react-router-dom";
   

const Navbar = () => {
    const[nav,setNav]=useState(true);

    const handleNav = ()=>{
        setNav(nav)
    }

  return (
    <div className='flex justify-between itmes-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#f8b24f]'>Ez-KYC</h1>
       <ul className='hidden md:flex'>
       <Link to={"/"} className="sm:w-60 h-16 overflow-hidden -ml-5" ><li className='p-4'>Home</li></Link>
       <Link to={"/kyc"} className="sm:w-60 h-16 overflow-hidden -ml-5" ><li className='p-4'>KYC</li></Link>
       </ul>
       <div onClick={handleNav} className='block md:hidden'>
            {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
       </div>
       <div className={!nav?'fixed left-0 top-0 w-[60%] border-r border-r-gray-900 bg-[#00300] ease-in-out duration-500': 'fixed left-[-100%]'}>
       <ul className='uppercase p-4'>
       <Link to={"/"} className="sm:w-60 h-16 overflow-hidden -ml-5" ><li className='p-4'>Home</li></Link>
       <Link to={"/kyc"} className="sm:w-60 h-16 overflow-hidden -ml-5" ><li className='p-4'>KYC</li></Link>
            </ul>
       </div>
      </div>
  )
}

export default Navbar
