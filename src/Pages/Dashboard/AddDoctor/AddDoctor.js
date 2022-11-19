import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey);
    const navigate = useNavigate();

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentSpecialty`);
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = (data) => {
        // console.log(data.image[0]);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success) {
                // console.log(imgData.data.url);
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }
                
                // save doctor information to the database
                fetch(`http://localhost:5000/doctors`, {
                    method: "POST", 
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    toast.success(`${data.name} is added successfully`);
                    navigate('/dashboard/manage_doctors')
                })
            }
        })


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
                        <select 
                        {...register('specialty')}
                        className="select input-bordered w-full max-w-xs">
                            <option disabled selected>Please Select a Specialty</option>
                            {
                                specialties?.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                                >{specialty.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text-alt">Photo</span>
                        </label>
                        <input type='file' {...register("image", {required: "photo is required"})} className="input input-bordered w-full" placeholder="" />
                        {errors.image && <p className='text-red-600'>{errors?.image.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add a Doctor" type="submit" />
                    {/* {signUpError && <p className='text-red-500'>{signUpError}</p>} */}
                </form>
        </div>
    );
};

export default AddDoctor;

/* 
** Three places to store images
1.Third party image hosting server
2. file system of your server
3. mongodb(database)
*/