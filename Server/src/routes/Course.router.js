import express from "express"
import { Router } from "express"
import { createCourse, getAllCourses,getlecturesBycourseId, removeCourse, updateCourse ,AddlecturebyId} from "../Controllers/Course.controller.js";
import { upload } from "../Middeware/Multer.js";
// import { Authorisaton } from "../Middeware/Authorisation.js";


import { authorisedRoles } from "../Middeware/Authorisation.js";
import { Authorisaton } from "../Middeware/Authorisation.js";




const router = Router();

router.route('/').get(getAllCourses).post(Authorisaton,authorisedRoles("ADMIN"),upload.single("thumbnail"),createCourse)

router.route('/:id').get(getlecturesBycourseId)
.put(Authorisaton,authorisedRoles("ADMIN"),updateCourse)
.delete(Authorisaton,authorisedRoles("ADMIN"),removeCourse)
.post(Authorisaton,authorisedRoles("ADMIN"),upload.single("lecture"),AddlecturebyId)
  

export default router;