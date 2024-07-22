import express from "express"
import { allReceiveMails, allSendMail, deleteMail, individualMail, sendMail } from "../controllers/mail.controller.js"
import secureRoute from "../middleware/secureRoute.js"




const router = express.Router()


router.post("/send",secureRoute,sendMail)
router.post("/allReceiveMails",secureRoute,allReceiveMails)
router.post("/allSendMails",secureRoute,allSendMail)
router.get("/showMail/:id",secureRoute,individualMail)
router.get("/deleteMail/:id",secureRoute,deleteMail)


export default router