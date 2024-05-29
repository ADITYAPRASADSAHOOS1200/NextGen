import React, { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { createAccount } from '../Redux/Slices/Authslice';

const Signup = () => {
  const [preViewImage, setPtreviewImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupdata, setSignupdata] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    avatar: ""
  });

  async function createaccount(e) {
    e.preventDefault();
    if (!signupdata.email || !signupdata.password || !signupdata.fullname || !signupdata.avatar) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupdata.fullname.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }

    if (!signupdata.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      toast.error("Invalid email id");
      return;
    }

    if (!signupdata.password.match(/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
      toast.error("Password must contain at least one special character and be at least 8 characters in length.");
      return;
    }

    const formdata = new FormData();
    formdata.append("username", signupdata.username);
    formdata.append("fullname", signupdata.fullname);
    formdata.append("email", signupdata.email);
    formdata.append("password", signupdata.password);
    formdata.append("avatar", signupdata.avatar);

    console.log("Registration Formdata",formdata)
    // Dispatch create account action
    // Make sure createAccountAction is imported correctly
    const response = await dispatch(createAccount(formdata)); 
    console.log(response);
    if (response.payload && response.payload.success) {
      navigate("/");
    }

    setSignupdata({
      username: "",
      fullname: "",
      email: "",
      password: "",
      avatar: ""
    });

    setPtreviewImage("");
  }



  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupdata({
      ...signupdata,
      [name]: value,
    });
  }

  function getImage(e) {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setSignupdata({
        ...signupdata,
        avatar: uploadImage
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setPtreviewImage(this.result);
      });
    }
  }

  return (
    <HomeLayout>
      <div className='h-[100vh]'>
        <div className='flex flex-col justify-center mx-auto rounded-lg p-4 text-white w-96 shadow-[0_0_10px_white]'>
          <form onSubmit={createaccount} noValidate className='pb-10'>
            <h1 className='text-center text-2xl font-semibold'>Registration Page</h1>
            <label htmlFor='image_upload' className='cursor_pointer'>
              {preViewImage ? (
                <img className='w-24 h-24 rounded-full mt-2 m-auto' src={preViewImage} alt="Preview" />
              ) : (
                <BsPersonCircle className='w-24 h-24 mt-2 rounded-full m-auto' />
              )}
            </label>
            <input
              className='hidden'
              type='file'
              onChange={getImage}
              name='image_upload'
              id='image_upload'
              accept='.jpg,.jpeg,.png,.svg'
            />
            <div className='flex flex-col mt-2 gap-3'>
              <label htmlFor="username" className='font-semibold'>Username:</label>
              <input
                type='text'
                name='username'
                id='username'
                value={signupdata.username}
                onChange={handleUserInput}
                placeholder='Enter your username..'
                className='bg-transparent px-2 py-1 border'
              />
            </div>
            <div className='flex flex-col mt-2 gap-3'>
              <label htmlFor="fullname" className='font-semibold'>Fullname:</label>
              <input
                type='text'
                name='fullname'
                id='fullname'
                value={signupdata.fullname}
                onChange={handleUserInput}
                placeholder='Enter your fullname..'
                className='bg-transparent px-2 py-1 border'
              />
            </div>
            <div className='flex flex-col mt-2 gap-3'>
              <label htmlFor="email" className='font-semibold'>Email:</label>
              <input
                type='email'
                required
                name='email'
                onChange={handleUserInput}
                id='email'
                value={signupdata.email}
                placeholder='Enter your email..'
                className='bg-transparent px-2 py-1 border'
              />
            </div>
            <div className='flex flex-col mt-2 gap-3'>
              <label htmlFor="password" className='font-semibold'>Password:</label>
              <input
                type='password'
                required
                value={signupdata.password}
                onChange={handleUserInput}
                name='password'
                id='password'
                placeholder='Enter your password..'
                className='bg-transparent px-2 py-1 border'
              />
            </div>
            <button type='submit' className='bg-yellow-500 w-full hover:bg-yellow-200 transition-all ease-in-out duration-300 px-5 py-2 rounded-lg mt-5 text-lg font-bold'>
              Create Account
            </button>
            <p className='font-semibold text-lg text-center mt-3'>Already Have an account?<Link to="/signin" className='text-yellow-500 underline text-lg font-semibold'>Login</Link></p>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Signup;
