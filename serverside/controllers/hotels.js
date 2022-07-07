import Hotel  from "../models/hotels.js"
import Rooms from "../models/rooms.js";

import { createError } from "../utils/error.js"



//UPDATING A HOTEL
export const updateHotel=async(req,res)=>{

    try {
        
    const updatedHotel=  await Hotel.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
    res.status(200).json(updatedHotel)
        
    } catch (error) {
       next(error)
    }
}

//ADDING A NEW HOTEL
export const addHotel=async(req,res)=>{
     //take the hotel'sde
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    
    } catch (error) {
        res.status(500).json(error)
    }
    
    
    }

    //DELETING A HOTEL

    export const deleteHotel = async(req,res)=>{

        try {
            
        const deletedHotel=  await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedHotel)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //GETTING ONE HOTEL
    export const getHotel = async(req,res)=>{

        try {
            
        const  searchedHotel=  await Hotel.findById(req.params.id)
        res.status(200).json(searchedHotel)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }


    //GETTING ALL HOTELS

    export const getHotels =async(req,res)=>{
  const{min,max,...others} = req.query
        try {
            
        const hotels=  await Hotel.find({...others,cheapestPrice:{$gt:min||1,$lt:max||999}}).limit(req.query.limit)
        res.status(200).json(hotels)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //COUNT BY CITY
    export const countByCity =async(req,res,next)=>{
      const cities = req.query.cities.split(",")
        try {
       const list = await Promise.all(cities.map(
        city=>{
            return Hotel.countDocuments({city:city})
        }
       ))     
       res.status(200).json(list)
        } catch (error) {
           next(createError)
        }
    }

    //COUNT BY  TYPE
    export const countByType =async(req,res)=>{
        
          try {
    const hotelCount=await Hotel.countDocuments({type:"hotel"})
    const apartmentCount=await Hotel.countDocuments({type:"apartment"})
    const resortCount=await Hotel.countDocuments({type:"resort"})
    const villaCount=await Hotel.countDocuments({type:"villa"})
    const cabinCount=await Hotel.countDocuments({type:"cabin"})

    res.status(200).json([
        {type:"hotel" , count: hotelCount},
        {type:"apartments" , count: apartmentCount},
        {type:"resort" , count: resortCount},
        {type:"villa" , count: villaCount},
        {type:"cabin" , count: cabinCount}




    ])


          }
    
           catch (error) {
             next(createError)
          }
      }


      export const getHotelRooms = async(req,res,next)=>{
        try {
            const hotel =  await Hotel.findById(req.params.id);
            const list = await Promise.all(
                hotel.rooms.map((room)=>{
                    return Rooms.findById(room)
                })
            )
            res.status(200).json(list)
        } catch (error) {
            next(error)
        }
      }