import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js'
import userRoutes from './routes/userRoutes.js';


dotenv.config();  //load env file
const app = express();  // create app fist
app.use(express.json()); //call json correctrly
dbConnect(); //connect to db

app.use('/auth' , userRoutes) //user routes

//create server
app.listen(process.env.PORT, ()=>{
    console.log(`server is running is ${process.env.PORT}`);
    
});