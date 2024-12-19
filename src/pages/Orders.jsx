import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { summaryApi } from '../common'



function Orders({ token }) {

  const [orders, setOrders] = useState([]);





  const fetchAllOrders = async () => {
    // Try to get token from props, fallback to localStorage
    const authToken = token || localStorage.getItem('token');
  
    if (!authToken) {
      toast.error('No token available');
      return null;
    }
  
    try {
      const response = await fetch(summaryApi.orderList.url, {
        method: summaryApi.orderList.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      const responseData = await response.json();
  
      console.log("list of orders", responseData);
  
      if (responseData.success) {
        setOrders(responseData.orders.reverse());
      } else {
        toast.error(responseData.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };


  const statusHandler = async (event, orderId) => {
    try {
      const authToken = token || localStorage.getItem('token');
      if (!authToken) {
        toast.error('No token available');
        return null;
      }
      
      const response = await fetch(summaryApi.orderStatus.url, {
        method: summaryApi.orderStatus.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ orderId, status: event.target.value })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      if (responseData.success) {
        toast.success(responseData.message);
        await fetchAllOrders();
      } else {
        toast.error(responseData.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const authToken = token || localStorage.getItem('token');
    if (authToken) {
      fetchAllOrders();
    }
  }, [token]);


  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className=' grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-sm sm:text-sm text-gray-700' key={index}>
              <img className=' w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      }
                      else {
                        return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>, </p>
                      }
                    })
                  }
                </div>
                <p className=' mt-3 mb-2 font-semibold'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.landmark}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className=' text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className=' mt-3'>Method : {order.paymentMethod}</p>
                <p>payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className=' text-sm sm:text-[15px]'>{currency}{order.amount}:00</p>
              <select onChange={(event)=> statusHandler(event,order._id)} value={order.status} className=' p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
