import { buildCreateSlice, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosinstance";
import toast from "react-hot-toast";
import { act } from "react";


const   initialState={
     coursedata:[]
}




export const getAllcourse=createAsyncThunk("course/getcourses",async(data)=>{
try{
    const response=axiosInstance.get("course/")
    toast.promise(response,{
        loading:"wait a moment !",
        success:"course loaded successfully",
        error:'unbale ro get courses'

    })

     return (await response).data.courses
    } catch (error) {
        toast.error(error?.response?.data?.message);
       
    }

})

const courseSlice=createSlice({
   name:'courses',
   initialState,
   reducers:{},
   extraReducers:(builder)=>{
    builder
    .addCase(getAllcourse.fulfilled,(state,action)=>{
          if(action?.payload){
          console.log(action.payload);

            state.coursedata=[...action.payload]
          }
    })
     
   }
})

export default courseSlice.reducer