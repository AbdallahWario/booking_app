import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const register = async(req,res,next)=>{

    try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);


         const newUser =  new User({
            username:req.body.username,
            email:req.body.email,
            password: hash

         })

         await newUser.save()
         res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}


export const login = async(req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if (!user)return next(createError(404,"invalid username or password"))

        const isPass = await bcrypt.compare(req.body.password,user.password)
         if(!isPass) return next(createError(404,"invalid username and/or password"))

         
         const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        
         const{password,isAdmin, ...otherDetails}= user._doc

         res.status(200).cookie("access_token",token,{
            httpOnly:true, 
        }).json(otherDetails)

    } catch (error) {
        next(error)
        
    }
}