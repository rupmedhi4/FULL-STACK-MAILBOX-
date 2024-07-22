import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import userRoute from './route/user.route.js'
import mailRoute from './route/mail.route.js'


dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URL; 

app.use(express.json());

// cookie-parser middleware for get the cookies from browser
app.use(cookieParser());

// Database connection function
const dbConnect = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error in connection to DB: ${error}`);
    }
};
dbConnect();


app.use("/user",userRoute)
app.use("/mail",mailRoute)



// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
