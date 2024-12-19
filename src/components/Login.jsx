// import React from 'react'
// import { useState } from 'react';
// import axios from 'axios'
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify'




// function Login({setToken}) {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//    //  const onSubmitHandler = async (e)=>{
//    //       try {
//    //          e.preventDefault();
//    //          const response = await axios.post(backendUrl + '/api/user/admin', {email,password})
//    //          if (response.data.success) {
//    //             setToken(response.data.token);
//    //             // Optionally, store in localStorage
//    //             localStorage.setItem('token', response.data.token);
//    //              toast.success('Login successful')
//    //          } else{
//    //              toast.error(response.data.message)
//    //          }
//    //       } catch (error) {
//    //          console.log(error)
//    //          toast.error(error.message)
//    //       }
//    //  }

//    const onSubmitHandler = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await axios.post(backendUrl +'/api/user/admin', {
//           email,
//           password
//         });
    
//         if (response.data.success) {
//           // Store token and role
//           localStorage.setItem('token', response.data.token);
//           localStorage.setItem('role', response.data.role);
//           setToken(response.data.token);
//           toast.success('Login successful')
//           // Redirect to admin dashboard
//          //  navigate('/admin/dashboard');
//         }
//       } catch (error) {
//         // Handle login error
//         toast.error(error.response?.data?.message || 'Login failed');
//       }
//     };


//   return (
//     <div className=' min-h-screen flex items-center justify-center w-full'>
//        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
//           <h1 className=' text-2xl font-bold mb-4'>Admin Panel</h1>
//           <form onSubmit={onSubmitHandler}>
//              <div className=' mb-3 min-w-72'>
//                 <p className=' text-sm font-medium text-gray-700 mb-2'>Email Address</p>
//                 <input onChange={(e)=> setEmail(e.target.value)} value={email} className=' rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required/>
//              </div>
//              <div className=' mb-3 min-w-72'>
//                 <p className=' text-sm font-medium text-gray-700 mb-2'>Password</p>
//                 <input onChange={(e)=> setPassword(e.target.value)} value={password} className=' rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required/>
//              </div>
//              <button className=' mt-2 w-full py-2 px-4 rounded-md text-white bg-black active:bg-[#f08bc1]' type='submit'>Login</button>
//           </form>
//        </div>
//     </div>
//   )
// }

// export default Login


// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { backendUrl } from '../App';

// function Login({ setToken }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${backendUrl}/api/admin/login`, {
//         email,
//         password
//       });

//       if (response.data.success) {
//         // Store token in localStorage
//         localStorage.setItem('token', response.data.token);
//         // Update token state
//         setToken(response.data.token);
//         toast.success('Login Successful');
//       } else {
//         toast.error(response.data.message || 'Login Failed');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form 
//         onSubmit={handleSubmit} 
//         className="bg-white p-8 rounded-lg shadow-md w-96"
//       >
//         <h2 className="text-2xl mb-6 text-center">Admin Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

function Login({setToken}) {
    // State for form type and form data
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('user')
    const [profilePic, setProfilePic] = useState(null)

    // Roles for selection
    const ROLES = {
        USER: 'user',
        ADMIN: 'admin',
        MANAGER: 'manager'
    }

    // Handle file input
    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0])
    }

    // Common error handling
    const handleError = (error) => {
        console.error(error)
        toast.error(error.response?.data?.message || 'An error occurred')
    }

    // Login Handler
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/user/login', {
                email,
                password
            })

            if (response.data.success) {
                localStorage.setItem('token', response.data.userData.token)
                localStorage.setItem('role', response.data.userData.role)
                setToken(response.data.userData.token)
                toast.success('Login successful')
            }
        } catch (error) {
            handleError(error)
        }
    }

    // Admin Login Handler
    const handleAdminLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', {
                email,
                password
            })

            if (response.data.success) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role', response.data.role)
                setToken(response.data.token)
                toast.success('Admin Login successful')
            }
        } catch (error) {
            handleError(error)
        }
    }

    // Registration Handler
    const handleRegister = async (e) => {
        e.preventDefault()
        
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('role', role)
        
        // Only append picture if selected
        if (profilePic) {
            formData.append('picture', profilePic)
        }

        try {
            const response = await axios.post(backendUrl + '/api/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.success) {
                localStorage.setItem('token', response.data.userData.token)
                localStorage.setItem('role', response.data.userData.role)
                setToken(response.data.userData.token)
                toast.success('Registration successful')
            }
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full'>
                <div className='flex justify-between mb-4'>
                    <button 
                        onClick={() => setIsLogin(true)}
                        className={`py-2 px-4 ${isLogin ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => setIsLogin(false)}
                        className={`py-2 px-4 ${!isLogin ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        Register
                    </button>
                </div>

                <h1 className='text-2xl font-bold mb-4'>
                    {isLogin ? 'Login' : 'Register'}
                </h1>

                <form onSubmit={isLogin ? (role === 'admin' ? handleAdminLogin : handleLogin) : handleRegister}>
                    {!isLogin && (
                        <>
                            <div className='mb-3'>
                                <p className='text-sm font-medium text-gray-700 mb-2'>Name</p>
                                <input 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                                    type="text" 
                                    placeholder='Your Name' 
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <p className='text-sm font-medium text-gray-700 mb-2'>Profile Picture</p>
                                <input 
                                    type="file"
                                    onChange={handleFileChange}
                                    className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                                    accept="image/*"
                                />
                            </div>

                            <div className='mb-3'>
                                <p className='text-sm font-medium text-gray-700 mb-2'>Role</p>
                                <select 
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                                >
                                    {Object.values(ROLES).map(roleOption => (
                                        <option key={roleOption} value={roleOption}>
                                            {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className='mb-3'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                            type="email" 
                            placeholder='your@email.com' 
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                            type="password" 
                            placeholder='Enter your password' 
                            required
                        />
                    </div>

                    {isLogin && (
                        <div className='mb-3'>
                            <p className='text-sm font-medium text-gray-700 mb-2'>Login As</p>
                            <select 
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            >
                                {Object.values(ROLES).map(roleOption => (
                                    <option key={roleOption} value={roleOption}>
                                        {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button 
                        className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black active:bg-[#f08bc1]' 
                        type='submit'
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login