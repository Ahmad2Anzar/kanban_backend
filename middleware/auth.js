import jwt from"jsonwebtoken"

import UserModel from "../model/user.model.js"

const auth=async (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(500).json({message:'token not found'})
    }
    const token=req.headers.authorization.split(' ')[1]
   
    if(!token){
         return res.status(500).json({message:'token nottttt found'})}
    else{
        try {
            const decoded=jwt.verify(token,process.env.SECRET_KEY)
            if(!decoded){ return res.status(500).json({message:'invalid token'})}
            const user=await UserModel.findById(decoded.id)
            req.user=user
            next()
        } catch (error) {
            return res.status(500).json({message:'invalid token'})
        }
    }
}

export default auth;