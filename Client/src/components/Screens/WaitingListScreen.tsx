import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title, useTheme, HelperText } from 'react-native-paper';
import api from '../../utils/api';


export default function WaitingListScreen ({ navigation }) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state variable for error messages
  const [successMessage, setSuccessMessage] = useState(''); // New state variable for success messages

  const handleEmailChange = (email) => setEmail(email);

  const handleJoinWaitingList = async () => {
    console.log('Attempting to join waiting list with email:', email); // Log the email being sent
    try {
      await api.post('/waiting-list', { email });
      console.log('Successfully added to waiting list');
      setErrorMessage(''); // Clear any previous error messages
      setSuccessMessage('You have been added to the waiting list!'); // Set the success message
    } catch (error) {
      console.error('Error adding to waiting list:', error);
      setSuccessMessage(''); // Clear any previous success messages
      setErrorMessage('An error occurred. Please try again.'); // Set the error message
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
