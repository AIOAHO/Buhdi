import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Menu, Provider } from 'react-native-paper';
import api from '../../utils/api'; // Import the API utility for making HTTP requests

// FeedbackScreen component definition
export default function FeedbackScreen({navigation}) {
  // State hooks for managing the feedback form
  const [selectedFeature, setSelectedFeature] = useState('other'); // Tracks the selected feature for feedback
  const [feedback, setFeedback] = useState(''); // Tracks the user's feedback text
  const [menuVisible, setMenuVisible] = useState(false); // Controls the visibility of the feature selection menu
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

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
    <Provider>
      <View style={styles.container}>
        <Text style={styles.header}>Feedback</Text>

        {/* Feature selection menu */}
        <Menu
          visible={menuVisible} // Controls the visibility of the menu based on the state
          onDismiss={() => setMenuVisible(false)} // Function to hide the menu
          anchor={(
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Text style={styles.menuAnchorText}>
                Feature: {features.find(f => f.value === selectedFeature)?.label}
              </Text>
            </TouchableOpacity>
          )}>
          {/* Mapping over the features to create menu items */}
          {features.map((feature) => (
            <Menu.Item
              key={feature.value}
              onPress={() => {
                setSelectedFeature(feature.value);
                setMenuVisible(false); // Hide the menu after selection
              }}
              title={feature.label}
            />
          ))}
        </Menu>

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
        <Button mode="contained" onPress={submitFeedback} style={styles.button}>
          Submit Feedback
        </Button>
        {/* Display success message if submissionSuccess is true */}
        {submissionSuccess && (
        <Text style={styles.successMessage}>Thank you! Bhudi loves feedback! Whishes, bugs & praise, all are welcome :D</Text>)}
      </View>
    </Provider>
  );
};

// StyleSheet for styling the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    height: 100, // Adjust as needed for the multiline text input
    textAlignVertical: 'top', // Aligns text to the top in multiline mode
  },
  button: {
    marginTop: 10,
  },
  menuAnchorText: {
    padding: 10,
    fontSize: 16,
    color: 'black', // Adjust based on your theme
    backgroundColor: '#e0e0e0', // Adjust based on your theme
    marginTop: 10,
    marginBottom: 20,
  },
  successMessage: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});
