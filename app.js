require('dotenv').config();
const express = require('express');
const app = express()
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECTION_URL, (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Mongo Connected")
    }
} )

app.use('/user', express.json(), userRouter)

app.use('/admin',  express.json(), adminRouter)

app.listen(process.env.port, () => { console.log("Server Running ") })







// mongodb+srv://Yohran_Kallahari:<password>@blabla.ibe1zid.mongodb.net/?retryWrites=true&w=majority