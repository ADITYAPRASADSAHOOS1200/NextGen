import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from 'react'
import { getAllcourse } from "../Redux/Slices/Courseslice";
import HomeLayout from "../Layouts/HomeLayout";
import CourseCard from "../Componenets/CourseCard";


const Courselist = () => {

   const coursedata=useSelector((state)=>state?.course?.coursedata);
   console.log(coursedata);
   const dispatch=useDispatch()

   async function loadCourses(){
     await dispatch(getAllcourse())
   }

   useEffect(()=>{
    loadCourses();
   },[])

  return (

    <HomeLayout>
     <div className=" h-[100vh]   flex flex-col pt-10 pl-28 gap-10 text-white">
        <h1 className=" text-3xl font-semibold text-center underline mb-10 ">
            Explore Course Made By {" "}
             <span className=" text-yellow-500 text-3xl font-semibold Underline">
              Industry Experts
            </span>
            </h1>
            <div className="mb-10 flex flex-wrap gap-14">
           {
               coursedata?.map((elemnt)=>{

                return <CourseCard key={elemnt._id} data={elemnt}/>

               })
           }
            </div>
       


     </div>
    </HomeLayout>   
   
  )
}

export default Courselist
