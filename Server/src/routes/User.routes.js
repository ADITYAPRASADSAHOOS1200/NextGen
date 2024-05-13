import { Router } from "express";

import { Authorisaton } from "../Middeware/Authorisation.js";

import { upload } from "../Middeware/Multer.js";


import { register,logIn,logOut, getUser, forgetPassword, resetpassword } from "../Controllers/User.controller.js";


const router = Router()


router.route('/register').post(upload.single("avatar"),register)
router.route('/logIn').post(logIn)
router.route('/logOut').post(logOut)
router.route('/profile').get(Authorisaton,getUser)

router.route('/reset').post(forgetPassword);
router.route('/reset/:resettoken').post(resetpassword)


export default router