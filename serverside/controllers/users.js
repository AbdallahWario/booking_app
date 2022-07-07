import Hotel  from "../models/hotels.js"
import User from "../models/User.js"
import { verifyUser } from "../utils/verifyToken.js"



//UPDATING A USER
export const updateUser=async(req,res)=>{

    try {
        
    const updatedUser=  await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
    res.status(200).json(updatedUser)
        
    } catch (error) {
       next(error)
    }
}

    //DELETING A USER

    export const deleteUser = async(req,res)=>{

        try {
            
        const deletedUser=  await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedUser)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    //GETTING A USER
    export const getUser = async(req,res)=>{

        try {
            
        const  searchedUser=  await User.findById(req.params.id)
        res.status(200).json(searchedUser)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }


    //GETTING ALL USERS

    export const getUsers =async(req,res,verifyUser)=>{

        try {
            
        const users=  await User.find()
        res.status(200).json(users)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }