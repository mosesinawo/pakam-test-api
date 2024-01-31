import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

import authRoutes from './routes/authRoutes.js'
import assessmentRoutes from './routes/assessmentRoutes.js'
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import cookieParser from 'cookie-parser';
// import path from 'path';
import cors from "cors";
const app = express();


dotenv.config();

app.use(cors({
  origin: '*', // Set origin to '*' to allow requests from any origin
  credentials: true, // Allow cookies and credentials
}));
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });
 


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`backend running on port ${PORT}`);
});

app.use('/api/auth', authRoutes);
app.use('/assessment', assessmentRoutes);
