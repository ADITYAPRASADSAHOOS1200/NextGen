
import Course from "../Model/Course.Model.js"
import { asyncHandler } from "../Utils/AsyncHandler.js"
import AppError from "../Utils/AppError.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { deleteCloudinary, uploadcloudinary } from "../Utils/Cloudinary.js"
import { updateUser } from "./User.controller.js"


export const getAllCourses =async function(req,res,next){
   
try {
        const courses = await Course.find({}).select('-lectures');
    
        res.status(200).json({
            success:true,
            message:'All courses',
            courses,
        })
    
} catch (error) {
     return next(
         new AppError(error.message,500)
     )
}
  
}


export const getlecturesBycourseId = async function(req,res,next){
try{

const {id}=req.params

const courses=await Course.findById(id)

if(!courses){
    return res.status(200).json(new ApiResponse(200," ") )
}

res.status(200).json({
    success:true,
    message:'All courses',
    courses,
})


} catch(error){

    return next(new AppError(error.message,500))

}

}


export const createCourse = asyncHandler(async(req,res,next)=>{
try{
    const {title,description,category,createdBy}=req.body

    

    if(!title ||  !description || !category || !createdBy){
        return next(
            new AppError(400,"All fields are required")
        )
    }

    const thumbnailpath=req.file?.path

    const thumbnail = await uploadcloudinary(thumbnailpath)

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail:{
            public_id:thumbnail.public_id,
             secure_url:thumbnail.url
         }
    
    })
    

    if(!course){
        return next(new AppError(500,"Course could not be created"))
    }


   return  res.status(200).json(new ApiResponse(200,course,"Course Created Succesfully " )   )

}catch(err){
   return res.json(new AppError(500,err?.message,"something went wrong "))
} 
})

export const updateCourse = asyncHandler(async(req,res,next)=>{

   try{
         const { id }= req.params;

        const updatedcousre=await Course.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})       

    return  res.status(200).json(new ApiResponse(200,updatedcousre,"Course Created Succesfully " )   )    
 
   }catch(err){

    return next(new AppError(200,"The course not able to update "))

   }

})


export const removeCourse = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the course by ID
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return next(new AppError(404, "Course not found"));
        }

        // Delete the thumbnail from cloudinary if it exists
        if (course.thumbnail && course.thumbnail.public_id) {
            await deleteCloudinary(course.thumbnail.public_id);
        }

    
        return res.status(200).json(new ApiResponse(200, null, "Course deleted successfully"));
    } catch (error) {

        return next(new AppError(500, err?.message,"Failed to delete course"));
    }
});


export const AddlecturebyId = asyncHandler(async(req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
        return next(new AppError(200, "All fields are required"));
    }

    const course = await Course.findById(id);

    if (!course) {
        return next(new AppError(200, "Course not found"));
    }

    const lectureData = {
        title,
        description,
        lecture: {} // Initialize lecture as an empty object
    };

    // Assuming you're uploading the lecture to Cloudinary and getting back the public_id and secure_url
    const lecturepath = req.file?.path;
    const lectures = await uploadcloudinary(lecturepath);

    lectureData.lecture.public_id = lectures.public_id;
    lectureData.lecture.secure_url = lectures.secure_url;

    course.lectures.push(lectureData);
    course.numbersoflectures = course.lectures.length;
   
    await course.save();

    return res.status(200).json(new ApiResponse(200, course, "Successfully pushed"));
});



