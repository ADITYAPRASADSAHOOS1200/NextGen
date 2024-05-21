import  { configureStore } from '@reduxjs/toolkit';
import AuthsliceReducer from './Slices/Authslice';

const store=configureStore({
    reducer:{
       auth:AuthsliceReducer
    },
    devTools:true
})


export default store;