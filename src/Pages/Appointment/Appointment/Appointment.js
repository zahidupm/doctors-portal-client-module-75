import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointments from '../AvailableAppointment/AvailableAppointment';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div className=''>
           <AppointmentBanner 
           selectedDate={selectedDate}
           setSelectedDate={setSelectedDate}
           ></AppointmentBanner>
           <AvailableAppointments
           selectedDate={selectedDate}
           setSelectedDate={setSelectedDate}
           ></AvailableAppointments>
        </div>
    );
};

export default Appointment;