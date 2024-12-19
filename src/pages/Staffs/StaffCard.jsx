import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md"
import { displayNGNCurrency } from '../../helpers/displayCurrency'
import EditStaffs from './EditStaffs'

function StaffCard({
    data,
    fetchData
}) {
    const [editItems, setEditItems] = useState(false)

    return (
        <div className='py-2 px-4 bg-violet-200 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 mx-auto relative'>
                    <img
                        src={data?.staffImage[0]}
                        alt={data?.staffName}
                        className='absolute inset-0 w-full h-full object-contain'
                    />
                </div>
                <div className='text-sm font-bold mt-3 text-center text-ellipsis line-clamp-2'>
                    {data?.staffName}
                </div>

                <p className='text-sm font-bold mt-2 text-center'>                    
                    {displayNGNCurrency(data?.staffPrice)}                    
                </p>
                <div
                    onClick={() => setEditItems(true)}
                    className='cursor-pointer text-violet-600 hover:text-pink-600 w-fit ml-auto p-2 bg-pink-300 hover:bg-violet-300 rounded-full'>
                    <MdModeEditOutline />
                </div>
            </div>
            {editItems && (
                <EditStaffs
                    fetchData={fetchData}
                    staffData={data}
                    onClose={() => setEditItems(false)}
                />
            )}
        </div>
    )
}

export default StaffCard