import express, { Router } from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js"
import { verifyUser } from "../utils/verifyToken.js"
const router = express.Router()


//update user details

router.put("/:id",updateUser)
//delete a user
router.delete("/:id",deleteUser)

//get a user

router.get("/:id",getUser)



//get all users
router.get("/",verifyUser,getUsers)



export default router
