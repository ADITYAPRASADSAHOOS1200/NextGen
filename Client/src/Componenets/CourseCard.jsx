import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ data }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/description`);
    }

    return (
        <div 
            className='text-white w-80 h-96 shadow-sm mt-10 shadow-white rounded-lg cursor-pointer group bg-zinc-800'
            onClick={handleClick}
        >
            <div className='overflow-hidden'>
                <img
                    className='h-48 w-full rounded-t-lg group-hover:scale-110 transition-transform duration-300'
                    src={data?.thumbnail?.secure_url}
                    alt="course thumbnail"
                />
            </div>
            <div className='p-3 space-y-1 text-white'>
                <h2 className='text-lg font-bold text-yellow-500 line-clamp-2'>
                    {data?.title}
                </h2>
                <p className='line-clamp-2 text-lg'>
                <span className='text-yellow-500 text-xl font-semibold'>Description:</span> 
                    {data?.description}
                </p>
                <p className="font-semibold text-lg">
                    <span className='text-yellow-500 text-lg font-semibold'>Category:</span> {data?.category}
                </p>
                <p className="font-semibold text-lg">
                 <span className='text-yellow-500 text-lg font-semibold'>Total lectures:</span> {data?.numbersoflectures}
                </p>
                <p className="font-semibold text-lg">
                  <span className='text-yellow-500 text-lg font-semibold'>Instructor:</span> {data?.createdBy}
                </p>
            </div>
        </div>
    );
}

export default CourseCard;
