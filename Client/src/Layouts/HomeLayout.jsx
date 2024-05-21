import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Footer from '../Componenets/Footer';

const HomeLayout = ({children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-[90vh] ">
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
            <li className='mt-7'>
              <Link to="/courses" onClick={toggleDrawer}>Courses</Link>
            </li>
            <li className='mt-7'>
              <Link to="/about" onClick={toggleDrawer}>About us</Link>
            </li>
            <li className='mt-7'>
              <Link to="/contactus" onClick={toggleDrawer}>Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
      { children }
      
      <Footer/>
      </div>

  
  );
}

export default HomeLayout;

