// EnneagramController.ts

import { Request, Response } from 'express';
import User from '../models/user';
import enneagramAnalysis from '../docs/enneagramAnalysis';

// Assuming OPENAI_KEY is set correctly in your environment


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
    const analysis = enneagramAnalysis[enneagramType as keyof typeof enneagramAnalysis];
    if (!analysis) {
      return res.status(404).send('Analysis not found for the given Enneagram type');
    }
    res.json({ analysis });
  } catch (error) {
    console.error('Error in getEnneagramAnalysis:', error);
    res.status(500).send('Error processing your request');
  }
};
