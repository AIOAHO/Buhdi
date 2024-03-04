import { Request, Response } from 'express';
import User from '../models/user';
import { createOpenAIAssistant } from '../utils/aiAssistant';
import OpenAI from "openai";
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../utils/jwtPayload';



const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });


export const sendMessage = async (req: Request, res: Response) => {
  try {
    
    // Extract the token from the request header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      
      return res.status(401).json({ message: 'No token provided' });
    }

    // Ensure the JWT secret is defined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("Missing JWT secret");
    }
    
    // Verify the token and use type assertion
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    const userId = decodedToken.userId;

    // Log received message
    const { message } = req.body;
    

    // Retrieve the user Id from mongo
    const user = await User.findById(userId);
    if (!user) {
      
      return res.status(404).json({ message: 'User not found' });
    }
    

    //set assistant id. At the moment it's a static one. in the future every assistant can have it's own one. code is momentarily made into comments due to cost restraints
    
    //if (!user.assistantId) {
    //  
    //  const assistantId = await createOpenAIAssistant(userId);
      user.assistantId = "asst_1oTNYCXd7su5f2hvKMCbtYef";
    //  await user.save();
    //}

    // Retrieve ThreadID from Mongo
    if (!user.threadId) {
      
      const thread = await openai.beta.threads.create();
      user.threadId = thread.id;
      await user.save();
    }

    
    const msg = await openai.beta.threads.messages.create(user.threadId, {
      role: "user",
      content: message
    });

    
    const run = await openai.beta.threads.runs.create(user.threadId, {
      assistant_id: user.assistantId
    });

    while (true) {
      const retrievedRun = await openai.beta.threads.runs.retrieve(user.threadId, run.id);
      if (retrievedRun.status === "completed") {
        const messages = await openai.beta.threads.messages.list(user.threadId);
        const latestMessage = messages.data[0];

        if ('text' in latestMessage.content[0]) {
          const textContent = latestMessage.content[0].text;
          if (textContent) {
            const text = textContent.value;
            
            res.status(200).json({ response: text });
            break;
          }
        } else {
          
          res.status(200).json({ response: 'Non-text content received' });
          break;
        }
      }
    }
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ message: `Error sending message: ${(error as Error).message || 'Unknown error'}` });
  }
};

