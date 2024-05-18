
import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    lecture: {
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    }
});

const CourseSchema=new mongoose.Schema({

title:{
    type:String,
    required:[true,"title is required"],
    minLength:[8,"Title must be at least 8 charcters"],
    maxLength:[59,"Title must  be less than 200 charactyes"]
},
description:{
    type:String,
    required:[true,"description is required"],
    minLength:[8,"description must be at least 8 charcters"],
    maxLength:[200,"description must  be less than 200 charactyes"],
    trim:true
},
category:{
    type:String,
    required:[true,"Category is required"],
    trim:true
  
},
thumbnail:{
   public_id:{
     type:String,
     required:true
   },
   secure_url:{
     type:String,
     required:true
   }
},
lectures:[LectureSchema],
numbersoflectures:{
    type:Number,
    default:0
},
createdBy:{
    type:String,
 required:true
}},{timestamp:true} )

const Course=mongoose.model("courses",CourseSchema)


export default Course