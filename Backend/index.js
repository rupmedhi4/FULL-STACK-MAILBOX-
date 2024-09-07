import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors"
import path from 'path'

import userRoute from './route/user.route.js'
import mailRoute from './route/mail.route.js'
import bodyParser from "body-parser";


dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URL; 

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
  }));
app.use(bodyParser.urlencoded({ extended: true })); // URL encoded bodies
app.use(bodyParser.json()); // JSON bodies

// cookie-parser middleware for get the cookies from browser
app.use(cookieParser());

// Database connection 
const dbConnect = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error in connection to DB: ${error}`);
    }
};

dbConnect();


app.use("/api/user",userRoute)
app.use("/api/mail",mailRoute)



//Deployment setup

if(process.env.NODE_ENV === "production"){
    const dirPath = path.resolve()
  
    app.use(express.static("./frontend/build"))
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(dirPath,"./frontend/build","index.html"))
    })
  }



// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
