import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { Login } from '../Redux/Slices/Authslice';
import HomeLayout from '../Layouts/HomeLayout';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignin({
      ...signin, [name]: value
    });
  };

  const login = async (e) => {
    e.preventDefault(); // Corrected typo here

    if (!signin.email || !signin.password) {
      toast.error("All fields are required");
      return;
    }
    if (!signin.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      toast.error("Invalid email id");
      return;
    }

  
    const {email,password}=signin

    const response = await dispatch(Login({email,password}));
    console.log(response);
    if (response?.payload?.success) navigate("/"); // Corrected payload success typo

    setSignin({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <HomeLayout>
        <div className='h-[100vh]'>
          <div className='flex flex-col justify-center mx-auto rounded-lg p-4 text-white w-96 shadow-[0_0_10px_white]'>
            <form onSubmit={login} noValidate className='pb-10'>
              <div className='flex flex-col mt-2 gap-3'>
                <label htmlFor="email" className='font-semibold'>Email:</label>
                <input
                  type='email'
                  required
                  name='email'
                  onChange={handleChange}
                  id='email'
                  value={signin.email}
                  placeholder='Enter your email..'
                  className='bg-transparent px-2 py-1 border'
                />
              </div>
              <div className='flex flex-col mt-2 gap-3'>
                <label htmlFor="password" className='font-semibold'>Password:</label> {/* Corrected htmlFor value */}
                <input
                  type='password'
                  required
                  value={signin.password}
                  onChange={handleChange}
                  name='password'
                  id='password'
                  placeholder='Enter your password..'
                  className='bg-transparent px-2 py-1 border'
                />
              </div>
              <button type='submit' className='bg-yellow-500 w-full hover:bg-yellow-200 transition-all ease-in-out duration-300 px-5 py-2 rounded-lg mt-5 text-lg font-bold'>
                Login
              </button>
              <p className='font-semibold text-lg text-center mt-3'>Already Have an account?<Link to="/signup" className='text-yellow-500 underline text-lg font-semibold'>Register</Link></p>
            </form>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Signin;
