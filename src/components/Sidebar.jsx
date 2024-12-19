import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'



function Sidebar() {

  return (
    <div className=' w-[18%] min-h-screen border-r-2'>

      <div className=' flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

        <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg active:bg-[#f08bc1]'>
             <img className=' w-5 h-5' src={assets.add_icon} alt="" />
             <p className=' hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg active:bg-[#f08bc1]'>
             <img className=' w-5 h-5' src={assets.order_icon} alt="" />
             <p className=' hidden md:block'>List Items</p>
        </NavLink>

        <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg active:bg-[#f08bc1]'>
             <img className=' w-5 h-5' src={assets.order_icon} alt="" />
             <p className=' hidden md:block'>Orders</p>
        </NavLink>

        <NavLink to='/newsletter' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg active:bg-[#f08bc1]'>
             <img className=' w-5 h-5' src={assets.order_icon} alt="" />
             <p className=' hidden md:block'>Newsletters</p>
        </NavLink>

        <NavLink to='/appointments' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg active:bg-[#f08bc1]'>
             <img className=' w-5 h-5' src={assets.order_icon} alt="" />
             <p className=' hidden md:block'>Appointments</p>
        </NavLink>

        <NavLink to='/allstaffs' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg active:bg-[#f08bc1]'>
             <img className=' w-5 h-5' src={assets.order_icon} alt="" />
             <p className=' hidden md:block'>All Staffs</p>
        </NavLink>

        <NavLink to='/allusers' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg active:bg-[#f08bc1]'>
             <img className=' w-5 h-5' src={assets.order_icon} alt="" />
             <p className=' hidden md:block'>All Users</p>
        </NavLink>

      </div>

    </div>
  )
}

export default Sidebar
