import 'express';
import { JwtPayload as JwtPayloadFromToken } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadFromToken; // Or your custom type for the user object
    }
  }
}


