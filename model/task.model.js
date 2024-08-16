import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    task:{type:String,required:true},
    status:{type:String,enum:['pending','completed'],default:'pending'},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
})

const TAskModel=mongoose.model('task',taskSchema)

export default TAskModel;