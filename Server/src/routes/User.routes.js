import { Router } from "express";

import { register,logIn,logOut, getUser } from "../Controllers/User.controller";


const router = Router()


router.route('/register').post(register)
router.route('/logIn').post(logIn)
router.route('/logOut').post(logOut)
router.route('/getUser').get(getUser)


export default router