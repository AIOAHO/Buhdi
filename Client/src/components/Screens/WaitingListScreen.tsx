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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (email) => setEmail(email);

  const handleJoinWaitingList = async () => {
    if (!email.trim()) {
      setSuccessMessage('');
      setErrorMessage("Woops! You forgot to provide your email.");
      return;
    }
  
    // Prevent further submissions if already submitting
    if (isSubmitting) return;
  
    setIsSubmitting(true); // Disable the button
    setErrorMessage(''); // Clear any existing error messages
    setSuccessMessage(''); // Clear any existing success messages
  
    try {
      const response = await api.post('/waiting-list', { email });
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error adding to waiting list:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false); // Re-enable the button
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
          Get early access and exclusive updates by joining!
        </Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          theme={{ colors: { primary: colors.primary, onSurfaceVariant: '#2E536F' /*This targets the placeholder text color*/ } }}
          textColor='#2E536F' // Targets text
          selectionColor='#2E536F' // Targets text when selected
          outlineColor='rgba(46, 83, 111, 0.7)' // Targets outline unselected
          activeOutlineColor='#2E536F' // Targets outline when selected
          outlineStyle={{ backgroundColor: 'rgba(191, 191, 191, 0.25)', borderRadius: 6 }} // Background color
          style={styles.input}
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
            textColor='#F7E8D8'
            disabled={isSubmitting} // Disable the button while submitting
          >
            {isSubmitting ? 'Joooining!' : 'Join our Waiting List'}
          </Button>

        <Button
          mode="outlined"
          textColor='#F7E8D8'
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
  circleRight1: {
    width: width * 0.45,
    height: height * 0.4,
    maxWidth: 500,
    maxHeight: 500,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#fff0db',
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
    borderColor: '#2E536F',
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
    borderColor: '#fff0db',
    position: 'absolute',
    left: -50,
    bottom: -50,
  },
  linearTop: {
    width: '120%',
    borderTopWidth: 7,
    borderRadius: 50,
    borderColor: '#2E536F',
    position: 'absolute',
    top: 0,
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
    color: '#2E536F',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E536F',
  },
  input: {
    height: 40,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
    backgroundColor: '#2E536F',
  },
});
