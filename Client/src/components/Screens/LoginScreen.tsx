import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image';
import { TextInput, Button, Text, Headline, HelperText } from 'react-native-paper';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { login } from '../../utils/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';
import googleLogo from '../../../assets/googleLogo.png'; // Adjust the path as needed




export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const redirectUri = process.env.EXPO_PUBLIC_GAUTH_REDIRECT_URI



  // Start of google auth viaw
  WebBrowser.maybeCompleteAuthSession();

  // Configuration for Google sign-in through Expo AuthSession
  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
  // Your Google Client ID from Google Develper Console
  const clientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
  const [state, setState] = useState(Math.random().toString(36).substring(2));

  // Configuration for Expo AuthSession request
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId,
      redirectUri: redirectUri,
      useProxy: false,
      scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
      responseType: 'id_token',
      usePKCE: false,
      state, // Add the state parameter to the request
    },
    discovery
  );

  console.log(`Redirect URI: ${request?.redirectUri}`);
  console.log(process.env.EXPO_PUBLIC_API_BASE_URL)




  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, state: responseState } = response.params;
      if (state !== responseState) {
        console.error('State mismatch');
        return;
      }
      // Log the full response from Google
    console.log('Full Google response:', response);

      // call your backend to verify the token and log the user in
      handleLoginWithGoogleToken(id_token);
    }
  }, [response]);

  const handleLoginWithGoogleToken = async (token) => {
    try {
      // Send the token to your backend for verification
      const response = await api.post('/googlelogin', { token });
      console.log('Backend response:', response); // Add logging here
  
      if (response.status === 200 && response.data.jwtToken) {
        // Check if the app is running in a web environment
        console.log('JWT Token:', response.data.jwtToken);
        if (Platform.OS === 'web') {
          console.log('Storing JWT token in localStorage');
          // Store the JWT token received from the backend in localStorage for web
          localStorage.setItem('jwtToken', response.data.jwtToken);
        } else {
          // Use AsyncStorage for React Native environments
          await AsyncStorage.setItem('jwtToken', response.data.jwtToken);
        }
        
        // Navigate to the Homepage screen
        navigation.navigate('Homepage');
      } else {
        // Handle unsuccessful login
        setError('Failed to log in with Google. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      const success = await login(email, password); // Assuming this function returns a boolean
      if (success) {
        navigation.navigate('Homepage');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

    // Google Sign In Button Component
    const GoogleSignInButton = ({ onPress, disabled }) => {
      return (
        <Button
          icon={() => <Image source={googleLogo} style={styles.logo} />}
          mode="outlined"
          onPress={onPress}
          disabled={disabled}
          style={styles.googleButton}
          labelStyle={styles.googleText}
        >
          Continue With Google
        </Button>
      );
    };

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Login</Headline>
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
      {error ? <HelperText type="error">{error}</HelperText> : null}
      
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      
      </Button>

      <GoogleSignInButton onPress={() => promptAsync()} disabled={!request} />


      <Text style={styles.registerText}>
        Don't have an account?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Registration')}>
          Register here
        </Text>
      </Text>

    </View>
  );
}

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
  headline: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: '100%', // Ensure inputs take the full width of the container
  },
  button: {
    marginTop: 10,
    width: '100%', // Ensure buttons take the full width of the container
    maxWidth: 400, // Limit the maximum width of buttons
  },
  googleButton: {
    width: '100%', // Full width button
    maxWidth: 400, // Match the width with other elements
    marginTop: 10,
  },
  googleButtonContent: {
    //placeholder
  },
  logo: {
    width: 24,
    height: 24,
  },
  googleText: {
//placeholder
  },
  registerText: {
    marginTop: 10,
    textAlign: 'center',
    },

  registerLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6200ee',
    fontWeight: 'bold',
  },
});
