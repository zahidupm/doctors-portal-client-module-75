import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleSignUp = (data) => {
        console.log(data);
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 '>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
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
                            <span className="label-text-alt">Password</span>
                        </label>
                        <input type='password' {...register("password", {required: "Password is required", minLength: {value: 6, message: 'Password must be at least 6 character'}})} className="input input-bordered w-full" placeholder="" />
                        {errors.password && <p className='text-red-600'>{errors?.password.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full' value="Sign Up" type="submit" />
                </form>
                <p>Already have an account <Link className='text-secondary' to='/login'>Page Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div> 
    );
};

export default SignUp;