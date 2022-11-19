import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const {data: doctors, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/doctors`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            } catch (error) {
                
            }
        }
    })

    if(isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className="text-3xl">Manage Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Specialty</th>
                        <th>action</th>
                    </tr>
                    </thead>
                    <tbody>
                     {
                        doctors?.map((doctor, i) => <tr key={doctor._id} className="hover">
                        <th>{i+1}</th>
                        <td>
                            <div className="avatar">
                                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={doctor.image} alt='' />
                                </div>
                            </div>
                        </td>
                        <td>{doctor.name}</td>
                        <td>{doctor.email}</td>
                        <td>{doctor.specialty}</td>
                        <td>
                            <button className='btn btn-sm btn-error text-white'>Delete</button>
                        </td>
                    </tr>)
                     }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;