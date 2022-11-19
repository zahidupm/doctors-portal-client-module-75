import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentSpecialty`);
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = (data) => {
        console.log(data);
    }

    if(isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h2 className="text-3xl">Add a Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text-alt">Name</span>
                        </label>
                        <input type='name' {...register("name", {required: "Name is required"})} className="input input-bordered w-full" placeholder="" />
                        {errors.name && <p className='text-red-600'>{errors?.name.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text-alt">Email</span>
                        </label>
                        <input type='email' {...register("email", {required: true})} className="input input-bordered w-full" placeholder="" />
                        {errors.email && <p className='text-red-600'>{errors?.email.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text-alt">Specialty</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Please Select a Specialty</option>
                            {
                                specialties?.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                                >{specialty.name}</option>)
                            }
                        </select>
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add a Doctor" type="submit" />
                    {/* {signUpError && <p className='text-red-500'>{signUpError}</p>} */}
                </form>
        </div>
    );
};

export default AddDoctor;