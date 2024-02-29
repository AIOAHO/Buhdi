import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title, useTheme, HelperText } from 'react-native-paper';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';


export default function WaitingListScreen ({ navigation }) {
  useEffect(() => {
    const checkAuthState = async (token) => {
      
      
      // Check the platform and use the appropriate storage method
      if (Platform.OS === 'web') {
        // For web, use localStorage
        token = localStorage.getItem('jwtToken');
      } else {
        // For React Native (iOS, Android), use AsyncStorage
        try {
          token = await AsyncStorage.getItem('jwtToken');
        } catch (error) {
          console.error('Failed to retrieve JWT token:', error);
        }
      }

      console.log('Token retrieved:', token); // Debugging: Log the retrieved token

      if (token) {
        // If token is found, navigate to the Homepage
        navigation.navigate('Homepage');
      }
      // If no token is found, do nothing and stay on the WaitingListScreen
    };

    checkAuthState();
  }, [navigation]); 

  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state variable for error messages
  const [successMessage, setSuccessMessage] = useState(''); // New state variable for success messages

  const handleEmailChange = (email) => setEmail(email);

  const handleJoinWaitingList = async () => {
    console.log('Attempting to join waiting list with email:', email); // Log the email being sent
    // Check if the email is empty
    if (!email.trim()) {
      setSuccessMessage(''); // Clear any previous success messages
      setErrorMessage("Woops! You forgot to provide your email."); // Set message for empty email
      return; // Exit the function early
    }
  
    try {
      const response = await api.post('/waiting-list', { email });
      console.log('Response from waiting list:', response.data.message); // Log the success message from the backend
      setErrorMessage(''); // Clear any previous error messages
      setSuccessMessage(response.data.message); // Set the success message from the backend response
    } catch (error) {
      console.error('Error adding to waiting list:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      setSuccessMessage(''); // Clear any previous success messages
      setErrorMessage(errorMessage); // Set the error message from the backend response or a default message
    }
  };
  

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Join Our Waiting List</Title>
      <Text style={styles.subtitle}>
        Get early access and exclusive updates by signing up!
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        theme={{ colors: { primary: colors.primary } }}
      />

        {/* Display error message if exists */}
        <HelperText type="error" visible={!!errorMessage}>
        {errorMessage}
        </HelperText>

        {/* Display success message if exists */}
        <HelperText type="info" visible={!!successMessage}>
          {successMessage}
        </HelperText>
      
      <Button
        mode="contained"
        onPress={handleJoinWaitingList}
        style={styles.button}
      >
        Sign Up
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Login')} // Navigate to Login screen
        style={styles.button}
      >
        Already have an account? Log in
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400, // Set a maximum width for the container
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: '100%', // Ensure buttons take the full width of the container
    maxWidth: 400, // Limit the maximum width of buttons
  },
});
