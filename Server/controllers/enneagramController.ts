// EnneagramController.ts

import { Request, Response } from 'express';
import OpenAI from 'openai';
import User from '../models/user';

// Assuming OPENAI_KEY is set correctly in your environment

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

export const saveEnneagramResults = async (req: Request, res: Response) => {
  
  const { enneagramType, userId, typeScores } = req.body;

  

  if (!userId || !typeScores) {
    
    return res.status(400).send('Missing userId or typeScores');
  }

  try {
    
    const user = await User.findByIdAndUpdate(userId, {
      $set: { enneagramResults: typeScores }
    }, { new: true });

    if (!user) {
      
      return res.status(404).send('User not found');
    }

    
    res.status(200).json({ message: 'Enneagram results saved successfully', user });
  } catch (error) {
    console.error('Error saving Enneagram results:', error);
    res.status(500).send('Error processing your request');
  }
};


export const getEnneagramAnalysis = async (req: Request, res: Response) => {
  const { enneagramType } = req.body;
  if (!enneagramType) {
    return res.status(400).send('Enneagram type is required');
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "user", content: `Please provide information about Enneagram ${enneagramType}. I'd like to know a general type explanation, strengths, challenges, and goals for development. Please keep the sentences concise, humorous, and friendly. Keep it to 10th-grade level.` }
      ],
      model: "gpt-3.5-turbo",
    });

    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error in getEnneagramAnalysis:', error);
    res.status(500).send('Error processing your request');
  }
};
