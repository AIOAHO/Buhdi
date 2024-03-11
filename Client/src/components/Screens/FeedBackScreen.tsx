import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Chip, Provider } from 'react-native-paper';
import api from '../../utils/api'; // Import the API utility for making HTTP requests

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// FeedbackScreen component definition
export default function FeedbackScreen({navigation}) {
  // State hooks for managing the feedback form
  const [selectedFeature, setSelectedFeature] = useState('other'); // Tracks the selected feature for feedback
  const [feedback, setFeedback] = useState(''); // Tracks the user's feedback text
  const [menuVisible, setMenuVisible] = useState(false); // Controls the visibility of the feature selection menu
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const theme = {
    roundness: 2,
    colors: {
      primary: '#2E536F', // Blue color for primary elements
      accent: '#F1C1BF', // Pink color for accents
      background: '#F7E8D8', // Cream color for backgrounds
      text: '#2E536F', // Blue color for text
      // Add other color specifications if needed
    },
  };

  // List of features that users can select for their feedback
  const features = [
    { label: 'Chat', value: 'Chat' },
    { label: 'Quiz', value: 'Quiz' },
    { label: 'Login', value: 'Login' },
    { label: 'UI/UX', value: 'UI/UX' },
    { label: 'Other', value: 'Other' },
  ];
  

  // Function to submit feedback to the backend
  const submitFeedback = async () => {
    try {
      // Making a POST request to the '/feedback' endpoint with the selected feature and feedback text
      const response = await api.post('/feedback', {
        feature: selectedFeature,
        feedback: feedback,
      });
  
      // Handling the response: if successful, show a success message, clear the fields and navigate back
      if (response.status === 200) {
        setSubmissionSuccess(true); // Set success state to true
        setFeedback(''); // Clear feedback field
        setSelectedFeature('other'); // Clear feature field (or setSelectedFeature([]) if it's an array)
      } else {
        // If the server response is not successful, throw an error
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      // If there's an error, just log it for now
      console.error(error);
    }
  };
  
  return (

      <View style={styles.container}>
        <Text style={styles.header}>Bhudi loves feedback! Whishes, bugs & praise, all are welcome :D</Text>

               {/* Feature selection using chips */}
            <View style={styles.chipGroup}>
            {features.map((feature) => (
                <Chip
                key={feature.value}
                selected={selectedFeature === feature.value}
                onPress={() => setSelectedFeature(feature.value)}
                style={styles.chip}
                >
                {feature.label}
                </Chip>
            ))}
            </View>

        {/* Feedback text input */}
        <TextInput
          label="Your Feedback"
          value={feedback}
          onChangeText={text => setFeedback(text)} // Update state with the entered text
          mode="outlined"
          multiline={true}
          numberOfLines={4}
          style={styles.input}
        />

        {/* Submit button */}
        <Button mode="contained" onPress={submitFeedback} style={styles.button} textColor='#F7E8D8'>
          Submit Feedback
        </Button>
        {/* Display success message if submissionSuccess is true */}
        {submissionSuccess && (
        <Text style={styles.successMessage}>Thank you! Always welcome to come back here to share more.</Text>)}
      </View>
   
  );
};

// StyleSheet for styling the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E536F',
  },
  input: {
    marginBottom: 20,
    width: width * 0.8,
    height: height * 0.4, // Adjust as needed for the multiline text input
    verticalAlign: 'top', // Aligns text to the top in multiline mode
  },
  button: {
    marginTop: 10,
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
    backgroundColor: '#2E536F',
    marginBottom: 20,
  },
  chipGroup: {
    flexDirection: 'row', // Align items horizontally
    flexWrap: 'wrap', // Allow items to wrap to the next line if needed
    justifyContent: 'space-between', // Space out the items evenly
    margin: 20, // Add some space below the chip group
 },
 chip: {
    marginBottom: 10, // Add some space between chips
    marginRight: 10, // Add some space between chips horizontally
 },
 chipText: {
    fontSize: 18, // Adjust the font size as needed
 },
  successMessage: {
    color: '#F7E8D8',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});
