import React, { useEffect, useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import About from '../assets/Images/about.png'
import { Data } from './Data'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";




const Aboutus = () => {

{/* <MdKeyboardDoubleArrowRight />
<MdKeyboardDoubleArrowLeft /> */}
  const [Index,setIndex]=useState(0);



  const handlePrev=()=>{

    setIndex((Previndex)=>Previndex === 0 ? Data.length-1: Previndex-1 )

  }

  const handleNext=()=>{
    setIndex((Previndex)=>Previndex === Data.length-1 ? 0 : Previndex+1 )
  }

  useEffect(()=>{
    const time= setInterval(()=>{
      setIndex((Previndex)=> (Previndex + 1) % Data.length)
    },2500)

    return ()=> clearInterval(time)
    
  },[])

  return (
     <HomeLayout>
      <section className='min-h-[100vh]'>
       <div className='flex justify-center flex-row  items-center mt-10 gap-[50px] '>
       <div className='w-[500px]'>
       <h1 className='text-3xl font-bold text-white'>Join Our Community. <span className='text-3xl font-semibold text-yellow-300'>We Provide Best Production Grade Course </span></h1>
       <p className='space-x-4 text-xl w-86 font-bold'>Become a part of the NextGen family and connect with a global network of learners, educators, and innovators. Our community is at the heart of everything we do, fostering collaboration, support, and inspiration. By joining us, you will gain access to a vibrant platform where you can share knowledge, exchange ideas, and grow together. Whether you are a student seeking new skills, a teacher looking to expand your reach, or a lifelong learner passionate about education, there is a place for you here. Join us today and be a part of the future of education!</p>
       </div>
       <div className='w-[700px]'>
        <img src={About} alt="About.png"/>
       </div>
       </div>
       <div className='flex justify-center items-center mt-20 '>
          <h1 className='text-4xl font-bold text-yellow-500 underline'>Our Alumni</h1>
        </div>
        
        <div className='flex justify-center relative items-center mt-20 pb-20'>
          <MdKeyboardDoubleArrowLeft className='text-4xl cursor-pointer absolute left-36 top-1/2 transform -translate-y-1/2 z-10' onClick={handlePrev} />
          <div className='flex flex-col items-center mx-4 '>
            <img src={Data[Index].image} alt={Data[Index].name} className='w-[150px] h-[150px] rounded-full border-2 border-red-500' />
            <h2 className='text-2xl font-bold mt-4'>{Data[Index].name}</h2>
            <h3 className='text-xl font-medium'>{Data[Index].company}</h3>
            <p className='text-center mt-2 px-[30%]'>{Data[Index].description}</p>
          </div>
          <MdKeyboardDoubleArrowRight className='text-4xl cursor-pointer  absolute right-36 top-1/2 transform -translate-y-1/2 z-10 ' onClick={handleNext} />
        </div>
     
      </section>      
     </HomeLayout>
  )
}

export default Aboutus
