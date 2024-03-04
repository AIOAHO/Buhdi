import React, { useState, useEffect } from 'react';
import { View, Dimensions,  StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title, useTheme, HelperText } from 'react-native-paper';
import api from '../../utils/api';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function WaitingListScreen ({ navigation }) {

  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state variable for error messages
  const [successMessage, setSuccessMessage] = useState(''); // New state variable for success messages

  const handleEmailChange = (email) => setEmail(email);

  const handleJoinWaitingList = async () => {
    
    // Check if the email is empty
    if (!email.trim()) {
      setSuccessMessage(''); // Clear any previous success messages
      setErrorMessage("Woops! You forgot to provide your email."); // Set message for empty email
      return; // Exit the function early
    }
  
    try {
      const response = await api.post('/waiting-list', { email });
      
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
      <View style={styles.linearTop}/>
      <View style={styles.circleRight1}/>
      <View style={styles.circleRight2}/>
      <View style={styles.circleLeft}/>
      <View style={styles.formContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
  },
  linearTop: {
    width: '120%',
    borderTopWidth: 7,
    borderRadius: 50,
    borderColor: '#DBCBD8',
    position: 'absolute',
    top: 0,
  },
  circleRight1: {
    width: width * 0.45,
    height: height * 0.4,
    maxWidth: 500,
    maxHeight: 500,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#E4FDE1',
    position: 'absolute',
    right: -100,
    top: -100,
  },
  circleRight2: {
    width: width * 0.32,
    height: height * 0.7,
    maxWidth: 400,
    maxHeight: 800,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#E85F5C',
    position: 'absolute',
    right: -100,
    top: -100,
  },
  circleLeft: {
    width: width * 0.9,
    height: height * 0.3,
    maxWidth: 500,
    maxHeight: 500,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#7EBDC2',
    position: 'absolute',
    left: -50,
    bottom: -50,
  },
  formContainer: {
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
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
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
    backgroundColor: '#E4FDE1',
    color: '#59656F',
  },
});
