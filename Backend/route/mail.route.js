import express from "express"
import { allReceiveMails, allSendMail, deleteMail, individualMail, sendMail } from "../controllers/mail.controller.js"
import secureRoute from "../middleware/secureRoute.js"




const router = express.Router()


router.post("/send",secureRoute,sendMail)
router.get("/allReceiveMails",secureRoute,allReceiveMails)
router.get("/allSendMails",secureRoute,allSendMail)
router.get("/showMail/:id",secureRoute,individualMail)
router.delete("/deleteMail/:id",secureRoute,deleteMail)


export default router