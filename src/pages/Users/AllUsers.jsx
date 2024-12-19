import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import moment from "moment"
import { MdModeEdit } from "react-icons/md";
import { summaryApi } from '../../common';
import ChangeUserRole from './ChangeUserRole';

function AllUsers({token}) {

    const [allUsers, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        name: '',
        email: '',
        role: '',
        userId: ''
    })




    const fetchAllUsers = async () => {
        const response = await fetch(summaryApi.allUser.url, {
            method: summaryApi.allUser.method,
            credentials: "include",
            headers: {
                'Authorization': `Bearer ${token}`, // Important: Add token to Authorization header
                'Content-Type': 'application/json'
            }
            
        })

        const responseData = await response.json()

        console.log("now now", responseData)


        if (responseData.success) {
            setAllUsers(responseData.data)
            toast.success(responseData.message)
        }

        if (responseData.error) {
            toast.error(responseData.message)
        }
    }

    console.log("admin", allUsers)


    useEffect(() => {
        fetchAllUsers()
    }, [])



    return (
        <div>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black-500 text-white-500'>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>ProfilePic</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        allUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user?.name} </td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td>{moment(user?.createdAt).format('LL')}</td>
                                <td>
                                    {user?.profilePic ? (
                                        <img
                                            src={`${process.env.REACT_APP_BACKEND_URL}/${user.profilePic.replace(/\\/g, '/')}`}
                                            alt="profilePic"
                                            className='rounded-full w-12 h-12  mx-auto'
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                console.error('Image load error for user:', user);
                                            }}
                                        />
                                    ) : (
                                        <span>No Profile Picture</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setUpdateUserDetails(user)
                                            setOpenUpdateRole(true)
                                        }}
                                        className='bg-green-300 p-2 rounded-full hover:bg-green-500 cursor-pointer hover:text-white-500'
                                    >
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}                        
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        token={token}
                        fetchAllUsers={fetchAllUsers}
                    />
                )
            }
        </div>
    )
}

export default AllUsers