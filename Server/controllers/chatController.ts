import { Request, Response } from 'express';
import User from '../models/user';
import { createOpenAIAssistant } from '../utils/aiAssistant';
import OpenAI from "openai";
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../utils/jwtPayload';



const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });


export const sendMessage = async (req: Request, res: Response) => {
  try {
    console.log('openai key used:', process.env.OPENAI_KEY);
    // Extract the token from the request header
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token received in sendMessage:', token);
    if (!token) {
      console.log('No token provided in sendMessage');
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
    console.log(`Received message: ${message}`);

    // Retrieve the user Id from mongo
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(`User found: ${user._id}`);

    //set assistant id. At the moment it's a static one. in the future every assistant can have it's own one. code is momentarily made into comments due to cost restraints
    
    //if (!user.assistantId) {
    //  console.log('Creating new assistant ID');
    //  const assistantId = await createOpenAIAssistant(userId);
      user.assistantId = "asst_vBJZSChmL9e5bRirX3GNZtCT";
    //  await user.save();
    //}

    // Retrieve ThreadID from Mongo
    if (!user.threadId) {
      console.log('Creating new thread ID');
      const thread = await openai.beta.threads.create();
      user.threadId = thread.id;
      await user.save();
    }

    console.log('Sending message to OpenAI');
    const msg = await openai.beta.threads.messages.create(user.threadId, {
      role: "user",
      content: message
    });

    console.log('Running the assistant');
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
            console.log(`Received response from OpenAI: ${text}`);
            res.status(200).json({ response: text });
            break;
          }
        } else {
          console.log('Received non-text content from OpenAI');
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

