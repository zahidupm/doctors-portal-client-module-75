import React from 'react';
import appointment from '../../../assets/images/appointment.png';
import doctor from '../../../assets/images/doctor.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='mt-32' style={{
            background: `url(${appointment})`
        }}>
            <div className="hero text-white">
            <div className="hero-content flex-col lg:flex-row">
                <img src={doctor} className="lg:w-1/2 -mt-32 hidden lg:block rounded-lg" alt='' />
                <div>
                    <h4 className='text-lg text-primary uppercase font-bold'>Appointment</h4>
                <h1 className="text-4xl font-bold">Make an appointment Today</h1>
                <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <PrimaryButton>Appointment</PrimaryButton>
                </div>
            </div>
            </div>
        </section>
    );
};

export default MakeAppointment;