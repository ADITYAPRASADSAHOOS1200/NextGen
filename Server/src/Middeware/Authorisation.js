import { asyncHandler } from "../Utils/AsyncHandler.js";
import AppError from "../Utils/AppError.js";
import jwt, { decode } from "jsonwebtoken";
import { User } from "../Model/User.Model.js";

export const Authorisaton = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer", "");
         
        if (!token) {

            throw new Error(400,"Access token not provided"); 
            
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password ");
      

        if (!user) {

           return next(new Error("Invalid access token"));

        }
        
        req.user = user;
        next();
    } catch (error) {
         return next( new AppError(400,"invalid token request"));
    }
    
});



export const authorisedRoles=(...roles)=>asyncHandler(async(req,res,next)=>{

    console.log(req.user);
    const Currentuserrole=req.user.role;

    if(!roles.includes(Currentuserrole)){
       return next(
         new AppError("You do not have access the permission of the route")
       )
    }
    next();

})



