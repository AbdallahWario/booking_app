import express, { Router } from "express"
import { addHotel, countByCity, countByType, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotels.js"
import { verifyIsAdmin } from "../utils/verifyToken.js"
const router = express.Router()

// CREATE A HOTEL
router.post("/",verifyIsAdmin, addHotel)

//UPDATE A HOTEL

router.put("/:id",verifyIsAdmin, updateHotel)
//DELETE  A HOTEL
router.delete("/:id",verifyIsAdmin, deleteHotel)

//GET ONE hotel

router.get("/get/:id",getHotel)



//GET ALL hotels
router.get("/",getHotels)


//GET HOTEL ROOMS
router.get("/room/:id",getHotelRooms)



//COUNT BY CITY
router.get("/countByCity",countByCity)
//COUNT BY TYPE
router.get("/countByType",countByType)




export default router
