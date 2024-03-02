import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


const JWT_SECRET = process.env.JWT_SECRET


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  

  // Check if the Authorization header is missing or doesn't start with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  // Check if JWT_SECRET is defined
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is undefined');
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  // Verify the JWT token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Check if decoded is a string (which shouldn't happen for a correctly formed JWT)
    if (typeof decoded === 'string') {
      throw new Error('Invalid token');
    } else {
      // Attach the decoded token to the request object
      req.user = decoded;
    }
    next();
  });
};
