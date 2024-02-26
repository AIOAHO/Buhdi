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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Start of google auth viaw
  WebBrowser.maybeCompleteAuthSession();

  // Configuration for Google sign-in through Expo AuthSession
  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
  // Your Google Client ID from Google Developer Console
  const clientId = '435975996885-evg7n8veuqdqbqbc2bkq1bfo290k7h07.apps.googleusercontent.com';
  const [state, setState] = useState(Math.random().toString(36).substring(2));

  // Configuration for Expo AuthSession request
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId,
      redirectUri: makeRedirectUri(),
      useProxy: true,
      scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
      responseType: 'id_token',
      usePKCE: false,
      state, // Add the state parameter to the request
    },
    discovery
  );

  console.log(`Redirect URI: ${request?.redirectUri}`);
  console.log ('token');

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
        if (Platform.OS === 'web') {
          // Store the JWT token received from the backend in localStorage for web
          localStorage.setItem('jwtToken', response.data.jwtToken);
        } else {
          // Use AsyncStorage for React Native environments
          await AsyncStorage.setItem('jwtToken', response.data.jwtToken);
        }
        // Navigate to the Homepage screen
        navigation.navigate('Home');
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
        navigation.navigate('Home');
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
      <View style={styles.linearTop}/>
      <View style={styles.formContainer}>
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
        <HelperText style={{ color: '#E85F5C', height: 25}}type="error">{error}</HelperText>
        
        <Button onPress={handleLogin} style={styles.button}>
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
    color: '#E4FDE1',
    flex: 1,
    height: 40,
    justifyContent: "center",
    backgroundColor: 'rgba(191, 191, 191, 0.25)',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    width: '100%', // Ensure buttons take the full width of the container
    maxWidth: 400, // Limit the maximum width of buttons
    backgroundColor: '#E4FDE1',
    color: '#59656F',
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
    color: '#E4FDE1',
//placeholder
  },
  registerText: {
    marginTop: 10,
    textAlign: 'center',
    },
  registerLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#E4FDE1',
    fontWeight: 'bold',
  },
});
