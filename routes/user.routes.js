import express from "express"
import bcrypt from "bcrypt"
import UserModel from "../model/user.model.js"
import jwt from "jsonwebtoken"

const userRouter=express.Router()

userRouter.post("/register",async (req,res)=>{
const{name,age,email,password,role}=req.body
 try {
       bcrypt.hash(password,5,async (err,hash)=>{
        if(err){
            res.status(500).json({message:'internal server issue'})
        }
        else{
            const user=new UserModel({
                name,
                age,
                role,
                password:hash,
                email,
            })
            await user.save()
            res.status(200).json({message:"succesfull"})

        }
       })
 } catch (error) {
  res.status(500).json({message:`${error}`})  
 }
})


userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(500).json({message:'wrong email'})
        }
        else{
            bcrypt.compare(password,user.password, async (err,result)=>{
                if(err){
                    return res.status(500).json({message:'internal server issue'})
                }
                if(result){
                    const token=jwt.sign({id:user._id},process.env.SECRET_KEY)
                   
                    return res.status(200).json({message:"login successfull",token})
                }
                else{
                    return res.status(500).json({message:'wrong password'})
                }
            })
        }
    } catch (error) {
        
    }
})

export default userRouter