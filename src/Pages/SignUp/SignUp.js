import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {createUser, updateUser} = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();

    // token 
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);

    if(token) {
        navigate('/');
    }

    const handleSignUp = (data) => {
        console.log(data);
        setSignUpError('');
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            toast.success('Sign Up successfully')
            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
            .then(() => {
                saveUser(data.name, data.email);
            })
            .catch(err => console.error(err))
        })
        .catch(err => {
            console.error(err);
            setSignUpError(err.message)
        })
    }

    const saveUser = (name, email) => {
        const user = {name, email};
        fetch(`http://localhost:5000/users`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {

            setCreatedUserEmail(email);
        })
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
                        <input type='password' {...register("password", {required: "Password is required", minLength: {value: 6, message: 'Password must be at least 6 character'}, 
                        pattern: {value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password must have uppercase number and especial character"}
                    })} className="input input-bordered w-full" placeholder="" />
                        {errors.password && <p className='text-red-600'>{errors?.password.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-500'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary' to='/login'>Page Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div> 
    );
};

export default SignUp;