import express from "express"
import { logout, register, signin } from "../contoller/Controller.js"
import { authsignup } from "../middleware/middleware.js"

const router =express.Router()


router.post("/register",  register)
router.post("/signin", signin)
router.get("/logout", logout)

export default router