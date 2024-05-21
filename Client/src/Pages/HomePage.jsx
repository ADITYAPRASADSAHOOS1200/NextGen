import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Link } from 'react-router-dom'
import image1 from "../assets/Images/Main2.png"

const HomePage = () => {
  return (
   <HomeLayout>
     <section className=' text-white flex justify-center items-center gap-10 mx-10 h-[90vh] pl-20 '>
        <div className="w-1/2 space-y-6 " >
         <h1 className='text-5xl font-semibold'>FIND OUT BEST
          <span className='text-yellow-500 text-5xl font-semibold'>
            ONLINE COURSES
          </span>
          </h1>
          <p className='text-xl text-gray-300 font-semibold'>
            we have a large Library of Courses taught by highly skilled and qualified Faculties At affordable cost.
          </p>
          <div className='space-x-6'>
            <Link to = "/course ">
                <button className='bg-yellow-600 px-5 py-3 rounded-md text-xl cursor-pointer font-semibold hover:bg-yellow-400 '>
                    Explore Courses
                </button>
            </Link>
            <Link to = "/course ">
                <button className='bg-transparent ring-1
                 ring-amber-400 px-5 py-3 rounded-md text-xl cursor-pointer font-semibold hover:bg-yellow-600 transition-all '>
                    Contact us
                </button>
            </Link>
        </div>
        </div>
        <div className='w-1/2 flex items-center justify-center'>
            <img alt='homepage Image' src={image1 }  className='h-[60%] w-[80%]' />
        </div>
     </section>
   </HomeLayout>
  )
}

export default HomePage
