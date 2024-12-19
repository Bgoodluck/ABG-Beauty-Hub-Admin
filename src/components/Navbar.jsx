import React from 'react'
import {assets} from '../assets/assets'

function Navbar({setToken}) {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <div>
      <img className=' w-[max(3%,60px)]  rounded-full' src={assets.logo2} alt="" />
      <p className=' text-sm font-semibold text-[#f08bc1]'>Admin Panel</p>
      </div>
      <button onClick={()=> setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm active:bg-[#f08bc1]'>Logout</button>
    </div>
  )
}

export default Navbar
