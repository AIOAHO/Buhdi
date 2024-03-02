import { Request, Response } from 'express';
import SibApiV3Sdk from 'sib-api-v3-sdk';

// Configure API key authorization
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API; // Make sure BREVO_API is set in your .env file

const apiInstance = new SibApiV3Sdk.ContactsApi();

export const addToWaitingList = async (req: Request, res: Response) => {
  
  try {
    const { email } = req.body;
    

    // Create a contact object
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    // Add any other attributes as needed
    createContact.listIds = [2]; // Adjust the list ID as needed
    createContact.emailBlacklisted = false;
    createContact.smsBlacklisted = false;
    createContact.updateEnabled = false;

    // Attempt to add the contact to SendinBlue
    apiInstance.createContact(createContact).then(function(data: any) {
      
      res.status(200).json({ message: 'Email added to Brevo successfully', data: data });
    }).catch(function(error: any) {
      console.error('Error adding email to Brevo:', error);
      let errorMessage = 'An error occurred while adding the email to Brevo';
      if (error.response && error.response.text) {
        try {
          const errorResponse = JSON.parse(error.response.text);
          errorMessage = errorResponse.message || errorMessage;
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
        }
      }
      res.status(500).json({ message: errorMessage });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};
