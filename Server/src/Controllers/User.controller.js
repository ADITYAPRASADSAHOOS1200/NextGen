import { User } from "../Model/User.Model.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import {  ApiError  } from "../Utils/Apierror.js"


const register=asyncHandler(async(req,res)=>{

    const { username,fullname,password,confirmpassword ,email}=req.body;

    if(!username){
        throw new ApiError(400,"username is required")
    }

    
})
const logIn=asyncHandler(async(req,res)=>{

})
const logOut=asyncHandler(async(req,res)=>{

})
const  getUser=asyncHandler(async(req,res)=>{

})



export {
    register,
    logIn,
    logOut,
    getUser
}