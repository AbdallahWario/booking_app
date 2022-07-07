import Rooms from "../models/rooms.js";
import { createError } from "../utils/error.js";
import Hotels from "../models/hotels.js";
import hotels from "../models/hotels.js";

export const createRoom = async(req,res,next)=>{

    const hotelID = req.params.hotelid;
    

    const newRoom  = new Rooms(req.body)
    
    try {
    const savedRoom = await newRoom.save() 

    try {
        await Hotels.findByIdAndUpdate(hotelID,{$push:{rooms:savedRoom._id}})
    } catch (error) {
        next(error)
    }  
   res.status(200).json(savedRoom)

    } catch (error) {

        next(createError )
    }
}
 //DELETING A HOTEL

 export const deleteRoom = async(req,res)=>{
    const hotelID = req.params.hotelid;


    try {
        
    const deletedRoom=  await Rooms.findByIdAndDelete(req.params.id)
    try {
        await Hotels.findByIdAndUpdate(hotelID,{
            $pull:{rooms:req.params.id}
        })
    } catch (error) {
        next(error)
    }
    res.status(200).json(deletedRoom)
        
    } catch (error) {
        next(createError)
    }
}
//UPDATING A ROOM
export const updateRoom=async(req,res)=>{
     
    try {
        
    const updatedRoom=  await Rooms.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
    res.status(200).json(updatedRoom)
        
    } catch (error) {
       next(error)
    }
}

//UPDATING ROOM availability
export const updateAvailableRooms=async(req,res,next)=>{
     
    try {
        
  await Rooms.updateOne(
    {"roomNumbers._id":req.params.id},
    {
        $push:{
            "roomNumbers.$.unavailableDates":req.body.dates
        },
    }
  )
        
    } catch (error) {
       next(error)
    }
}

//GETTING ONE ROOM
export const getRoom = async(req,res)=>{

    try {
        
    const  searchedRoom=  await Rooms.findById(req.params.id)
    res.status(200).json(searchedRoom)
        
    } catch (error) {
        res.status(500).json(error)
    }
}


//GETTING ALL ROOMS

export const getRooms =async(req,res)=>{

    try {
        
    const Rooms=  await Rooms.find()
    res.status(200).json(Rooms)
        
    } catch (error) {
        res.status(500).json(error)
    }
}