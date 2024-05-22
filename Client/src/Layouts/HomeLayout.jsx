import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Footer from '../Componenets/Footer';


const HomeLayout = ({children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);




 const dispatch=useDispatch()

const navigate= useNavigate();


const  isLoggedIn=useSelector(state=>state?.auth?.isLoggedIn)

const Role=useSelector(state=>state?.auth?.role)


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  const handleLogOut = (e) => {
    e.preventDefault();
    
   // const res=await dispatch(logout())

    navigate("/")
  }
 
 

  return (
    
    <div className="min-h-[90vh]">
      <div className={`drawer ${isDrawerOpen ? 'open' : ''} relative left-[40px] z-50 w-fit`}>
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-content">
           <FiMenu
              onClick={toggleDrawer}
              size={"34px"}
              className=" text-white m-2 cursor-pointer "
            />
        </div>
        <div className={`drawer-side ${isDrawerOpen ? 'w-64' : 'w-0'} transition-width duration-300`}>
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content relative">
            <li className="absolute top-0 right-2 z-50">
              <button >
                <AiFillCloseCircle onClick={toggleDrawer} size={28} />
              </button>
            </li>
            <li className='mt-7'>
              <Link to="/" onClick={toggleDrawer}>Home</Link>
            </li>
            {isLoggedIn && Role === 'Admin' && (
              <li className=''>
                <Link to ='/Admin/dashboard'>
                 AdminDashboard
                 </Link>
                 </li>)
           }
            <li className='mt-7'>
              <Link to="/courses" onClick={toggleDrawer}>Courses</Link>
            </li>
            <li className='mt-7'>
              <Link to="/about" onClick={toggleDrawer}>About us</Link>
            </li>
         
            <li className='mt-7'>
              <Link to="/contactus" onClick={toggleDrawer}>Contact us</Link>
            </li>
            {
              !isLoggedIn && (
                  <li className='absolute bottom-4 w-[90%]'>
                        <div className='w-full  flex items-center justify-center'>
                    <button className='btn-primary text-white color ring-1 ring-blue-600 mr-2 px-4 py-1 font-semibold rounded-md w-full'>
                      <Link to="/login">login</Link>
                    </button>
                    <button className='btn-secondary text-white px-4 ring-1 ring-yellow-600  py-1 font-semibold rounded-md w-full'>
                      <Link to="/logout">logout</Link>
                    </button>
                </div>
                  </li>
              )
            }
            {
              isLoggedIn && (
                  <li className='absolute bottom-4 w-[90%]'>
                        <div className='w-full  flex items-center justify-center'>
                    <button className='btn-primary text-white color ring-1 ring-blue-600 mr-2 px-4 py-1 font-semibold rounded-md w-full'>
                      <Link to="/Profile">Profile</Link>
                    </button>
                    <button className='btn-secondary text-white px-4 ring-1 ring-yellow-600  py-1 font-semibold rounded-md w-full' onClick={handleLogOut}>
                      <Link to="/logout">logout</Link>
                    </button>
                </div>
                  </li>
              )
            }
          </ul>
        </div>
      </div>
      { children }
      
      <Footer/>
      </div>

          
  )

}


export default HomeLayout;

