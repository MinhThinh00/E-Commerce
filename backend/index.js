import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from 'cors'

import authRoute from './routes/user.route.js'
import productRoute from './routes/product.route.js'
import cardRoute from './routes/Card.route.js'
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'https://ecommerce-sigma-client-three.vercel.app',
    credentials: true // Cho phép gửi cookie
}));
app.use("/api/auth",authRoute)

app.use("/api/product",productRoute)

app.use("/api/card", cardRoute)


const PORT= process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});