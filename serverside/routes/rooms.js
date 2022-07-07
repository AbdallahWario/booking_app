import express, { Router } from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateAvailableRooms, updateRoom } from "../controllers/rooms.js"
import { verifyIsAdmin } from "../utils/verifyToken.js"
const router = express.Router()

// CREATE A HOTEL
router.post("/:hotelid",verifyIsAdmin, createRoom)

//UPDATE A HOTEL

router.put("/:id",verifyIsAdmin, updateRoom)
router.put("/availability/:id", updateAvailableRooms)

//DELETE  A HOTEL
router.delete("/:id/:hotelid",verifyIsAdmin, deleteRoom)

//GET ONE hotel

router.get("/:id",getRoom)



//GET ALL hotels
router.get("/",getRooms)



export default router
