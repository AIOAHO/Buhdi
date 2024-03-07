import { Client } from '@notionhq/client';
import { Request, Response } from 'express';

// Initializing a Notion client
const notion = new Client({
  auth: process.env.NOTION_API, // Ensure you have this in your environment variables
});

const feedbackDatabaseId = '017911b45faf4d5eb60ef71cdd7db87f'; // Feedback Database ID

// TypeScript interface for request body
interface FeedbackRequestBody {
  feature: string; // Array of strings for multi-select property
  feedback: string;
}

export const submitFeedback = async (req: Request, res: Response) => {
  const { feature, feedback }: FeedbackRequestBody = req.body;
  try {
    if (!feature || !feedback) {
      return res.status(400).json({ message: 'Feature and feedback are required.' });
    }
  
    const response = await notion.pages.create({
      parent: { database_id: feedbackDatabaseId },
      properties: {
        // 'Name' is the title of the Notion page and is represented as 'title' in the API
        'Name': {
          title: [
            {
              text: {
                content: feedback, // Place the feedback text in the 'Name' section
              },
            },
          ],
        },
        // 'Feature tag (app)' is a select property in Notion
        'Feature tag (app)': {
          select: { name: feature },
        },
      },
    });

    res.status(200).json({ message: 'Feedback submitted successfully', data: response });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error submitting feedback to Notion:', error.message);
      res.status(500).json({ message: 'Failed to submit feedback', error: error.message });
    } else {
      console.error('Error submitting feedback to Notion:', error);
      res.status(500).json({ message: 'Failed to submit feedback', error: 'An unexpected error occurred' });
    }
  }
};