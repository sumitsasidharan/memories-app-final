import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Routes
app.use('/posts', postRoutes);
app.use('/user', userRouter);

// Database & Server
const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose
   .connect(CONNECTION_URL)
   .then(() => {
      console.log('Database connected successfully!');
      app.listen(PORT, () =>
         console.log(`Server Running on Port: http://localhost:${PORT}`)
      );
   })
   .catch((error) => console.log(`${error} did not connect`));
