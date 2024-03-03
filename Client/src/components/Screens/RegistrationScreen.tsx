import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Headline, HelperText } from 'react-native-paper';
import { register, validateEmail, validatePassword } from '../../utils/auth'; // Make sure these are exported


export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

    // Attempt to register the user
    try {
      const success = await register(email, password);
      if (success) {
        // Navigate to the Homepage screen upon successful registration
        navigation.navigate('Home');
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
        <Headline style={styles.headline}>Registration</Headline>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
        />
        {error ? <HelperText type="error" visible={true}>{error}</HelperText> : null}
        <Button mode="contained" onPress={handleRegistration} style={styles.button}>
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
    borderColor: '#DBCBD8',
    position: 'absolute',
    top: 0,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400, // Set a maximum width for the container
  },
  headline: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#E4FDE1',
  },
  input: {
    marginBottom: 10,
    width: '100%', // Ensure inputs take the full width of the container
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%', // Ensure buttons take the full width of the container
    maxWidth: 400, // Limit the maximum width of buttons
  },
  backToLoginText: {
    marginTop: 10,
    textAlign: 'center',
  },
  backToLoginLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6200ee',
    fontWeight: 'bold',
  },
});
