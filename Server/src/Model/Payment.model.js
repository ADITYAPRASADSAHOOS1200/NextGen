import mongoose, { Schema } from "mongoose";


const PaymentSChema=new Schema({
   razorpay_payment_id:{
      type:String,
      required:true,

   },
  razorpay_Subscription_id:{
    type:String,
    required:true,
  },
 razorpay_Signature:{
    type:String,
    required:true,
 }


},{timestamps:true})

export const Payment = mongoose.model('payment',PaymentSChema)

