import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import {app,server} from './socketIO/server.js'

import userRoute from "./route/user.route.js";
import mailRoute from "./route/mail.route.js";
import { connectDB } from "./db.js";


dotenv.config(); 

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


connectDB();

app.use("/api/user", userRoute);
app.use("/api/mail", mailRoute);



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
