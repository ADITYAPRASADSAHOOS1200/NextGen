import {BsFacebook,BsTwitter,BsInstagram,BsLinkedin} from 'react-icons/bs'

import React from 'react'

const Footer = () => {

    const currendate=new Date();
    const year= currendate.getFullYear();


  return (
    <footer className='relative   h-[8vh] w-[100vw]  p-10   flex  flex-row  items-center  justify-between text-white bg-gray-800  '>
    <section className='text-xl'>
       Copyright @ {year} | All rights reserved . 
    </section>
    <section className='flex items-center justify-center gap-5 text-2xl text-white'>
      <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
       <BsFacebook/>
      </a>
      <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
       <BsInstagram/>
      </a>
      <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
       <BsLinkedin/>
      </a>
      <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
       <BsTwitter/>
      </a>
    </section>
</footer>
  )
}

export default Footer
