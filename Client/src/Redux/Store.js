import  { configureStore } from '@reduxjs/toolkit';
import AuthsliceReducer from './Slices/Authslice';
import CoursesliceReducer from './Slices/Courseslice';

const store=configureStore({
    reducer:{
       auth:AuthsliceReducer,
       course:CoursesliceReducer
    },
    devTools:true
})


export default store;