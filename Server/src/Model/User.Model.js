import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";
import crypto from "crypto"


const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [4, 'Name must be at least 5 characters'],
        maxlength: [50, 'Name must be at most 50 characters'],
        lowercase: true,
    },
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please fill a valid email address"
        ]
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: {
            type: String
        },
        secure_Url: {
            type: String
        },
       
    },

    forgetPasswordToken: String,
   forgetPasswordExpiry: Date,
    subscription:{
        id:String,
        status:String,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.generateToken = async function () {
    return JWT.sign({
        _id: this._id,
        email: this.email,
        subcriptions: this.subscriptions,
        role: this.role,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

UserSchema.methods.comparePassword = async function (plainTextPassword) {

    
    return bcrypt.compare(plainTextPassword, this.password)

}






UserSchema.methods.generateResetToken = async function () {

    const resetoken=crypto.randomBytes(20).toString('hex');

    this.forgetPasswordToken=crypto.createHash('sha256').update(resetoken).digest('hex');

    this.forgetPasswordExpiry=Date.now() + 15 * 60 * 1000 ; //15 mins from now

 

    await this.save();
}



export const User = model("User", UserSchema);


