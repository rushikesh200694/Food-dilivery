import express from "express"
import dotenv from "dotenv"
dotenv.config()
import path from "path"
import { fileURLToPath } from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import userRouter from "./routes/user.routes.js"

import itemRouter from "./routes/item.routes.js"
import shopRouter from "./routes/shop.routes.js"
import orderRouter from "./routes/order.routes.js"
import http from "http"
import { Server } from "socket.io"
import { socketHandler } from "./socket.js"

const app=express()
const server=http.createServer(app)

const io=new Server(server,{
   cors:{
    origin:"http://localhost:5173",
    credentials:true,
    methods:['POST','GET']
}
})

app.set("io",io)



const port=process.env.PORT || 5000
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173"
app.use(cors({
    origin: clientUrl,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/shop",shopRouter)
app.use("/api/item",itemRouter)
app.use("/api/order",orderRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get(/.*/, (req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend/dist","index.html"))
    })
}

socketHandler(io)
server.listen(port,()=>{
    connectDb()
    console.log(`server started at ${port}`)
})

