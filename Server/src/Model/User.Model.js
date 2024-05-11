import mongoose from "mongoose";


const UserSchema= new mongoose.Schema({
     username:{
        type:String,
        required:[true,'Username is required'],
        lowercase:true
     },
     fullname:{
        type:String,
        required:[true,'fullname is required'],
        lowercase:true
     },
     email:{
      type:String,
      required:[true,'Email is required'],
      lowercase:true
     },
     password:{
      type:String,
      required:[true,'password is required'],
      minlength:10,
      lowercase:true
     }
     
},{timestamps:true})



export const User= mongoose.model("User",UserSchema)

