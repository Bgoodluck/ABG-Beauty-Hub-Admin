import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useState } from 'react'
import Login from './components/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import NewsletterAdmin from './pages/NewsletterAdmin'
import AllStaffs from './pages/Staffs/AllStaffs'
import AdminAppointments from './pages/AppointmentAdmin'
import AllUsers from './pages/Users/AllUsers'


export const backendUrl = "https://abg-beauty-hub-server.onrender.com"
export const currency = '₦'

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'): '');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])


  return (

    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {
        token === ""
          ? <Login setToken={setToken} />
          :
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className=' flex w-full'>
              <Sidebar />
              <div className=' w-[70%] mx-auto ml-[max-(5vw, 25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token}/>} />
                  <Route path='/list' element={<List token={token}/>} />
                  <Route path='/orders' element={<Orders token={token}/>} />
                  <Route path='/allstaffs' element={<AllStaffs token={token}/>} />
                  <Route path='/newsletter' element={<NewsletterAdmin token={token}/>} />
                  <Route path='/appointments' element={<AdminAppointments token={token}/>} />
                  <Route path='/allusers' element={<AllUsers token={token}/>} />
                </Routes>
              </div>
            </div>
          </>
      }



    </div>
  )
}

export default App
