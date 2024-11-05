import React, { useState } from 'react'
import { CalendarDays, Trash2, Edit2, Plus } from 'lucide-react'

export const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    //form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        if (name && date) {
            if (editIndex === -1) {
                setAppointments([...appointments, { name, date }])
            }
        } else {
            const updatedAppointments = [...appointments];
            updatedAppointments[editIndex] = { name, date };
            setAppointments(updatedAppointments);
            setEditIndex(-1);
        }
        setName('');
        setDate('');
    }

    // delete appointments

    const handleDelete = (index) => {
        setAppointments(appointments.filter((_, i) => i !== index))
    }

    //update appointment

    const handleUpdate = (index) => {
        const appointment = appointments[index];
        setName(appointment.name);
        setDate(appointment.date);
        setEditIndex(index);
    }
    return (
        <div className='flex h-screen bg-gradient-to-br from-purple-100 to-indigo-200 font-sans'>
            <div className='w-1/3 bg-indigo-800 p-8 text-indigo-100'>
                <h1 className='text-4xl font-bold mb-8'>Appointment Scheduler </h1>
                <form onSubmit={handleSubmit} className='space-y-4"'>
                    <div>
                        <label htmlFor="name" className='block text-sm font-medium mb-1'>Name</label>
                        <input type="text" id='name' placeholder='enter your name' value={name} onChange={(e) => setName(e.target.value)} className='w-full p-2 rounded bg-indigo-700 text-indigo-100 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500' />
                    </div>
                    <div>
                        <label htmlFor="date" className='block text-sm font-medium mb-1'>Date</label>
                        <input type="date" id='date' value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 rounded bg-indigo-700 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
                        />
                    </div>
                    <button type='submit' className='w-full p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300 ease-in-out flex items-center justify-center mt-3'>
                        {editIndex === -1 ? <Plus className='mr-2' /> : <Edit2 className='mr-2' />}
                        {editIndex === -1 ? 'Add Appointment' : 'Update Appointment'}
                    </button>
                </form>
            </div>
            <div className='w-2/3 p-8 overflow-auto'>
                <h2 className='text-2xl font-semibold mb-4 text-indigo-800'>Upcoming Events</h2>
                <ul className='space-y-4'>
                    {appointments.map((appointment, index) => (
                        <li key={index} className='bg-white p-4 rounded-lg shadow-md flex justify-between items-center'>
                            <div className='flex items-center'>
                                <CalendarDays className='text-indigo-500 mr-3' />
                                <div>
                                    <p className='font-semibold text-indigo-800'>{appointment.name}</p>
                                    <p className='font-sm text-indigo-600'>{appointment.date}</p>
                                </div>
                            </div>
                            <div className='space-x-2'>
                                <button onClick={() => handleUpdate(index)}
                                    className='p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out'
                                ><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(index)}
                                    className='p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ease-in-out'
                                ><Trash2 size={16} /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
