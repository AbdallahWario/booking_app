import express, { Router } from "express"
import { login, register } from "../controllers/auth.js"
import { verifyIsAdmin, verifyToken } from "../utils/verifyToken.js"
const router = express.Router()

router.get("/verifys",verifyIsAdmin,(req,res)=>{
    res.status(200).json("you are logged in")
})

router.post("/register",register)

router.post("/login",login)

export default router
