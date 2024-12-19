import React, { useEffect, useState } from 'react'
import StaffCard from './StaffCard';
import UploadStaffs from './UploadStaffs';
import { summaryApi } from '../../common';

function AllStaffs() {

  const [openUploadStaff, setOpenUploadStaff] = useState(false);
  const [allStaffs, setAllStaffs] = useState([]); 



  const fetchAllStaffs = async()=>{
    const response = await fetch(summaryApi.allStaffs.url,{
      method: summaryApi.allStaffs.method,
      credentials: "include"
    })
    const responseData = await response.json();

    setAllStaffs(responseData?.data || []);
    console.log("allStaffs", responseData)
  }

  useEffect(()=>{
    fetchAllStaffs()
  }, [])


  return (
    <div>
        <div className='bg-black-500 py-2 px-4 flex justify-between items-center'>
           <h2 className='font-bold text-lg text-white-500'>
              All Staffs
           </h2>
           <button 
              onClick={() => setOpenUploadStaff(true)}
              className='border-2 py-1 px-3 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white-500 hover:text-black-900'>
              Upload Staffs
           </button>
        </div>


            {/* All products component */}
         <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
            {
              allStaffs.map((item, index)=>{
                return (
                  <StaffCard
                    fetchData={fetchAllStaffs}
                    data={item}
                    key={index + "allStaff"}
                  />
                  
                )
              })
            }           
         </div>


        {/* upload Staff component in my pages folder */}
        {
          openUploadStaff && (
            <UploadStaffs
              onClose={() => setOpenUploadStaff(false)}
              fetchData={fetchAllStaffs}
            />
          )
        }
        
    </div>
  )
}

export default AllStaffs