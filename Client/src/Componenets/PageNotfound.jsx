import React from 'react'
import Footer from './Footer'
import four from '../assets/Images/404.png'
import { useNavigate } from 'react-router-dom'

const PageNotfound = () => {
    const navigate=useNavigate()
  return (
    <>
    <section className='h-[100vh]'>
    <div className='flex flex-col items-center justify-center  '>
    <img src={four} alt='404 not found' className='h-[600px] w-[700px] text-white'/>
   <button className="btn btn-outline btn-secondary text-xl" onClick={()=>navigate("/")}> Are You Lost ?</button>
   
    </div>
   
    </section>
    <Footer/>
    </>
  )
}

export default PageNotfound
