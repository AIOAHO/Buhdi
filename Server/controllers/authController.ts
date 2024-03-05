import { createOpenAIAssistant } from '../utils/aiAssistant';
import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import WaitingList from '../models/waitingList';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // First, check the waiting list for an approved entry
    const waitingEntry = await WaitingList.findOne({ email, status: 'approved' });

    if (!waitingEntry) {
      // If there's no approved entry in the waiting list, prevent registration
      return res.status(400).json({ message: 'Woops, Buhdi will be there for you soon!' });
    }

    // If approved in the waiting list, check if the user already exists in the User collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If a user already exists, they shouldn't be registering again
      return res.status(400).json({ message: 'User already exists.' });
    }

    // User is approved and does not exist, so proceed with registration
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
      // Include any other fields you need to initialize
    });

    // Save the new user to the database
    await newUser.save();
    console.log(`User ${email} has been moved from the waiting list to the main user list.`);


    // Optionally, update or remove the entry from the WaitingList to reflect that they've been registered
    // For example, to remove the entry:
    await WaitingList.findOneAndDelete({ email });

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    // Generate and send a JWT token with an expiration time (e.g., 1 hour)
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Set the token to expire in 1 hour
     });

    // Respond with successful registration
    res.status(201).json({ message: 'Registration successful.' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed due to an unexpected error.' });
  }
};


export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Verify the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Check if JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      // Generate and send a JWT token with an expiration time (e.g., 1 hour)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
       });
       res.status(200).json({ token, userId: user._id });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  };
  

  // Helper function to verify the Google ID token
  const verifyGoogleToken = async (id_token: string) => {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your Google Client ID
    });
    return ticket.getPayload(); // Contains the Google user's profile information
  };
  
  export const googleLogin = async (req: Request, res: Response) => {
    
    try {
      const { token } = req.body;
      const payload = await verifyGoogleToken(token); // Verify the Google ID token
  
      if (!payload) {
        return res.status(401).json({ message: 'Invalid Google ID token' });
      }
  
      // Attempt to find the user by their Google email
      let user = await User.findOne({ email: payload.email });
  
      if (!user) {
        // If the user does not exist, create them
        user = new User({
          email: payload.email,
          name: payload.name, // Assuming you have a name field and Google provides it
          // Add any other user info you might need and that Google provides
          // Note: Since it's a Google login, you might not have a password, or you might generate a random one
        });
        await user.save();
      }

      // Check if JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
  
      // Generate a JWT for the user
      const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Adjust token expiration as needed
      });
      

  
      res.status(200).json({ jwtToken, userId: user._id });
    } catch (error) {
      console.error('Google login error:', {
        message: (error as Error).message,
        stack: (error as Error).stack, // More detailed error insights
        token: req.body.token, // Caution with logging sensitive info; ensure compliance with privacy standards
      });
      res.status(500).json({ message: 'Google login failed due to server error' });
    }
};

  