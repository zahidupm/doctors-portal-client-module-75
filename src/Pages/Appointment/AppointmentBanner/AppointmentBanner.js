import React from 'react';
import { DayPicker } from 'react-day-picker';
import chair from '../../../assets/images/chair.png';

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {


    return (
        <header className='my-6'>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt='dentist-chair' />
                    <div className='mr-6 cal'>
                        <DayPicker 
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        ></DayPicker>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;