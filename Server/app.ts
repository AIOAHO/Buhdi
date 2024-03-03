import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; // Adjust the path as necessary
import { authenticateToken } from './middleware/authMiddleware';





const app = express();
const MONGODB_URI = process.env.MONGODB_URI as string;


// Middleware to log every incoming request
app.use((req, res, next) => {
  
  next();
});

// Middleware

app.use(express.json());
app.use(cors({
  origin: '*', // Allows requests from any origin
}));
app.use('/api', authRoutes); 

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => {
    
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });



export default app;
