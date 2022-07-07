import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return next(createError(404,"YOU ARE NOT ALLOWED TO VIEW THIS PAGE"))

    jwt.verify(token,process.env.JWT, (err,user)=>{
        if(err) return next(createError(404,"YOU ARE NOT ALLOWED TO VIEW THIS PAGE"))
        req.user = user
        next()
    })
}

export const verifyUser =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
      if (req.user.id=== req.params.id || req.user.isAdmin){
        next()
      }else{
        return next(createError(404,"YOU ARE NOT ALLOWED TO VIEW THIS PAGE"))
      }
})}

export const verifyIsAdmin =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
      if (req.user.isAdmin){
        next()
      }else{
        return next(createError(404,"YOU ARE NOT AN ADMIN"))
      }
})}