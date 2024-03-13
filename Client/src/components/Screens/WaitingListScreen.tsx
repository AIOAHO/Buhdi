import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text, Title, useTheme, HelperText } from 'react-native-paper';
import {
  useFonts,
  BigShouldersStencilDisplay_400Regular,
} from '@expo-google-fonts/big-shoulders-stencil-display';
import api from '../../utils/api';
import { Inter_400Regular } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function WaitingListScreen ({ navigation }) {
  let [expoFonts] : [boolean, Error | null] = useFonts({
    BigShouldersStencilDisplay_400Regular,
    Inter_400Regular,
  });


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

    <ScrollView  contentContainerStyle={styles.scrollview}>  
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.circleContainer}>
        <View style={styles.linearTop} />
        <View style={styles.circleRight1} />
        <View style={styles.circleRight2} />
        <View style={styles.circleLeft} />
      </View>

          <View style={styles.formContainer}>
                <Text style={styles.titlelogo}>Buhdi</Text>
                <Text style={styles.subtitle}>
                Buhdi is that wise friend that really understands you.
                </Text>
                <Text style={styles.subtitle}>
                There for you when you feel stuck, confused or anxious and always open for a good laugh.
                </Text>
                <Title style={styles.title}>Join Our Waiting List</Title>
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={handleEmailChange}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
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
        
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
    height: height * 0.9
  },
  container: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  circleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    width: width * 0.8,
    maxWidth: 350,
  },
  titlelogo: {
    fontSize: 130,
    fontFamily: 'BigShouldersStencilDisplay_400Regular',
    color: '#F7E8D8',
    marginTop: 20,
    marginBottom: 40, // Adjust this value to move the title up or down
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
    marginBottom: 10,
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
    backgroundColor: '#2E536F',
  },
});
