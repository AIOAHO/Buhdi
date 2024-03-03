import { Request, Response } from 'express';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import WaitingList from '../models/waitingList'; // Adjust the import path as necessary

// Configure API key authorization
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API; // Make sure BREVO_API is set in your .env file

const apiInstance = new SibApiV3Sdk.ContactsApi();

export const addToWaitingList = async (req: Request, res: Response) => {
  console.log('addToWaitingList called'); // Log when the function is called
  const { email } = req.body;
  console.log('Email received:', email); // Log the received email

  try {
    // Create a contact object for Brevo
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    // Add any other attributes as needed
    createContact.listIds = [2]; // Adjust the list ID as needed
    createContact.emailBlacklisted = false;
    createContact.smsBlacklisted = false;
    createContact.updateEnabled = false;

    // Await the API call to add the contact to Brevo
    await apiInstance.createContact(createContact);
    console.log('API called successfully.');

    // Check if a waiting list entry with this email already exists to avoid duplicates
    const existingEntry = await WaitingList.findOne({ email: email });
    if (!existingEntry) {
      // If no existing waiting list entry is found, add the new entry
      const newEntry = new WaitingList({ email });
      await newEntry.save();
      console.log('New waiting list entry added to MongoDB successfully');
      res.status(200).json({ message: 'Added to waiting list successfully. Please check your email for further instructions.' });
    } else {
      console.log('Email already on waiting list.');
      res.status(409).json({ message: 'Email already on the waiting list.' });
    }
  } catch (error: any) {
    console.error('Error processing request:', error);
    let errorMessage = 'An error occurred while processing your request';
    if (error.response && error.response.text) {
      try {
        const errorResponse = JSON.parse(error.response.text);
        errorMessage = errorResponse.message || errorMessage;
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
    }
    res.status(500).json({ message: errorMessage });
  }
};
