import { Router } from "express"
import { contactUs, userStats } from "../Controllers/Miscllenaous.controller.js"

const router=Router()


router.route('/contact').post(contactUs)

router.route('/stats/users').get(userStats)


export default router;