import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Date,required:true},
    role:{type:String,enum:['admin','user'],default:'user'},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const UserModel=mongoose.model('user',userSchema)

export default UserModel