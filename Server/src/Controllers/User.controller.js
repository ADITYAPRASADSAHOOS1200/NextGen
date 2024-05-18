import { User } from "../Model/User.Model.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import   AppError  from "../Utils/AppError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { deleteCloudinary, uploadcloudinary } from "../Utils/Cloudinary.js";
import { Sendmail } from "../Utils/SendMail.js";
import crypto from "crypto"
import bcrypt from "bcrypt"

const cookieOption={

    maxAge:7 * 24 * 24 * 60 * 1000,
    httpOnly:true,
    secure:true,
    
}



const register = asyncHandler(async (req, res, next) => {
    // Extract necessary information from the request body
    const { username, fullname, password, email } = req.body;

    console.log(req.file);

    // Check if all required fields are provided
    if (!username || !fullname || !password || !email) {
        // If any required field is missing, return an error response
        return next(new AppError(400, "All fields are required"));
    }





    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // If the email is already registered, return an error response
            return next(new AppError('Email already exists', 400));
        }

       
        // Extract the avatar file from the request
        const avatarFile = req.file?.path;

        if (!avatarFile) {
            // If avatar file is missing, return an error response
            return next(new AppError(400, 'Avatar file not found'));
        }

    
        // Upload the avatar to Cloudinary
        const avatar = await uploadcloudinary(avatarFile);
        
        if (!avatar.url) {
            // If avatar URL is not found, return an error response
            return next(new AppError(400, 'Avatar URL not found'));
        }

        // Create the user in the database with avatar URL
        const newUser = await User.create({
            username,
            fullname,
            email,
            password,
            avatar: {
                public_id: email,
                secure_Url: avatar?.url
            }
        });

        




        // Send a success response with the newly created user data
        const userWithoutPassword = { ...newUser.toObject(), password: undefined };
        res.status(201).json({
            success: true,
            data: userWithoutPassword,
            message: "User registered successfully"
        });

    } catch (err) {
        // If an error occurs during registration, return an error response
        return next(new AppError(400, err.message || "Unable to create user"));
    }
});


const logIn=asyncHandler(async(req,res,next)=>{

  try{
    const {email,password}=req.body;
      console.log(email,password);
    if(!(email || password) ){
         return next(new AppError(400,'All fields are required'))
    }

    const user=await User.findOne({email}).select("+password");
  

    const Confirmpassword=await user.comparePassword(password)  


      if(!Confirmpassword){
         return next(new AppError(400 , "invalid Credentials"))
      }

    const Token=await user.generateToken();
    const userWithoutPassword = { ...user.toObject(), password: undefined };
      
    res.cookie('token',Token,cookieOption)
    




    return res.status(200).json(
        new ApiResponse(200,userWithoutPassword,"User loggedIn Successfully")
    )
}catch(err){
 
    return next(new AppError( 400,err?.message || "Not able to LoggedIn" ))

}

})



const logOut=asyncHandler(async(req,res)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"User Logged Out successFully"
    })
})




const  getUser=asyncHandler(async(req,res,next)=>{
   
try {


        const userId= req.user?._id
        console.log(userId)
    
        const user = await User.find(userId).select("-password")
         console.log("userby onemptied",user)
        if(!user){

           return next( new AppError(400,"User not able to find"))

        }
       
        res.status(200).json(
             new ApiResponse(200,user,"User details")
        )
    
} catch (error) {
  
     return next(new AppError('Fail to fetch Profile Details'))

   }
})


const forgetPassword=async(req,res,next)=>{

    const { email }=req.body

    if(!email){
        return next(new AppError(400,"email Is required"))
    }

    const user=await User.findOne({email});
    

    if(!user){
        return next(new AppError(404,"email not found!!"))
    }


     await user.generateResetToken() 
  
      await user.save()

    const resetPasswordUrl=`${process.env.FRONTEND_URL}/${user.forgetPasswordToken}`

    const subject='Resset password'
    const message=`you can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">reset your password</a>\n
    link does not work for some reason copy paste the link in new tab ${resetPasswordUrl}`

    try{
    
        await Sendmail(email,subject,message);
    
        res.status(200).json({
            success:true,
            message:`Reset password Email has been sent to ${email} the email SuccessFully`
         })

    }catch(err){
       user.forgetPassword =undefined;
       user.forgetPasswordExpiry=undefined;
       await user.save()
       return next(new AppError(500,err.message))
    }

}


const resetpassword = asyncHandler(async (req, res, next) => {
    const { resettoken } = req.params;
    const { password } = req.body;

    console.log("flag",resettoken,password);

    // const forgetPasswordToken = crypto.create('sha256').update(resettoken).digest('hex');
    // console.log(forgetPasswordToken)
    try {
        const user = await User.findOne({
            forgetPasswordToken:resettoken,
            forgetPasswordExpiry: { $gt: Date.now() }
        });
         console.log("flag2",user);

        if (!user) {
            return next(new AppError(400, 'Token is invalid or expired. Please try again.'));
        }

        // Update user's password and reset token fields

        user.password = password; // Hash the new password
        user.forgetPasswordExpiry = undefined;
        user.forgetPasswordToken = undefined;

        await user.save(); // Await user save operation

        res.status(200).json({
            success: true,
            message: 'Password changed successfully!'
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        return next(new AppError(500, 'Internal server error!!!'));
    }
});


const changepassword = asyncHandler(async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return next(new AppError(400, "Old password and new password are required."));
        }

        if (oldPassword === newPassword) {
            return next(new AppError(400, "New password must be different from the old password."));
        }

        const { _id } = req.user;

        const user = await User.findById(_id);

        if (!user) {
            return next(new AppError(400, "User not found."));
        }

        const isvalid=await user.comparePassword(oldPassword)
      
        if(!isvalid){
            return next(new AppError(200,"password is not valid"))
        }
        // Update user's password
        user.password = newPassword;
        await user.save();

        user.password = undefined;

        return res.status(200).json(
            new ApiResponse(200, user, "Password changed successfully.")
        );
    } catch (error) {
        return next(new AppError(400, error.message || "Password cannot be updated."));
    }
});



const updateUser = asyncHandler(async (req, res, next) => {
    try {
        const { fullname, username } = req.body;

        if (!fullname || !username) {
            return next(new AppError(400, "All fields are required"));
        }

        const prevUser = await User.findById(req.user?._id);

        if (!prevUser) {
            return next(new AppError(400, "Previous user not found"));
        }

        await deleteCloudinary(prevUser.avatar.secure_Url);

        
        const avatarFile = req.file?.path;
        const Avatar = await uploadcloudinary(avatarFile);

        if (!Avatar.url) {
            return next(new AppError(400, "Avatar URL not found"));
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user?._id }, // Query condition
            { 
                $set: {
                    fullname: fullname,
                    username: username,
                    avatar: { secure_Url: Avatar.url } // Corrected syntax for avatar
                } 
            },
            { new: true } // To return the modified document instead of the original
        ).select("-password");

        return res.status(200).json(
            new ApiResponse(200, updatedUser, "User updated successfully")
        );

    } catch (err) {
        return next(new AppError(400, err?.message || "An error occurred while updating user information"));
    }
});





export {
    register,
    logIn,
    logOut,
    getUser,
    forgetPassword,
    resetpassword,
    changepassword,
    updateUser,
}


