import express from "express"
import dotenv from "dotenv"
import connection from "./config/db.js"
import userRouter from "./routes/user.routes.js"
import auth from "./middleware/auth.js"
import taskROuter from "./routes/task.route.js"


dotenv.config()

const server=express()
server.use(express.json())
server.use("/user",userRouter)
server.use("/task",auth,taskROuter)

server.post("/",[auth],(req,res)=>{
    res.send(req.user)
})

server.listen(process.env.PORT,async ()=>{
   try {
    await connection
    console.log('welcome to kanban board')
   } catch (error) {
    console.log("error connecting to data base",error)
   }
})