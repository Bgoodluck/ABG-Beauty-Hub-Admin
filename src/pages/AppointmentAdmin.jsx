import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App'
import { assets } from '../assets/assets';
import { summaryApi } from '../common';

function AdminAppointments({ token }) {
 
    const [appointments, setAppointments] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState({});



    console.log("appoint", token)
    const fetchAllAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                toast.error('No authentication token found');
                return;
            }
    
            const response = await fetch(summaryApi.appointmentSchedule.url, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
            console.log('Full response:', response);
            console.log('Response data:', data);
    
            if (response.ok && data.success) {
                setAppointments(data.data.reverse());
            } else {
                // More detailed error handling
                toast.error(data.message || 'Failed to fetch appointments');
                
                // Handle token/authentication errors
                if (data.message === 'User not found' || response.status === 401) {
                    localStorage.removeItem('token');
                    // Redirect to login or refresh the page
                    window.location.href = '/login';
                }
            }
        } catch (error) {
            console.error('Fetch appointments error:', error);
            toast.error('Error fetching appointments');
        }
    };


  const statusHandler = async (event, appointmentId) => {
    console.log('Token being sent:', token); // Log the token
    try {

        const notes = selectedNotes[appointmentId] || '';

      const response = await axios.put(
        `${backendUrl}/api/appointments/${appointmentId}/status`,
        { 
            status: event.target.value,
            notes 
          },
        {
          headers: { 
            'Authorization': `Bearer ${token}`, // Consider using Bearer token format
            'token': token 
          }
        }
      );
  
      if (response.data.success) {
        toast.success('Appointment status updated successfully');

        if (response.data.emailSent) {
            toast.info('Notification email sent to the client');
        }
        await fetchAllAppointments();
        // Reset notes for this appointment
        setSelectedNotes(prev => ({
            ...prev,
            [appointmentId]: ''
          }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      toast.error('Error updating status');
    }
  };


  const handleNotesChange = (appointmentId, notes) => {
    setSelectedNotes(prev => ({
      ...prev,
      [appointmentId]: notes
    }));
  };



  useEffect(() => {
    fetchAllAppointments();
  }, [token]);

  return (
    <div>
      <h3 className='text-2xl font-bold mb-4'>Admin Appointments</h3>
      <div>
        {appointments.map((appointment, index) => (
          <div 
            key={index} 
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-sm sm:text-sm text-gray-700'
          >
            <img className='w-12' src={assets.parcel_icon} alt="Appointment Icon" />
            <div>
              <p className='font-semibold'>
                {`${appointment.firstName} ${appointment.lastName}`}
              </p>
              <p>Location: {appointment.salonLocation}</p>
              <p>Stylist: {appointment.stylistName || 'Not Specified'}</p>
              <p>Services: {appointment.services || 'No services specified'}</p>
            </div>
            <div>
              <p>Date: {new Date(appointment.requestDate).toLocaleDateString()}</p>
              <p>Time: {appointment.requestTime}</p>
              <p>First Time Client: {appointment.firstTimeClient}</p>
            </div>
            <div>
              <p>Email: {appointment.email}</p>
              <p>Phone: {appointment.cellNumber}</p>
            </div>
            <select 
              onChange={(event) => statusHandler(event, appointment._id)}
              value={appointment.status} 
              className='p-2 font-semibold'
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <textarea 
            placeholder="Admin Notes (Optional)"
            value={selectedNotes[appointment._id] || ''}
            onChange={(e) => handleNotesChange(appointment._id, e.target.value)}
            className="w-full col-span-full mt-2 p-2 border rounded-md h-24 resize-y" 
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAppointments;