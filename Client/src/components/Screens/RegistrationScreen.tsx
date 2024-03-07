import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TextInput, Button, Headline, HelperText } from 'react-native-paper';
import { register, login, validateEmail, validatePassword } from '../../utils/auth'; // Make sure these are exported
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width;

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  let [expoFonts] : [boolean, Error | null] = useFonts({
    Inter_400Regular,
  });

  const handleRegistration = async () => {
    // Clear any previous errors
    setError('');

    // Check if the email is valid
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Check if the password is strong enough
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include a number, an uppercase letter, a lowercase letter, and a special character.');
      return;
    }
    try {
      const success = await register(email, password);
      if (success) {
        // After successful registration, attempt to log in the user to get the JWT token
        const loggedIn = await login(email, password);
        if (loggedIn) {
          // Navigate to the Homepage screen upon successful login
          navigation.navigate('Onboarding');
        } else {
          // If login is not successful, inform the user
          setError('Login failed after registration. Please try again.');
        }
      } else {
        // If registration is not successful, inform the user
        setError('Registration failed. Please try again.');
      }
   } catch (registrationError) {
      // Handle any other errors
      setError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', registrationError);
   }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.linearTop}/>
      <View style={styles.formContainer}>
        <Headline style={styles.headline}>Sign up for Budhi</Headline>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          theme={{ colors: { onSurfaceVariant: '#2E536F'} }} // This targets the placeholder text color
          textColor='#2E536F' // Targets text
          selectionColor='#2E536F' // Targets text when selected
          outlineColor='rgba(46, 83, 111, 0.7)' // Targets outline unselected
          activeOutlineColor='#2E536F' // Targets outline when selected
          outlineStyle={{ backgroundColor: 'rgba(191, 191, 191, 0.25)', borderRadius: 6 }} // Background color
          style={styles.input}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          theme={{ colors: { onSurfaceVariant: '#2E536F'} }} // This targets the placeholder text color
          textColor='#2E536F' // Targets text
          selectionColor='#2E536F' // Targets text when selected
          outlineColor='rgba(46, 83, 111, 0.7)' // Targets outline unselected
          activeOutlineColor='#2E536F' // Targets outline when selected
          outlineStyle={{ backgroundColor: 'rgba(191, 191, 191, 0.25)', borderRadius: 6 }} // Background color
          style={styles.input}
        />
        {error ? <HelperText type="error" visible={true}>{error}</HelperText> : null}
        <Button textColor='#F7E8D8' mode="contained" onPress={handleRegistration} style={styles.button}>
          Register
        </Button>

        <Text style={styles.backToLoginText}>
          Already have an account?{' '}
          <Text style={styles.backToLoginLink} onPress={() => navigation.navigate('Login')}>
          Back to Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

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
    borderColor: '#2E536F',
    position: 'absolute',
    top: 0,
  },
  formContainer: {
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
  },
  headline: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
    color: '#2E536F',
  },
  input: {
    height: 40,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#2E536F',
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
  },
  backToLoginText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#2E536F',
  },
  backToLoginLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#2E536F',
    fontWeight: 'bold',
  },
});
