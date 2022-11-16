import { useQuery } from '@tanstack/react-query';
import format from 'date-fns/esm/format/index';
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({selectedDate}) => {
    // const [appointmentOption, setAppointmentOption] = useState([]);
    const [treatment, setTreatment] = useState(null);

    const {data: appointmentOptions = []} = useQuery({
        queryKey: ['appointmentOption'],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/appointmentOptions`)
            const data = await res.json()
            return data
        }
    })

    // useEffect(() => {
    //     fetch(`http://localhost:5000/appointmentOptions`)
    //     .then(res => res.json())
    //     .then(data => setAppointmentOption(data))
    // }, [])

    return (
        <section className='my-16'>
            <p className='text-center text-secondary font-bold'>Available appointment on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    appointmentOptions.map(option => <AppointmentOption 
                    key={option._id}
                    appointmentOption={option}
                    setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            { treatment &&
                <BookingModal 
                selectedDate={selectedDate}
                treatment={treatment}
                setTreatment={setTreatment}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;